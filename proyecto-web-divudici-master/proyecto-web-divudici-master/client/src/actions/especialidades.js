import * as api from  '../api';

//Action Creators = functions that return actions
export const getEspecialidades = () => async (dispatch) => {
    try {
        const { data } = await api.fetchEspecialidades(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_ESPECIALIDADES', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createEspecialidad = (especialidad) => async (dispatch) => {
    try {
        const { data } = await api.createEspecialidad(especialidad);
        dispatch({ type: 'CREATE_ESPECIALIDAD', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateEspecialidad = (id, especialidad) => async(dispatch) => {
    try {
        const { data } = await api.updateEspecialidad(id, especialidad);
        dispatch({ type: 'UPDATE_ESPECIALIDAD', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteEspecialidad = (id) => async (dispatch) => {
    try {
        await api.deleteEspecialidad(id);
        dispatch({ type: 'DELETE_ESPECIALDIAD', payload: id});
    } catch (error) {
        console.log(error);
    }
}