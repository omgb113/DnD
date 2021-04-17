import * as api from  '../api';

//Action Creators = functions that return actions
export const getUsuarios = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsuarios(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_USUARIOS', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createUsuario = (usuario) => async (dispatch) => {
    try {
        const { data } = await api.createUsuario(usuario);
        dispatch({ type: 'CREATE_USUARIO', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateUsuario = (id, usuario) => async(dispatch) => {
    try {
        const { data } = await api.updateUsuario(id, usuario);
        dispatch({ type: 'UPDATE_USUARIO', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteUsuario = (id) => async (dispatch) => {
    try {
        await api.deleteUsuario(id);
        dispatch({ type: 'DELETE_USUARIO', payload: id});
    } catch (error) {
        console.log(error);
    }
}