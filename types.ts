export interface OrderDetail {
    id: number;
    name: string;
    price: number;
}
     
export interface PaymentOption {
    id: number;
    name: string;
}
  
export interface OrderDetailsResponse {
    products: OrderDetail[];
    total: number;
    paymentMethods: PaymentOption[];
}
  