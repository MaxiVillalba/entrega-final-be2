import mongoose from "mongoose";
import { mailService } from "../services/mail.service.js";
import { userService } from "../services/user.service.js";
import { generateTicket } from "../utils/ticket.util.js";
import { EMAIL_TYPES } from "../common/constants/email.types.js";
// import { smsService } from "../services/sms.service.js"; // Aún no se implementa

class UserController {
  // Obtiene todos los usuarios
  async getAll(req, res, next) {
    try {
      const users = await userService.getAll();
      return res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  // Obtiene un usuario por ID
  async getById(req, res, next) {
    try {
      const { id } = req.params;

      // Validación del formato del ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const user = await userService.getById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  // Crea un nuevo usuario
  async create(req, res, next) {
    try {
      const { name, lastName, email, role } = req.body;
      console.log("📩 Datos recibidos en req.body:", req.body);

      if (!name || !lastName || !email || !role) {
        return res.status(400).json({ error: "Nombre, apellido, email y rol son requeridos." });
      }

      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "El correo electrónico ya está registrado" });
      }

// Crear el usuario y generar el ticket
const newUserData = await userService.create({ name, lastName, email, role });

// Se asume que newUserData tiene la forma: { user, ticket }
if (!newUserData || !newUserData.user || !newUserData.user.name || !newUserData.user.lastName) {
  console.error("Error: No se generó correctamente el usuario");
  return res.status(500).json({ error: "No se pudo registrar el usuario correctamente" });
}

console.log("✅ Usuario creado con éxito:", newUserData);
console.log(`🎫 Ticket generado para registro: ${newUserData.ticket.ticketCode}`);

// Enviar correo de bienvenida con datos personalizados
const registrationData = {
  name: newUserData.user.name,
  lastName: newUserData.user.lastName,
  email: newUserData.user.email,
  role: newUserData.user.role,
  createdAt: newUserData.user.createdAt
  // Agregá otros campos que desees mostrar
};

await mailService.sendMail({
  to: newUserData.user.email,
  subject: `${newUserData.user.name}, EFBE2-STORE Te da la bienvenida!`,
  type: EMAIL_TYPES.WELCOME,
  ticket: newUserData.ticket.ticketCode,
  name: newUserData.user.name,
  registrationData: registrationData,
});

return res.status(201).json({
  message: "Usuario registrado exitosamente.",
  user: newUserData.user,
  ticket: newUserData.ticket,
});

    } catch (error) {
      console.error("❌ Error al registrar usuario:", error);
      next(error);
    }
  }

  // Realiza el checkout de un usuario
  async checkout(req, res, next) {
    try {
      const { userId } = req.params;

      // Validación del formato del ID
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const user = await userService.getById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Generar ticket de compra
      const purchaseTicket = generateTicket(user);
      console.log(`🛒 Ticket de compra generado: ${purchaseTicket.ticketCode}`);

      // Enviar correo de confirmación de compra con el ticket
      await mailService.sendMail({
        to: user.email,
        subject: "Confirmación de compra en EFBE2-STORE",
        type: "PURCHASE_CONFIRMATION",
        ticket: purchaseTicket, // Asegurarse de que el ticket sea incluido en el correo
      });

      return res.status(200).json({
        message: "Compra realizada con éxito.",
        user,
        ticket: purchaseTicket,
      });
    } catch (error) {
      console.error("❌ Error en el checkout:", error);
      next(error);
    }
  }

  // Actualiza un usuario
  async update(req, res, next) {
    try {
      const { id } = req.params;

      // Validación del ID
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      // Verificación de los datos de actualización
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

  // Elimina un usuario
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      // Validación del ID
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
