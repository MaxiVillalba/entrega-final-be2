class CartDTO {
    constructor({ _id, products }) {
        this.id = _id;
        this.products = products.map(p => ({
            product: p.product._id,
            title: p.product.title,
            price: p.product.price,
            quantity: p.quantity
        }));
    }
}

export default CartDTO;
