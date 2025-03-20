// src/daos/user.dao.js
import { User } from "../models/user.model.js";

class UserDAO {
  // Obtiene todos los usuarios
  async getAll() {
    return User.find();
  }

  // Obtiene un usuario por ID
  async getById(id) {
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
    return User.findByIdAndUpdate(id, user, { new: true });
  }

    // Elimina un usuario
    async delete(id) {
      return User.findByIdAndDelete(id);  // Este método ya usa el ObjectId correctamente
    }

    async deleteAll(){
      return User.deleteMany({});
    }
}

export const userDAO = new UserDAO();
