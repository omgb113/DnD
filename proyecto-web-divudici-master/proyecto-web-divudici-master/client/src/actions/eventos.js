import * as api from  '../api';

//Action Creators = functions that return actions
export const getEventos = () => async (dispatch) => {
    try {
        const { data } = await api.fetchEventos(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_EVENTOS', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createEvento = (evento) => async (dispatch) => {
    try {
        const { data } = await api.createEvento(evento);
        dispatch({ type: 'CREATE_EVENTO', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateEvento = (id, evento) => async(dispatch) => {
    try {
        const { data } = await api.updateEvento(id, evento);
        dispatch({ type: 'UPDATE_EVENTO', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteEvento = (id) => async (dispatch) => {
    try {
        await api.deleteEvento(id);
        dispatch({ type: 'DELETE_EVENTO', payload: id});
    } catch (error) {
        console.log(error);
    }
}