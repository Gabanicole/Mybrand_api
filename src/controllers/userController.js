import User from "../models/user";
import { generateToken } from "../helpers/jwtFunctions.js";
import { comparePassword, hashPassword } from "../helpers/passwordSecurity";
export class UserController {
  constructor() {}

  async createUser(req, res) {
    try {
      // const exit = await UserServices.userExist(req.body.email)
      // if (exit) {
      //     console.log(exit);
      //     res.status(409).json({ status: 409, message: "User with this email already exist. use different one" })
      // }else{
      const user = await new User({
        // name: req.body.name,
        username: req.body.username,
        password: hashPassword(req.body.password),
        email: req.body.email,
      });
      await user.save();
      //const createdUser = await UserServices.createUser(user)
      res.status(201).json(user);
      //}
    } catch (error) {
      console.log(error);
      res.status(406).send({
        error: error.message,
      });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserServices.getAllUsers();
      res.send(users);
    } catch (error) {
      res.status(404).send({ error: "Resources not found" });
    }
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).json({ message: "Invalid User" });
      const validated = await comparePassword(req.body.password, user.password);
      if (!validated)
        return res.status(400).json({ message: "Invalid Password" });
      const token = await generateToken({ id: user._id });
      return res
        .status(200)
        .json({ message: "Successfully Logged In", data: user, token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server error", error: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const user = await UserServices.getUser(req.params.id);
      res.send(user);
    } catch (error) {
      res.status(404).send({ error: error });
    }
  }
  updateUser(req, res) {}
  deleteUser(req, res) {}
}
