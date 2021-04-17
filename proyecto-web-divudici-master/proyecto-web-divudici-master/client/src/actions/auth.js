import * as api from  '../api';

export const login = (usuarioData, history) => async (dispatch) => {

    try {
        const { data } = await api.login(usuarioData);
        console.log(data);
        dispatch({ type: 'AUTH', data });
        history.push('/home');

    } catch (error) {
        return error.response.data.message;
    }
}
