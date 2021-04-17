import * as api from  '../api';

//Action Creators = functions that return actions
export const getMesas = () => async (dispatch) => {
    try {
        const { data } = await api.fetchMesas(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_MESAS', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createMesa= (mesa) => async (dispatch) => {
    try {
        const { data } = await api.createMesa(mesa);
        dispatch({ type: 'CREATE_MESA', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateMesa = (id, mesa) => async(dispatch) => {
    try {
        const { data } = await api.updateMesa(id, mesa);
        dispatch({ type: 'UPDATE_MESA', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteMesa = (id) => async (dispatch) => {
    try {
        await api.deleteMesa(id);
        dispatch({ type: 'DELETE_MESA', payload: id});
    } catch (error) {
        console.log(error);
    }
}