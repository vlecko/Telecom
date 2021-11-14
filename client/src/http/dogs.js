import $host from './index';

export const getDogs = async (page) => {
  const response = await $host.get(`/dog/${page}`);
  return response;
}

export const getBreed = async (id) => {
  const response = await $host.get(`/dogs/${id}`);
  return response;
}
export const getDog = async (title) => {
  const response = await $host.get(`/dogs/dog/${title}`);
  return response;
}

