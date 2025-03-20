// src/services/user.service.js
import { userDAO } from "../daos/user.dao.js";
import { generateTicket } from "../utils/ticket.util.js"; // Importamos la función para generar ticket
import { mailService } from "./mail.service.js"; // Importamos el servicio de mail

class UserService {
  // Obtiene todos los usuarios
  async getAll() {
    try {
      return await userDAO.getAll();
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }

  // Obtiene un usuario por ID
  async getById(id) {
    try {
      return await userDAO.getById(id);
    } catch (error) {
      throw new Error("Error fetching user by ID: " + error.message);
    }
  }

  // Crea un nuevo usuario
  async create(user) {
    try {
      console.log("Datos recibidos para crear usuario:", user);

      // Validación para verificar si el nombre completo y el apellido están presentes
      if (!user.name || !user.lastName) {
        throw new Error("User name or last name is missing.");
      }

      // Verificamos si el email ya existe
      const existingUser = await userDAO.getUserByEmail(user.email);
      if (existingUser) {
        throw new Error("Email is already in use");
      }

      // Creamos al usuario en la base de datos
      const newUser = await userDAO.create(user);

      // Generamos un ticket para el usuario
      const ticket = generateTicket(newUser);

      // Enviamos el email de bienvenida con el ticket
      await mailService.sendMail({
        to: newUser.email,
        subject: "EFBE2-STORE Te da la bienvenida!",
        type: "WELCOME", // Correo de bienvenida
      });

      return { user: newUser, ticket }; // Devolvemos también el ticket generado
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  // Actualiza un usuario
  async update(id, user) {
    try {
      return await userDAO.update(id, user);
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  // Elimina un usuario
  async delete(id) {
    try {
      return await userDAO.delete(id);  // Aquí ya pasas el id tal como es
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }

  async deleteAll() {
    try {
      return await userDAO.deleteAll();
    } catch (error) {
      throw new Error("Error deleting all users: " + error.message);
    }
  }

  // Obtiene un usuario por correo electrónico
  async getUserByEmail(email) {
    try {
      return await userDAO.getUserByEmail(email);
    } catch (error) {
      throw new Error("Error fetching user by email: " + error.message);
    }
  }
}

export const userService = new UserService();
