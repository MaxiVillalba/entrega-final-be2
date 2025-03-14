import { User } from "../models/user.model.js";

class UserDAO {
  async getAll() {
    return User.find();
  }

  async getById(id) {
    return User.findById(id);
  }

  async create(user) {
    return User.create(user);
  }

  async update(id, user) {
    return User.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id) {
    return User.findByIdAndDelete(id);
  }
}

export const userDAO = new UserDAO();
