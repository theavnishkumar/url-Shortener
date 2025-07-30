import {Users} from "../models/users.js";
import urlData from "../models/urlData.js";
import { Logins } from "../models/Logins.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const todaysClicks = await urlData.aggregate([
      { $unwind: "$clicks" },
      { $match: { "clicks.clickedAt": { $gte: today, $lt: tomorrow } } },
      { $count: "count" },
    ]);

    const yesterdaysClicks = await urlData.aggregate([
      { $unwind: "$clicks" },
      { $match: { "clicks.clickedAt": { $gte: yesterday, $lt: today } } },
      { $count: "count" },
    ]);
  
    const lifetimeClicks = await urlData.aggregate([
      { $unwind: "$clicks" },
      { $count: "count" },
    ]);
    
    const totalUsers = await Users.countDocuments();
    
    const totalUrls = await urlData.countDocuments();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeUsers = await Logins.distinct("userId", {
      loginAt: { $gte: thirtyDaysAgo },
    });
   
    const avgClicksPerUser =
      totalUsers > 0 ? (lifetimeClicks[0]?.count || 0) / totalUsers : 0;
    
    const usersList = await Users.aggregate([
      {
        $lookup: {
          from: "urldatas",
          localField: "_id",
          foreignField: "createdBy",
          as: "urls",
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
    ]);
    res.json({
      todaysClicks: todaysClicks[0]?.count || 0,
      yesterdaysClicks: yesterdaysClicks[0]?.count || 0,
      lifetimeClicks: lifetimeClicks[0]?.count || 0,
      totalUsers,
      totalUrls,
      activeUsers: activeUsers.length,
      avgClicksPerUser,
      usersList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};
