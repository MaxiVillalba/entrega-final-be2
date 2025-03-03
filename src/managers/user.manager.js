import UserDAO from "../dao/UserDAO.js";
import UserDTO from "../dto/UserDTO.js";

class UserManager {
    async getAllUsers() {
        const users = await UserDAO.getAllUsers();
        return users.map(user => new UserDTO(user));
    }

    async getUserByID(uid) {
        const user = await UserDAO.getUserByID(uid);
        return new UserDTO(user);
    }

    async getUserByEmail(email) {
        return await UserDAO.getUserByEmail(email);
    }

    async createUser(data) {
        return await UserDAO.createUser(data);
    }

    async deleteUser(uid) {
        return await UserDAO.deleteUser(uid);
    }
}

export default new UserManager();
