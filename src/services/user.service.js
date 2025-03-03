import UserManager from "../managers/UserManager.js";
import bcrypt from "bcrypt";

class UserService {
    async getAllUsers() {
        return await UserManager.getAllUsers();
    }

    async getUserByID(uid) {
        return await UserManager.getUserByID(uid);
    }

    async getUserByEmail(email) {
        return await UserManager.getUserByEmail(email);
    }

    async createUser(data) {
        const existingUser = await this.getUserByEmail(data.email);
        if (existingUser) throw new Error("El usuario ya existe!");

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        return await UserManager.createUser(data);
    }

    async deleteUser(uid) {
        return await UserManager.deleteUser(uid);
    }
}

export default new UserService();
