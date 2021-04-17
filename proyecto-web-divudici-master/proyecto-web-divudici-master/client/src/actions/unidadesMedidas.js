import * as api from  '../api';

//Action Creators = functions that return actions
export const getUnidadesMedidas = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUnidadesMedidas(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_UNIT_MEDIDAS', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createUnidadMedida = (unidadMedida) => async (dispatch) => {
    try {
        const { data } = await api.createUnidadMedida(unidadMedida);
        dispatch({ type: 'CREATE_UNIT_MEDIDA', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateUnidadMedida = (id, unidadMedida) => async(dispatch) => {
    try {
        const { data } = await api.updateUnidadMedida(id, unidadMedida);
        dispatch({ type: 'UPDATE_UNIT_MEDIDA', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteUnidadMedida = (id) => async (dispatch) => {
    try {
        await api.deleteUnidadMedida(id);
        dispatch({ type: 'DELETE_UNIT_MEDIDA', payload: id});
    } catch (error) {
        console.log(error);
    }
}