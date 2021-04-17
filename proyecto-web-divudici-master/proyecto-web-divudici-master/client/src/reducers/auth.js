//Recudcers are funcitions that accept a state (array of bebidas) and action.

const reducer = (state = { authData: null } , action ) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify( { ...action?.data }));
            return { ...state, authData: action};
        case 'LOGOUT':
            localStorage.clear();

            return { ...state, authData: null}
        default:
            return state;
    }
}

export default reducer; 