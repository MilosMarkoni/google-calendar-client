import axios from 'axios';
import { API_BASE_URL } from './routes';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getCalendarEventsAPI = async (
  providerToken: string | null = null,
  params: URLSearchParams = new URLSearchParams(),
) => {
  const response = await apiClient.get(`/primary/events?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${providerToken}`,
    },
    params,
  });
  return response.data;
};
