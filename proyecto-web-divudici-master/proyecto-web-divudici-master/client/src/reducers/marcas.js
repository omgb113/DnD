//Recudcers are funcitions that accept a state (array of marcas) and action.

const reducer = (marcas = [], action) => {
    switch (action.type) {
        case 'DELETE_MARCA':
            return marcas.filter((marca) => marca._id !== action.payload); //keep all the marcas but the action.payload
        case 'UPDATE_MARCA':
            return marcas.map((marca) => marca._id === action.payload.id ? action.payload : marca);
        case 'FETCH_ALL_MARCAS':
            return action.payload;
        case 'CREATE_MARCA':
            return [...marcas, action.payload];
        default:
            return marcas;
    }
}

export default reducer; 