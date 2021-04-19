import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
} from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getFilms = () => async (dispatch) => {
  try {
    const { data } = await api.fetchFilms();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createFilm = (film) => async (dispatch) => {
  try {
    const { data } = await api.createFilm(film);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFilm = (id, film) => async (dispatch) => {
  try {
    const { data } = await api.updateFilm(id, film);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFilm = (id) => async (dispatch) => {
  try {
    await api.deleteFilm(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
