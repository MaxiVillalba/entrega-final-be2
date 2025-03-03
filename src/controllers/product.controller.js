import { productDBManager } from '../dao/productDBManager.js';

const ProductService = new productDBManager();

export const getAllProducts = async (req, res) => {
    try {
        const result = await ProductService.getAllProducts(req.query);  // Obtener productos con parámetros de consulta
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
};

export const getProductByID = async (req, res) => {
    try {
        const result = await ProductService.getProductByID(req.params.pid);  // Obtener producto por ID
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const result = await ProductService.createProduct(req.body);  // Crear un nuevo producto
        res.status(201).send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const result = await ProductService.updateProduct(req.params.pid, req.body);  // Actualizar producto
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const result = await ProductService.deleteProduct(req.params.pid);  // Eliminar producto por ID
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
};
