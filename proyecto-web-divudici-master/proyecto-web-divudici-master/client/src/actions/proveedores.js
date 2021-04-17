import * as api from  '../api';

//Action Creators = functions that return actions
export const getProveedores = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProveedores(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_PROVEEDORES', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createProveedor = (proveedor) => async (dispatch) => {
    try {
        const { data } = await api.createProveedor(proveedor);
        dispatch({ type: 'CREATE_PROVEEDOR', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateProveedor = (id, proveedor) => async(dispatch) => {
    try {
        const { data } = await api.updateProveedor(id, proveedor);
        dispatch({ type: 'UPDATE_PROVEEDOR', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteProveedor = (id) => async (dispatch) => {
    try {
        await api.deleteProveedor(id);
        dispatch({ type: 'DELETE_PROVEEDOR', payload: id});
    } catch (error) {
        console.log(error);
    }
}