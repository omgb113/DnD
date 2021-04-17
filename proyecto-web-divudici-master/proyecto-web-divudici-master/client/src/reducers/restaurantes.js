//Recudcers are funcitions that accept a state (array of restaurantes) and action.

const reducer = (restaurantes = [], action) => {
    switch (action.type) {
        case 'DELETE_RESTAURANT':
            return restaurantes.filter((restaurante) => restaurante._id !== action.payload); //keep all the restaurantes but the action.payload
        case 'UPDATE_RESTAURANT':
            return restaurantes.map((restaurante) => restaurante._id === action.payload.id ? action.payload : restaurante);
        case 'FETCH_ALL_RESTAURANT':
            return action.payload;
        case 'CREATE_RESTAURANT':
            return [...restaurantes, action.payload];
    
        default:
            return restaurantes;
    }
}

export default reducer; 