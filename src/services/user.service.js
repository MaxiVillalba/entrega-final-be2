// src/services/user.service.js
import { userDAO } from "../daos/user.dao.js";
import { generateTicket } from "../utils/ticket.util.js";
import { mailService } from "./mail.service.js";

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
      console.log("📩 Datos recibidos para crear usuario:", user);

      // Validación de datos antes de la creación
      if (!user.name || !user.lastName) {
        throw new Error("User name and last name are required for ticket generation.");
      }

      // Verificar si el email ya existe
      if (!user.email) {
        throw new Error("User email is required.");
      }
      const existingUser = await userDAO.getUserByEmail(user.email);
      if (existingUser) {
        throw new Error("Email is already in use");
      }

      // Crear el usuario en la base de datos
      const newUser = await userDAO.create(user);
      console.log("✅ Usuario creado correctamente en la base de datos:", newUser);

      // Generar el ticket con datos correctos
      const ticket = generateTicket({
        userName: newUser.name,
        userLastName: newUser.lastName
      });

      console.log("🎫 Ticket generado:", ticket.ticketCode);

      // Enviar correo de bienvenida
      await mailService.sendMail({
        to: newUser.email,
        subject: "EFBE2-STORE Te da la bienvenida!",
        type: "WELCOME",
        ticket: ticket // Añadido para pasar el ticket
      });

      return { user: newUser, ticket };
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
      return await userDAO.delete(id);
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }

  // Elimina todos los usuarios
  async deleteAll() {
    try {
      return await userDAO.deleteAll();
    } catch (error) {
      console.log("Error deleting all users: " + error.message);
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
