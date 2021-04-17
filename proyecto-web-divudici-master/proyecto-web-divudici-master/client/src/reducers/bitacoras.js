//Recudcers are funcitions that accept a state (array of bitacoras) and action.

const reducer = (bitacoras = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_BITACORAS':
            return action.payload;
        case 'CREATE_BITACORA':
            return [...bitacoras, action.payload];
        default:
            return bitacoras;
    }
}

export default reducer; 