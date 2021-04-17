import * as api from  '../api';

//Action Creators = functions that return actions
export const getPuestos = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPuestos(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_PUESTOS', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createPuesto = (puesto) => async (dispatch) => {
    try {
        const { data } = await api.createPuesto(puesto);
        dispatch({ type: 'CREATE_PUESTO', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updatePuesto = (id, puesto) => async(dispatch) => {
    try {
        const { data } = await api.updatePuesto(id, puesto);
        dispatch({ type: 'UPDATE_PUESTO', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePuesto = (id) => async (dispatch) => {
    try {
        await api.deletePuesto(id);
        dispatch({ type: 'DELETE_PUESTO', payload: id});
    } catch (error) {
        console.log(error);
    }
}