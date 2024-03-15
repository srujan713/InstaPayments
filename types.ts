export interface OrderDetailsResponse {
    products: Product[];
    paymentMethods: string[];
}   

export interface PaymentOption{
    paymentoptions: string[]
}

export interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
}  