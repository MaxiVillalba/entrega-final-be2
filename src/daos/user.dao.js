// src/daos/user.dao.js
import { User } from "../models/user.model.js";

class UserDAO {
  // Obtiene todos los usuarios
  async getAll() {
    return User.find();
  }

  // Obtiene un usuario por ID
  async getById(id) {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid ID format");
    }
    return User.findById(id);
  }

  // Obtiene un usuario por email
  async getUserByEmail(email) {
    return User.findOne({ email });
  }

  // Crea un nuevo usuario
  async create(user) {
    return User.create(user);
  }

  // Actualiza un usuario
  async update(id, user) {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid ID format");
    }
    return User.findByIdAndUpdate(id, user, { new: true });
  }

  // Elimina un usuario
  async delete(id) {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid ID format");
    }
    return User.findByIdAndDelete(id);  // Este método ya usa el ObjectId correctamente
  }

  // Elimina todos los usuarios
  async deleteAll() {
    return User.deleteMany({});
  }
}

export const userDAO = new UserDAO();
