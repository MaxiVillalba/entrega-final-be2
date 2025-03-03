import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userDBManager } from '../dao/userDBManager.js';

const UserService = new userDBManager();

export const login = async (req, res) => {
    try {
        const user = await UserService.getUserByEmail(req.body.email);  // Obtener usuario por correo
        if (!user) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);  // Comparar contraseñas
        if (!validPassword) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });  // Generar token JWT
        res.send({ token });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await UserService.getUserByEmail(email);  // Comprobar si el usuario ya existe
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);  // Hash de la contraseña
        const newUser = await UserService.createUser({ ...req.body, password: hashedPassword });  // Crear nuevo usuario
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const current = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.user.userId);  // Obtener el usuario actual
        res.send({ user });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
