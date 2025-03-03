// config.js
export const config = {
    mongoDB: {
        url: process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret',
        expiresIn: '1h'  // Tiempo de expiración del JWT
    },
    server: {
        port: process.env.PORT || 3000
    }
};
