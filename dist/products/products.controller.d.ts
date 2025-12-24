export declare class ProductsController {
    getProducts(limit: string): Promise<{
        id: number;
        name: string;
        price: number;
        image: string;
        description: string;
    }[]>;
    getProduct(id: string): Promise<{
        id: number;
        name: string;
        price: number;
        image: string;
        description: string;
    }>;
}
