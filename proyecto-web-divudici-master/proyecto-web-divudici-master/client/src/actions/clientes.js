import * as api from  '../api';

//Action Creators = functions that return actions


export const getClientes = () => async (dispatch) => {
    try {
        const { data } = await api.fetchClientes(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_CLIENTES', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createCliente = (cliente) => async (dispatch) => {
    try {
        const { data } = await api.createCliente(cliente);
        dispatch({ type: 'CREATE_CLIENTE', payload: data});
    } catch (error) {
        console.log(error);
    }
}



export const updateCliente = (id, cliente) => async(dispatch) => {
    try {
        const { data } = await api.updateCliente(id, cliente);
        dispatch({ type: 'UPDATE_CLIENTE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteCliente= (id) => async (dispatch) => {
    try {
        await api.deleteCliente(id);
        dispatch({ type: 'DELETE_CLIENTE', payload: id});
    } catch (error) {
        console.log(error);
    }



}