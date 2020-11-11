import { Product } from './Product';

export class ShoppingCart{
    products: Article[];
}

export class Article extends Product{
    quantity : number;


    public static fromProduct(product : Product) : Article{
        return new Article(product.id, product.title, product.description, product.price, product.imgUrl, product.color, product.width, product.height, product.garantie, 1);
    }

    constructor(id: number, title: string, description: string, price: number, imgUrl: string, color: string, width: number, height: number, garantie: number, quantity: number){
        super(id, title, description, price, imgUrl, color, width, height, garantie);
        this.quantity = quantity;
    }

    
}