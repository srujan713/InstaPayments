"use client"; 

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { fetchOrderDetails } from '@/actions/get-order-details'; 
import PaymentOptions from '../(components)/paymentoptions';  
import { OrderDetailsResponse } from '@/types'; 

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.707 5.293a1 1 0 010 1.414L8.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const LoadingAnimation = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-yellow-500 mb-4"></div> 
    <p className="text-lg font-semibold text-gray-700">Loading...</p>
  </div>
);

const NoItemsMessage = () => (
  <div className="flex justify-center items-center h-screen">
    <p className="text-xl font-semibold text-gray-700">Your cart is empty</p> 
  </div>
);

const CheckoutPage: React.FC<Props> = ({ onSuccessPageLink }) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetailsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrderDetails();
        setOrderDetails(data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) return <LoadingAnimation />; 
  if (error) return <p className="text-center mt-4">Error: {error.message}</p>;
  if (!orderDetails || !orderDetails.products.length) return <NoItemsMessage />; 

  let total = 0;
  orderDetails.products.forEach((product) => {
    total += product.price * product.quantity;
  });
   
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-bold mr-2">Checkout</h1>
        <button className="flex items-center  hover:bg-yellow-200 text-gray-900 font-semibold py-1 px-2 rounded-lg  transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 border border-yellow-400 ml-1">
          <ChevronLeftIcon />   
          Back
        </button>    
      </div>  
      <div> 
        <h2 className="text-xl font-semibold mb-4 mt-3">Order Summary</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orderDetails.products.map((product) => (  
            <li key={product.id} className="border rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
              <div className="flex items-center p-4">
                <div className="relative w-20 h-20 mr-5 mt-2 mr-4 mb-11">
                  <img src={product.image} alt="Product Image" layout="fill" objectFit="cover" align='center' />
                </div>
                <div>
                  <p className="text-lg font-semibold">{product.title}</p>
                  <p className="text-sm text-gray-600 align-items-bottom">Quantity: {product.quantity}</p>
                  <p className="text-sm text-gray-600">MRP: &#8377; {product.price}</p>
                  <p className="text-sm text-gray-600">Total Price: &#8377; {(product.price * product.quantity).toFixed(2)}</p> 
                </div>
              </div>
            </li>
          ))}
        </ul>  
        <p className="text-xl font-semibold mt-7 mb-6">Total Amount: &#8377; {total.toFixed(2)}</p>  
      </div>   
      <PaymentOptions options={orderDetails?.paymentMethods || []} />     
      <button  onClick={() => router.push("/ordersuccessfulpage")} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">Proceed to Pay</button> 
    </div>
  );
};

export default CheckoutPage;   