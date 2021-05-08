import axios from 'axios';

const urlApi =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL_DEV;

const url = `${urlApi}/api/films`;

export const fetchFilms = (page, size, searchData) => {
  let search = ''
  if (searchData) {
    for (const [key, value] of Object.entries(searchData)) {
      if (value !== '') {
        search +=`&${key}=${value}`
      }      
    }
  }
  
  return axios.get(`${url}?page=${page}&size=${size}${search}`);
}
export const fetchFilm = (id) => axios.get(`${url}/${id}`);
export const createFilm = (newFilm) => axios.post(url, newFilm);
export const updateFilm = (id, updatedFilm) =>
  axios.patch(`${url}/${id}`, updatedFilm);
export const deleteFilm = (id) => axios.delete(`${url}/${id}`);
