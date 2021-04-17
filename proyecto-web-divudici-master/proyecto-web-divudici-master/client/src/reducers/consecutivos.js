//Recudcers are funcitions that accept a state (array of consevutivos) and action.

const reducer = (consecutivos = [], action) => {
    switch (action.type) {
        case 'DELETE_CONSECUTIVO':
            return consecutivos.filter((consecutivo) => consecutivo._id !== action.payload); //keep all the consecutivos but the action.payload
        case 'UPDATE_CONSECUTIVO':
            return consecutivos.map((consecutivo) => consecutivo._id === action.payload.id ? action.payload : consecutivo);
        case 'FETCH_ALL_CONSECUTIVO':
            return action.payload;
        case 'CREATE_CONSECUTIVO':
            return [...consecutivos, action.payload];
    
        default:
            return consecutivos;
    }
}

export default reducer; 