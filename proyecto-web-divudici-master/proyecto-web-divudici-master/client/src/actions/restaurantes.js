import * as api from  '../api';

//Action Creators = functions that return actions
export const getRestaurantes = () => async (dispatch) => {
    try {
        const { data } = await api.fetchRestaurantes(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_RESTAURANT', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createRestaurante = (restaurante) => async (dispatch) => {
    try {
        const { data } = await api.createRestaurante(restaurante);
        dispatch({ type: 'CREATE_RESTAURANT', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateRestaurante = (id, restaurante) => async(dispatch) => {
    try {
        const { data } = await api.updateRestaurante(id, restaurante);
        dispatch({ type: 'UPDATE_RESTAURANT', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteRestaurante = (id) => async (dispatch) => {
    try {
        await api.deleteRestaurante(id);
        dispatch({ type: 'DELETE_RESTAURANT', payload: id});
    } catch (error) {
        console.log(error);
    }
}