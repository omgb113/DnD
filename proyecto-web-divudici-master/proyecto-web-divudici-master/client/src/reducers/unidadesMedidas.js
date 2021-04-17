//Recudcers are funcitions that accept a state (array of restaurantes) and action.

const reducer = (unidadMedidas = [], action) => {
    switch (action.type) {
        case 'DELETE_UNIT_MEDIDA':
            return unidadMedidas.filter((unidadMedida) => unidadMedida._id !== action.payload); //keep all the unidades de medidas but the action.payload
        case 'UPDATE_UNIT_MEDIDA':
            return unidadMedidas.map((unidadMedida) => unidadMedida._id === action.payload.id ? action.payload : unidadMedida);
        case 'FETCH_ALL_UNIT_MEDIDAS':
            return action.payload;
        case 'CREATE_UNIT_MEDIDA':
            return [...unidadMedidas, action.payload];
    
        default:
            return unidadMedidas;
    }
}

export default reducer; 