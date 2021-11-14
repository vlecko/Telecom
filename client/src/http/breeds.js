import $host from './index';

export const getBreeds = async () => {
  const response = await $host.get('/');
  return response;
}