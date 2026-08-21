import apiClient from './client';

export const fetchExampleData = async (): Promise<unknown> => {
  const response = await apiClient.get('/example');
  return response.data;
};
