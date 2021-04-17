//Recudcers are funcitions that accept a state (array of mesas) and action.

const reducer = (mesas = [], action) => {
    switch (action.type) {
        case 'DELETE_MESA':
            return mesas.filter((mesa) => mesa._id !== action.payload); //keep all the mesas but the action.payload
        case 'UPDATE_MESA':
            return mesas.map((mesa) => mesa._id === action.payload.id ? action.payload : mesa);
        case 'FETCH_ALL_MESAS':
            return action.payload;
        case 'CREATE_MESA':
            return [...mesas, action.payload];
        default:
            return mesas;
    }
}

export default reducer; 