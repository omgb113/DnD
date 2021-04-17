import * as api from  '../api';

//Action Creators = functions that return actions
export const getBuffets = () => async (dispatch) => {
    try {
        const { data } = await api.fetchBuffets(); //data comes from the response 
        dispatch({ type: 'FETCH_ALL_BUFFETS', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createBuffet = (buffet) => async (dispatch) => {
    try {
        const { data } = await api.createBuffet(buffet);
        dispatch({ type: 'CREATE_BUFFET', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateBuffet = (id, buffet) => async(dispatch) => {
    try {
        const { data } = await api.updateBuffet(id, buffet);
        dispatch({ type: 'UPDATE_BUFFET', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteBuffet = (id) => async (dispatch) => {
    try {
        await api.deleteBuffet(id);
        dispatch({ type: 'DELETE_BUFFET', payload: id});
    } catch (error) {
        console.log(error);
    }
}