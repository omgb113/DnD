import * as api from  '../api';

//Action Creators = functions that return actions
export const getBebidas = () => async (dispatch) => {
    try {
        const { data } = await api.fetchBebidas(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_BEBIDAS', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createBebida = (bebida) => async (dispatch) => {
    try {
        const { data } = await api.createBebida(bebida);
        dispatch({ type: 'CREATE_BEBIDA', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateBebida = (id, bebida) => async(dispatch) => {
    try {
        const { data } = await api.updateBebida(id, bebida);
        dispatch({ type: 'UPDATE_BEBIDA', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteBebida= (id) => async (dispatch) => {
    try {
        await api.deleteBebida(id);
        dispatch({ type: 'DELETE_BEBIDA', payload: id});
    } catch (error) {
        console.log(error);
    }
}