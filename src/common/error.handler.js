// filepath: src/common/error.handler.js
import { logger } from './logger.handler.js';

export const handleError = (error, req, res, next) => {
    logger.error(error.stack || error.message);

    if (error.status) {
        return res.status(error.status).json({ message: error.message });
    }

    res.status(500).json({ message: 'Internal Server Error' });
};