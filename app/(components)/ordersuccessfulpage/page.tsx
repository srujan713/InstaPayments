"use client";  
import React from 'react';

const getRandomStatus = () => {
  const statuses = ['Successful', 'Failed', 'Pending'];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];  
};

const OrderSuccessfulPage: React.FC = () => {
  const orderStatus = getRandomStatus();   

  let imageSrc = '';
  switch (orderStatus) {
    case 'Successful':
      imageSrc = '/order-success.jpg';
      break;
    case 'Failed':
      imageSrc = '/order-failed.jpg';
      break;
    case 'Pending':
      imageSrc = '/order-pending.jpg';
      break;
    default:
      imageSrc = '';
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4 text-center">Order {orderStatus}</h1>
          <div className="mb-4">
            {imageSrc && <img src={imageSrc} alt="Order Status" className="w-full rounded-lg" />}
          </div>
          {orderStatus === 'Successful' && (
            <p className="text-lg text-gray-700 text-center">Your order has been successfully placed. Thank you for shopping with us!</p>
          )}
          {orderStatus === 'Failed' && (
            <p className="text-lg text-gray-700 text-center">Oops! Something went wrong with your order. Please try again later.</p>
          )}
          {orderStatus === 'Pending' && (
            <p className="text-lg text-gray-700 text-center">Your order is currently pending. We'll update you once it's processed.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessfulPage; 