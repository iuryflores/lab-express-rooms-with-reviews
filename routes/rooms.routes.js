import { Router } from "express";

import Room from "../models/Room.model.js";
import User from "../models/User.model.js";

const router = Router();

router.get("/rooms", async (req, res, next) => {
  try {
    const allRooms = await Room.find();
    res.status(200).json(allRooms);
  } catch (erro) {
    next(error);
  }
});

router.post("/create-room/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if(!user){
      return res.status(404).json({msg:'not found'})
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
  
});

export default router;
