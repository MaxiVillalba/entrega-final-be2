import userModel from "../models/user.model.js";

class UserDAO {
    async getAllUsers() {
        return await userModel.find();
    }

    async getUserByID(uid) {
        const user = await userModel.findById(uid);
        if (!user) throw new Error(`El usuario ${uid} no existe!`);
        return user;
    }

    async getUserByEmail(email) {
        return await userModel.findOne({ email });
    }

    async createUser(data) {
        const { name, email, password, role } = data;
        if (!name || !email || !password) {
            throw new Error("Faltan datos obligatorios para crear el usuario.");
        }
        return await userModel.create({ name, email, password, role: role || "user" });
    }

    async deleteUser(uid) {
        const result = await userModel.findByIdAndDelete(uid);
        if (!result) throw new Error(`El usuario ${uid} no existe!`);
        return result;
    }
}

export default new UserDAO();
