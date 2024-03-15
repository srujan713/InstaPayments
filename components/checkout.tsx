"use client";

import React, { useEffect, useState } from 'react';
import { fetchOrderDetails } from '@/actions/get-order-details';
import { OrderDetailsResponse } from '@/types';

const CheckoutPage: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetailsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!orderDetails || !orderDetails.products.length) return <p>No items in the cart</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <ul className="mb-4">
          {orderDetails.products.map(product => (
            <li key={product.id} className="flex justify-between items-center mb-2">
              <span>{product.name}</span>
              <span>${product.price.toFixed(2)}</span> {/* Assuming price is a float */}
            </li>
          ))}
        </ul>
        <p className="text-xl font-semibold mb-2">Total: ${orderDetails.total?.toFixed(2)}</p>
      </div>
      <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Proceed to Payment</button>
    </div>
  );
};

export default CheckoutPage;