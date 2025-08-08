import urlData from "../models/urlData.js";
import { Logins } from "../models/Logins.js";
import { Users } from "../models/users.js";

// Function to create database indexes for better performance
export const createIndexes = async () => {
  try {
    console.log("Creating database indexes...");

    // Index for urlData clicks queries (for admin dashboard)
    await urlData.collection.createIndex({ "clicks.clickedAt": 1 });
    console.log("✓ Created index on clicks.clickedAt");

    // Index for createdBy field for user-url lookups
    await urlData.collection.createIndex({ "createdBy": 1 });
    console.log("✓ Created index on createdBy");

    // Index for Logins queries (active users)
    await Logins.collection.createIndex({ "loginAt": 1 });
    await Logins.collection.createIndex({ "userId": 1 });
    console.log("✓ Created indexes on loginAt and userId");

    // Index for Users queries
    await Users.collection.createIndex({ "signupAt": 1 });
    console.log("✓ Created index on signupAt");

    // Compound index for better click date range queries
    await urlData.collection.createIndex({ 
      "clicks.clickedAt": 1, 
      "createdBy": 1 
    });
    console.log("✓ Created compound index on clicks.clickedAt and createdBy");

    console.log("All indexes created successfully!");
  } catch (error) {
    console.error("Error creating indexes:", error);
  }
};
