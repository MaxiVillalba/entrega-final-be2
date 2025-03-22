// filepath: src/utils/jwt.js
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/config.js';

export function generateToken(payload) {
    return jwt.sign(payload, CONFIG.JWT_SECRET, { expiresIn: '2m' });
}

export function verifyToken(token) {
    return jwt.verify(token, CONFIG.JWT_SECRET);
}