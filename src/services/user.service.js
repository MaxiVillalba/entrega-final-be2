import { userDAO } from "../daos/user.dao.js";

class UserService {
  async getAll() {
    return userDAO.getAll();
  }

  async getById(id) {
    return userDAO.getById(id);
  }

  async create(user) {
    return userDAO.create(user);
  }

  async update(id, user) {
    return userDAO.update(id, user);
  }

  async delete(id) {
    try {
      return await userDAO.delete(id);
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}

export const userService = new UserService();
