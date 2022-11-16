import { Router } from "express";

import User from "../models/User.model.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const userFromDb = await User.find().populate("rooms");
    res.status(200).json(userFromDb);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
