import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    private products = [
        { id: 1, name: "Mobile", price: 20000 },
        { id: 2, name: "Watch", price: 2500 },
        { id: 3, name: "Laptop", price: 365000 },
    ]
    getAllProducts() {
        return this.products
    }
    getProductById(id: number) {
        return this.products.find((p) => p.id === id);
    }
}
