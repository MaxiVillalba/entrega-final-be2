// src/services/user.service.js
import logger from "../common/logger.handler.js"; // Importa el default export de logger
import { userDAO } from "../daos/user.dao.js";
import { generateTicket } from "../utils/ticket.util.js";
// Nota: Quitamos la importación estática de mailService para evitar circularidades.

class UserService {
  async getAll() {
    try {
      return await userDAO.getAll();
    } catch (error) {
      logger.error("Error fetching users: " + error.message);
      throw new Error("Error fetching users: " + error.message);
    }
  }

  async getById(id) {
    try {
      return await userDAO.getById(id);
    } catch (error) {
      logger.error("Error fetching user by ID: " + error.message);
      throw new Error("Error fetching user by ID: " + error.message);
    }
  }

  async create(user) {
    try {
      console.log("📩 Datos recibidos para crear usuario:", user);

      // Validaciones básicas
      if (!user.name || !user.lastName) {
        throw new Error("User name and last name are required for ticket generation.");
      }
      if (!user.email) {
        throw new Error("User email is required.");
      }
      
      // Verificar si el usuario ya existe
      const existingUser = await userDAO.getUserByEmail(user.email);
      if (existingUser) {
        throw new Error("Email is already in use");
      }
      
      // Crear el usuario en la base de datos
      const newUser = await userDAO.create(user);
      console.log("✅ Usuario creado correctamente en la base de datos:", newUser);

      // Generar ticket
      const ticket = generateTicket({
        userName: newUser.name,
        userLastName: newUser.lastName
      });
      console.log("🎫 Ticket generado:", ticket.ticketCode);

      // IMPORTANTE: Para romper una posible circularidad,
      // se importa mailService dinámicamente justo cuando se necesite.
      const { mailService } = await import("./mail.service.js");
      await mailService.sendMail({
        to: newUser.email,
        subject: "EFBE2-STORE Te da la bienvenida!",
        type: "WELCOME",
        ticket: ticket
      });

      return { user: newUser, ticket };
    } catch (error) {
      // Registro de error y verificación temporal para confirmar la disponibilidad del logger
      console.log("DEBUG: error en UserService.create, logger:", typeof logger);
      logger.error("Error creating user: " + error.message);
      throw new Error("Error creating user: " + error.message);
    }
  }


  // Actualiza un usuario
  async update(id, user) {
    try {
      return await userDAO.update(id, user);
    } catch (error) {
      logger.error("Error updating user: " + error.message);
      throw new Error("Error updating user: " + error.message);
    }
  }

  // Elimina un usuario
  async delete(id) {
    try {
      return await userDAO.delete(id);
    } catch (error) {
      logger.error("Error deleting user: " + error.message);
      throw new Error("Error deleting user: " + error.message);
    }
  }

  // Elimina todos los usuarios
  async deleteAll() {
    try {
      return await userDAO.deleteAll();
    } catch (error) {
      logger.error("Error deleting all users: " + error.message);
      console.log("Error deleting all users: " + error.message);
    }
  }

  // Obtiene un usuario por correo electrónico
  async getUserByEmail(email) {
    try {
      return await userDAO.getUserByEmail(email);
    } catch (error) {
      logger.error("Error fetching user by email: " + error.message);
      throw new Error("Error fetching user by email: " + error.message);
    }
  }
}

export const userService = new UserService();