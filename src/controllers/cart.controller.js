import { cartDBManager } from '../dao/cartDBManager.js';
import { productDBManager } from '../dao/productDBManager.js';

const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);

export const getCartByID = async (req, res) => {
    try {
        const result = await CartService.getProductsFromCartByID(req.params.cid);  // Obtener productos en el carrito por ID
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

export const createCart = async (req, res) => {
    try {
        const result = await CartService.createCart();  // Crear un nuevo carrito
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

export const addProductToCart = async (req, res) => {
    try {
        const result = await CartService.addProductByID(req.params.cid, req.params.pid);  // Agregar producto al carrito
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

export const deleteProductFromCart = async (req, res) => {
    try {
        const result = await CartService.deleteProductByID(req.params.cid, req.params.pid);  // Eliminar producto del carrito
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

export const updateAllProductsInCart = async (req, res) => {
    try {
        const result = await CartService.updateAllProducts(req.params.cid, req.body.products);  // Actualizar todos los productos en el carrito
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

export const updateProductInCart = async (req, res) => {
    try {
        const result = await CartService.updateProductByID(req.params.cid, req.params.pid, req.body.quantity);  // Actualizar cantidad de un producto en el carrito
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

export const deleteAllProductsFromCart = async (req, res) => {
    try {
        const result = await CartService.deleteAllProducts(req.params.cid);  // Eliminar todos los productos del carrito
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
