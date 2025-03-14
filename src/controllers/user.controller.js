import { mailService } from "../services/mail.service.js";
import { userService } from "../services/user.service.js";
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
      console.log("🟢 Datos recibidos en req.body:", req.body);

      // FIX: Pasamos los datos correctamente sin envolver en { user: req.body }
      const user = await userService.create(req.body);

      console.log("✅ Usuario creado con éxito:", user);

      // Enviar correo de bienvenida
      await mailService.sendMail({
        to: user.email,
        subject: "EFBE2-STORE Te da la bienvenida!",
      });

      /*
      // ⚠️ `smsService` comentado para evitar errores si aún no está implementado
      await smsService.sendMessage({
        to: "+541134853029",
        message: `Bienvenido a EFBE2-STORE, ${user.name}!`,
      });
      */

      return res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Actualiza un usuario por su ID.
   */
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

  /**
   * Elimina un usuario por su ID.
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      // Validación de ID
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const deleted = await userService.delete(Number(id));

      if (!deleted) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
