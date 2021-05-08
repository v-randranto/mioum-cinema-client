import * as Actions from '../constants/actionTypes';
import * as api from '../api/index.js';
import {defaultSize} from '../constants/pagination'

export const getFilms = (page, size, searchData = null) => async (dispatch) => {
  const pageIndex = !page || page === 0 ? 0 : page - 1;
  try {
    const { data } = await api.fetchFilms(pageIndex, (size = defaultSize), searchData);
    const payload = {
      films: data.films,
      count: data.totalPages,
      page: data.currentPage,
      size: defaultSize,
      totalFilms: data.totalFilms,
      totalFilteredFilms: data.totalFilteredFilms,
    };

    dispatch({ type: Actions.FETCH_ALL, payload });
  } catch (error) {
    console.log(error.message);
  }
};

export const getFilm = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchFilm(id);
    dispatch({ type: Actions.FETCH, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createFilm = (film) => async (dispatch) => {
  try {
    const { data } = await api.createFilm(film);
    dispatch({ type: Actions.CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFilm = (id, film) => async (dispatch) => {
  try {
    const { data } = await api.updateFilm(id, film);

    dispatch({ type: Actions.UPDATE, payload: { id, film: data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFilm = (id) => async (dispatch) => {
  try {
    await api.deleteFilm(id);
    dispatch({ type: Actions.DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
