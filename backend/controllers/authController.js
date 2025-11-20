const User = require("../models/user.js");
const { clerkClient } = require("@clerk/clerk-sdk-node"); // Fixed import

// Sync Clerk user to MongoDB
const syncUser = async (req, res) => {
  try {
    const clerkUser = await clerkClient.users.getUser(req.auth.userId); // Fixed usage

    const existingUser = await User.findOne({ clerkId: clerkUser.id });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const newUser = await User.create({
      clerkId: clerkUser.id,
      name: `${clerkUser.firstName} ${clerkUser.lastName}`,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      role: "buyer", // default role
      image: clerkUser.imageUrl,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { syncUser };