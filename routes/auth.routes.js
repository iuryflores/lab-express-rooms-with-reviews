import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.model.js";

const router = Router();

//Lits users
router.get("/users", async (req, res, next) => {
  const allUsers = await User.find();
  console.log(allUsers);
  res.status(200).json(allUsers);
});

//Signup User
router.post("/users/signup", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    //Check if all fields was filled
    if (!fullName || !email || !password) {
      return res.status(400).json({ msg: "all field are required!" });
    }

    //Check if email is valid one
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Your email is not valid." });
    }

    //Check if the email was already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "Email already registered!" });
    }

    //Create salt password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    //Create new user
    const newUser = await User.create({
      fullName,
      email,
      password: passwordHash,
    });
    return res
      .status(201)
      .json({ fullName: newUser.fullName, email: newUser.email });
  } catch (error) {
    next(error);
  }
});

//Login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found!" });
    }

    //Compare if the password matchs
    const compareHash = bcrypt.compareSync(password, user.password);

    //Check if the password is wrong
    if (!compareHash) {
      console.log(`Wrong email or passoword`);
      return res.status(400).json({ msg: "Wrong email or password!" });
    }

    //Create payload
    const payload = { id: user._id, email: user.email };

    //Create token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    console.log(`${user.fullName} - ${user.email}, logged in`);
    res.status(200).json({ ...payload, token });
  } catch (error) {
    next(error);
  }
});

export default router;
