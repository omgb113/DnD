//Recudcers are funcitions that accept a state (array of paiss) and action.

const reducer = (paises = [], action) => {
    switch (action.type) {
        case 'DELETE_PAIS':
            return paises.filter((pais) => pais._id !== action.payload); //keep all the paiss but the action.payload
        case 'UPDATE_PAIS':
            return paises.map((pais) => pais._id === action.payload.id ? action.payload : pais);
        case 'FETCH_ALL_PAISES':
            return action.payload;
        case 'CREATE_PAIS':
            return [...paises, action.payload];
    
        default:
            return paises;
    }
}

export default reducer; 