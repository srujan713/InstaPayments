"use client";

import React, { useState } from 'react'; 
import { PaymentOption } from '@/types';

interface PaymentOptionsProps {
  options: PaymentOption[];
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  // console.log(options)

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Payment Options</h2>
      <div className="flex flex-wrap">
        {options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center justify-center mr-4 mb-3 py-1 px-4 rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${option === selectedOption ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleOptionChange(option)}
          >
            <input
              type="radio"
              id={`paymentOption${index}`}
              name="paymentOption"
              value={option}
              checked={option === selectedOption}
              onChange={() => handleOptionChange(option)}
              className="sr-only"
            />
            <label htmlFor={`paymentOption${index}`} className="select-none">{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;  