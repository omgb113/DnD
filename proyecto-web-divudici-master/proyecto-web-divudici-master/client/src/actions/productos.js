import * as api from  '../api';

//Action Creators = functions that return actions
export const getProductos = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProductos(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_PRODUCTOS', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createProducto = (producto) => async (dispatch) => {
    try {
        const { data } = await api.createProducto(producto);
        dispatch({ type: 'CREATE_PRODUCTO', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateProducto = (id, producto) => async(dispatch) => {
    try {
        const { data } = await api.updateProducto(id, producto);
        dispatch({ type: 'UPDATE_PRODUCTO', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteProducto = (id) => async (dispatch) => {
    try {
        await api.deleteProducto(id);
        dispatch({ type: 'DELETE_PRODUCTO', payload: id});
    } catch (error) {
        console.log(error);
    }
}