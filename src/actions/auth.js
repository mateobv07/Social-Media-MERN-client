import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

//Action creators using redux thunk
export const signIn = (formData, history) => async (dispatch) => {
    try {
        /* const { data } = await api.signIn();

        dispatch({type: AUTH, payload: data}); */

        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData, history) => async (dispatch) => {
    try {
        /* const { data } = await api.signIn();

        dispatch({type: AUTH, payload: data}); */
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}