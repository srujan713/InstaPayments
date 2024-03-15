import axios from 'axios';
import { OrderDetailsResponse } from '@/types';  

export const fetchOrderDetails = async (): Promise<OrderDetailsResponse> => {
  try {
    const response = await axios.get<OrderDetailsResponse>('https://groww-intern-assignment.vercel.app/v1/api/order-details');
    return response.data;
  } catch (error: any) {  
    if (error.response) {
      throw new Error(`Server responded with status code ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
};
