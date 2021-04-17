import * as api from  '../api';

//Action Creators = functions that return actions
export const getBitacoras = () => async (dispatch) => {
    try {
        const { data } = await api.fetchBitacoras(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_BITACORAS', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createBitacora = (bitacora) => async (dispatch) => {
    try {
        const { data } = await api.createBitacora(bitacora);
        dispatch({ type: 'CREATE_BITACORA', payload: data});
    } catch (error) {
        console.log(error);
    }
}