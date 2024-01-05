import { options } from "../../constant";
import axios from "axios";
import { ActionTypes } from "../actionTypes";



axios.defaults.baseURL = 'https://api.themoviedb.org/3'

export const getPopular = () => (dispatch) => {

  dispatch({
    type: ActionTypes.SET_MOVIES_LOADING,
  })

  axios.get('/movie/popular', options)

    //notify reducer
    .then((res) =>
      dispatch({
        type: ActionTypes.SET_MOVIES,
        payload: res.data.results
      })
    )
    .catch((err) => {
      dispatch({
        type: ActionTypes.SET_MOVIES_ERROR,
        payload: err.message,
      })
    })
}

export const getGenres = () => (dispatch) => {
  dispatch({ type: ActionTypes.SET_GENRES_LOADING })
  axios.get('/genre/movie/list', options)
    .then(
      (res) => {
        dispatch({
          payload: res.data.genres,
          type: ActionTypes.SET_GENRES,
        })
      })
    .catch(
      (err) => dispatch({
        type: ActionTypes.SET_GENRES_ERROR,
        payload: err.message,
      })
    )
}