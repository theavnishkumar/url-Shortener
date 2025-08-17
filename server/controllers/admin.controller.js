import {Users} from "../models/users.js";
import urlData from "../models/urlData.js";
import { Logins } from "../models/Logins.js";
import { cache } from "../utils/cache.js";
import mongoose from "mongoose";

export const getAdminDashboard = async (req, res) => {
  try {
    const cacheKey = "admin-dashboard";
    
  
    if (cache.has(cacheKey)) {
      return res.json(cache.get(cacheKey));
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  
    const [
      clicksData,
      totalUsers,
      totalUrls,
      activeUsers,
      usersList
    ] = await Promise.all([
      
      urlData.aggregate([
        { $unwind: "$clicks" },
        {
          $group: {
            _id: null,
            todaysClicks: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $gte: ["$clicks.clickedAt", today] },
                      { $lt: ["$clicks.clickedAt", tomorrow] }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            yesterdaysClicks: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $gte: ["$clicks.clickedAt", yesterday] },
                      { $lt: ["$clicks.clickedAt", today] }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            lifetimeClicks: { $sum: 1 }
          }
        }
      ]),
      
      
      Users.countDocuments(),
      
    
      urlData.countDocuments(),
      
  
      Logins.distinct("userId", {
        loginAt: { $gte: thirtyDaysAgo },
      }),
      

      Users.aggregate([
        {
          $lookup: {
            from: "shorturls",
            localField: "_id",
            foreignField: "createdBy",
            as: "urls",
            pipeline: [
              { $project: { _id: 1 } }
            ]
          },
        },
        {
          $project: {
            name: 1,
            email: 1,
            createdOn: "$signupAt",
            totalUrls: { $size: "$urls" },
          },
        },
        { $sort: { totalUrls: -1 } },
        { $limit: 10 },
      ])
    ]);

  
    const clicks = clicksData[0] || { todaysClicks: 0, yesterdaysClicks: 0, lifetimeClicks: 0 };

    const avgClicksPerUser = totalUsers > 0 ? clicks.lifetimeClicks / totalUsers : 0;

    const result = {
      todaysClicks: clicks.todaysClicks,
      yesterdaysClicks: clicks.yesterdaysClicks,
      lifetimeClicks: clicks.lifetimeClicks,
      totalUsers,
      totalUrls,
      activeUsers: activeUsers.length,
      avgClicksPerUser,
      usersList,
    };

  
    cache.set(cacheKey, result, 120000);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || "";
    const sortBy = req.query.sortBy || "signupAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    // Build search query
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    // Get total count for pagination
    const totalUsers = await Users.countDocuments(searchQuery);

    // Get users with their URL counts and click counts
    const users = await Users.aggregate([
      { $match: searchQuery },
      {
        $lookup: {
          from: "shorturls",
          localField: "_id",
          foreignField: "createdBy",
          as: "urls",
          pipeline: [
            {
              $project: {
                _id: 1,
                clicks: 1,
                createdAt: 1
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: "logins",
          localField: "_id",
          foreignField: "userId",
          as: "logins",
          pipeline: [
            { $sort: { loginAt: -1 } },
            { $limit: 1 }
          ]
        }
      },
      {
        $addFields: {
          totalUrls: { $size: "$urls" },
          totalClicks: {
            $sum: {
              $map: {
                input: "$urls",
                as: "url",
                in: { $size: { $ifNull: ["$$url.clicks", []] } }
              }
            }
          },
          lastLogin: { $arrayElemAt: ["$logins.loginAt", 0] },
          isActive: {
            $gt: [
              { $arrayElemAt: ["$logins.loginAt", 0] },
              { $subtract: [new Date(), 30 * 24 * 60 * 60 * 1000] } // 30 days ago
            ]
          }
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          role: 1,
          signupAt: 1,
          totalUrls: 1,
          totalClicks: 1,
          lastLogin: 1,
          isActive: 1
        }
      },
      { $sort: { [sortBy]: sortOrder } },
      { $skip: skip },
      { $limit: limit }
    ]);

    res.json({
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        hasNext: page < Math.ceil(totalUsers / limit),
        hasPrev: page > 1
      }
    });
  } catch (err) {
    console.error("Error fetching all users:", err);
    res.status(500).json({ message: "Error fetching users data" });
  }
};

export const getUserUrls = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    // Get user info first
    const user = await Users.findById(userId).select("name email role signupAt");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get total count for pagination
    const totalUrls = await urlData.countDocuments({ createdBy: userId });

    // Get user's URLs with click statistics
    const urls = await urlData.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
      {
        $addFields: {
          clicksCount: { $size: { $ifNull: ["$clicks", []] } },
          lastClickedAt: {
            $max: {
              $map: {
                input: "$clicks",
                as: "click",
                in: "$$click.clickedAt"
              }
            }
          },
          recentClicks: {
            $size: {
              $filter: {
                input: "$clicks",
                as: "click",
                cond: { 
                  $gte: [
                    "$$click.clickedAt", 
                    { $subtract: [new Date(), 7 * 24 * 60 * 60 * 1000] } // 7 days ago
                  ] 
                }
              }
            }
          }
        }
      },
      {
        $project: {
          originalUrl: 1,
          shortId: 1,
          createdAt: 1,
          clicksCount: 1,
          lastClickedAt: 1,
          recentClicks: 1,
          ipAddress: 1,
          location: 1
        }
      },
      { $sort: { [sortBy]: sortOrder } },
      { $skip: skip },
      { $limit: limit }
    ]);

    // Get summary statistics
    const stats = await urlData.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalUrls: { $sum: 1 },
          totalClicks: { 
            $sum: { $size: { $ifNull: ["$clicks", []] } }
          },
          avgClicksPerUrl: {
            $avg: { $size: { $ifNull: ["$clicks", []] } }
          },
          recentUrls: {
            $sum: {
              $cond: [
                { 
                  $gte: [
                    "$createdAt", 
                    { $subtract: [new Date(), 7 * 24 * 60 * 60 * 1000] }
                  ] 
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    const summary = stats[0] || {
      totalUrls: 0,
      totalClicks: 0,
      avgClicksPerUrl: 0,
      recentUrls: 0
    };

    res.json({
      user,
      urls,
      summary,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUrls / limit),
        totalUrls,
        hasNext: page < Math.ceil(totalUrls / limit),
        hasPrev: page > 1
      }
    });
  } catch (err) {
    console.error("Error fetching user URLs:", err);
    res.status(500).json({ message: "Error fetching user URLs" });
  }
};
