import { Product } from "./product";

export class CartItemModel {

    productId: number;
    productName: string;
    productPrice: string;
    qty: number;
    imageUrl: string;

    constructor(product:Product){
        this.productId = product.id;
        this.productName = product.name;
        this.productPrice = product.price;
        this.qty = 1;
        this.imageUrl = product.imageUrl;
    }
}
