import * as api from  '../api';

//Action Creators = functions that return actions
export const getEmpleados = () => async (dispatch) => {
    try {
        const { data } = await api.fetchEmpleados(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_EMPLEADOS', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createEmpleado = (empleado) => async (dispatch) => {
    try {
        const { data } = await api.createEmpleado(empleado);
        dispatch({ type: 'CREATE_EMPLEADO', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateEmpleado = (id, empleado) => async(dispatch) => {
    try {
        const { data } = await api.updateEmpleado(id, empleado);
        dispatch({ type: 'UPDATE_EMPLEADO', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteEmpleado = (id) => async (dispatch) => {
    try {
        await api.deleteEmpleado(id);
        dispatch({ type: 'DELETE_EMPLEADO', payload: id});
    } catch (error) {
        console.log(error);
    }
}