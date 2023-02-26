import User from "../models/user";
import { UserServices } from "../services/userServices";
import { generateToken } from "../helpers/jwtFunctions.js"
import { comparePassword, hashPassword } from "../helpers/passwordSecurity"
export class UserController {


    constructor() {

    }


    async createUser(req, res, next) {

        try {
            const exit = await UserServices.userExist(req.body.email)
            console.log(req.body.email);
            if (exit) {
                console.log(exit);
                res.status(409).json({ status: 409, message: "User with this email already exist. use different one" })
            }else{
                const user = await new User({
                    name: req.body.name,
                    username: req.body.username,
                    password: hashPassword(req.body.password),
                    email: req.body.email
                })
                const createdUser = await UserServices.createUser(user)
                res.status(201).send(createdUser)
            }
            
        } catch (error) {
            console.log(error);
            res.status(406).send({
                error: 'User already exist'
            })
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await UserServices.getAllUsers()
            res.send(users)
        } catch (error) {
            res.status(404).send({error: 'Resources not found'})
        }

    }


    async login(req, res, next) {
        try {
            const exist =  await UserServices.userExist(req.body.email)
            if (exist) {
                const valid = await comparePassword(req.body.password, exist.password)
                if (!valid) {
                    res.status(403).json({ status: 403, message: "Invalid credentials" })
                }
                const token = await generateToken({ id: exist._id })
                res.status(200).json({ status: 200, message: "Logged in successfully", accessToken: token })
            } else {
                res.status(403).json({ status: 403, message: "Invalid credentials" })
            }

        } catch (error) {
            res.status(404).send({error: 'Resources not found!'})
        }
    }

    async getUser(req, res, next) {
        try {
            const user = await UserServices.getUser(req.params.id)
            res.send(user)
        } catch (error) {
            res.status(404).send({error: error})
        }
    }
    updateUser(req, res, next) {}
    deleteUser(req, res, next) {}
}