import {Users} from "../models/users.js";
import urlData from "../models/urlData.js";
import { Logins } from "../models/Logins.js";
import { cache } from "../utils/cache.js";

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
