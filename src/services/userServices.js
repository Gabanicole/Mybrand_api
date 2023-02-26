import User from "../models/user";

export class UserServices {
    static async createUser(data) {
        return await data.save()
    }
    static async getAllUsers() {
        const users = await User.find()
        return users
    }
    static async getUser(id) {
        return await User.findOne({ _id: id })
    }

    static async userExist (email){
        const user = await User.findOne({ email: email })
        if (user) {
            return user
        } else {
            return false
        }
    }

    static async updateUser(id) {

    }
    static async deleteUser(id) {}

}