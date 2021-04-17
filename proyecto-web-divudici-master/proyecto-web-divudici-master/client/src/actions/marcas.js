import * as api from  '../api';

//Action Creators = functions that return actions
export const getMarcas = () => async (dispatch) => {
    try {
        const { data } = await api.fetchMarcas(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_MARCAS', payload: data});
    } catch (error) {  
        console.log(error);
    }
}

export const createMarca = (marca) => async (dispatch) => {
    try {
        const { data } = await api.createMarca(marca);
        dispatch({ type: 'CREATE_MARCA', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateMarca = (id, marca) => async(dispatch) => {
    try {
        const { data } = await api.updateMarca(id, marca);
        dispatch({ type: 'UPDATE_MARCA', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteMarca = (id) => async (dispatch) => {
    try {
        await api.deleteMarca(id);
        dispatch({ type: 'DELETE_MARCA', payload: id});
    } catch (error) {
        console.log(error);
    }
}