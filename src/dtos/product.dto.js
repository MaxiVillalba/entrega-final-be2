class ProductDTO {
    constructor({ _id, title, description, price, category, stock, thumbnails }) {
        this.id = _id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category;
        this.stock = stock;
        this.thumbnails = thumbnails || [];
    }
}

export default ProductDTO;
