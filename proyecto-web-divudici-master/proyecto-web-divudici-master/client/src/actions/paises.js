import * as api from  '../api';

//Action Creators = functions that return actions
export const getPaises = () => async (dispatch) => {
    
    try {
        const { data } = await api.fetchPaises(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_PAISES', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createPais = (pais) => async (dispatch) => {
    try {
        const { data } = await api.createPais(pais);
        dispatch({ type: 'CREATE_PAIS', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updatePais = (id, pais) => async(dispatch) => {
    try {
        const { data } = await api.updatePais(id, pais);
        dispatch({ type: 'UPDATE_PAIS', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePais = (id) => async (dispatch) => {
    try {
        await api.deletePais(id);
        dispatch({ type: 'DELETE_PAIS', payload: id});
    } catch (error) {
        console.log(error);
    }
}