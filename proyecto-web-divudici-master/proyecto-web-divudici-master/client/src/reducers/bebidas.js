//Recudcers are funcitions that accept a state (array of bebidas) and action.

const reducer = (bebidas = [], action) => {
    switch (action.type) {
        case 'DELETE_BEBIDA':
            return bebidas.filter((bebida) => bebida._id !== action.payload); //keep all the bebidas but the action.payload
        case 'UPDATE_BEBIDA':
            return bebidas.map((bebida) => bebida._id === action.payload.id ? action.payload : bebida);
        case 'FETCH_ALL_BEBIDAS':
            return action.payload;
        case 'CREATE_BEBIDA':
            return [...bebidas, action.payload];
        default:
            return bebidas;
    }
}

export default reducer; 