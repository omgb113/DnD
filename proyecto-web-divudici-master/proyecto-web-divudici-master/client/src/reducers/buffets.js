//Recudcers are funcitions that accept a state (array of buffets) and action.

const reducer = (buffets = [], action) => {
    switch (action.type) {
        case 'DELETE_BUFFET':
            return buffets.filter((buffet) => buffet._id !== action.payload); //keep all the buffets but the action.payload
        case 'UPDATE_BUFFET':
            return buffets.map((buffet) => buffet._id === action.payload.id ? action.payload : buffet);
        case 'FETCH_ALL_BUFFETS':
            return action.payload;
        case 'CREATE_BUFFET':
            return [...buffets, action.payload];
        default:
            return buffets;
    }
}

export default reducer; 