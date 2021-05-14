import axiosCall from './axios';

export const fetchFilms = (page, size, searchData) => {
  let search = '';
  if (searchData) {
    for (const [key, value] of Object.entries(searchData)) {
      if (value !== '') {
        search += `&${key}=${value}`;
      }
    }
  }
  const params = `films?page=${page}&size=${size}${search}`;
  return axiosCall(params, 'get', searchData);
};

export const fetchFilm = (id) => {
  const params = `films/${id}`;
  return axiosCall(params, 'get');
};

export const createFilm = (newFilm) => {
  const params = `films`;
  return axiosCall(params, 'post', newFilm);
};

export const updateFilm = (id, updatedFilm) => {
  const params = `films/${id}`;
  return axiosCall(params, 'put', updatedFilm);
};

export const deleteFilm = (id) => {
  const params = `films/${id}`;
  return axiosCall(params, 'delete');
};

export const login = (authData) => {
  const params = `auth/login`;
  return axiosCall(params, 'post', authData);
};

export const resetPwd = (authData) => {
  const params = `auth/reset-password`;
  return axiosCall(params, 'put', authData);
};
