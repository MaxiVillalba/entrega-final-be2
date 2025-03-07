import { mailService } from "../services/mail.service.js";
import { userService } from "../services/user.service.js";

import { EMAIL_TYPES } from "../common/constants/email.types.js"
class UserController {
  async getAll(req, res) {
    try {
      const users = await userService.getAll();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getById({ id });

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error,
      });
    }
  }

  async create(req, res) {
    try {
      const user = await userService.create({
        user: req.body,
      });

      await mailService.sendMail({
        to: user.email,
        subject: "EFBE2-STORE Te da la bienvenida!",
        // type: EMAIL_TYPES.WELCOME,
      });

      await smsService.sendMessage({
        to: "+541134853029",
        message: `Bienvenido a Coder Eats, ${user.name}!`,
      });

      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.update({ id, user: req.body });

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.delete(id);

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }
}

export const userController = new UserController();
