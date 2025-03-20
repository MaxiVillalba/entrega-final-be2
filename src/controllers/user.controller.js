// src/controllers/user.controller.js
import mongoose from "mongoose";
import { mailService } from "../services/mail.service.js";
import { userService } from "../services/user.service.js";
import { generateTicket } from "../utils/ticket.util.js";
// import { smsService } from "../services/sms.service.js"; // Aún no se implementa

class UserController {

  async getAll(req, res, next) {
    try {
      const users = await userService.getAll();
      return res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const user = await userService.getById(Number(id));

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { name, lastName, email, role } = req.body;
      console.log("Datos recibidos en req.body:", req.body);

      // Verificación del email
      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "El correo electrónico ya está registrado" });
      }

      // Validación de los campos de nombre y apellido
      if (!name || !lastName) {
        return res.status(400).json({ error: "Nombre y apellido son campos requeridos" });
      }

      // Crear el usuario en el servicio
      const user = await userService.create(req.body);
      console.log("✅ Usuario creado con éxito:", user);

      // Verificar que el usuario tiene nombre y apellido antes de generar el ticket
      if (!user.name || !user.lastName) {
        return res.status(400).json({ error: "Nombre y apellido son necesarios para la generación del ticket" });
      }

      // Generar ticket
      const ticket = generateTicket(user);

      // Enviar correo de bienvenida
      await mailService.sendMail({
        to: user.email,
        subject: "EFBE2-STORE Te da la bienvenida!",
        type: "WELCOME",
        ticket: ticket,
      });

      // Si tienes un servicio de SMS, descomenta este bloque
      /*
      await smsService.sendMessage({
        to: "+34694281665",
        message: `Bienvenido a EFBE2-STORE, ${user.name}!`,
      });
      */

      return res.status(201).json({ user, ticket });
    } catch (error) {
      next(error);
    }
  }

  // Actualiza un usuario por su ID.
  async update(req, res, next) {
    try {
      const { id } = req.params;

      // Validación de ID
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      // Validación de datos para actualizar
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Update data is required" });
      }

      const user = await userService.update(Number(id), req.body);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  // Elimina un usuario por su ID.
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const deletedUser = await userService.delete(id);

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  // Elimina todos los usuarios
  async deleteAll(req, res, next) {
    try {
      const result = await userService.deleteAll();

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "No users found to delete" });
      }

      return res.status(200).json({ message: `${result.deletedCount} users deleted successfully` });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
