//Recudcers are funcitions that accept a state (array of eventos) and action.

const reducer = (eventos = [], action) => {
    switch (action.type) {
        case 'DELETE_EVENTO':
            return eventos.filter((evento) => evento._id !== action.payload); //keep all the eventos but the action.payload
        case 'UPDATE_EVENTO':
            return eventos.map((evento) => evento._id === action.payload.id ? action.payload : evento);
        case 'FETCH_ALL_EVENTOS':
            return action.payload;
        case 'CREATE_EVENTO':
            return [...eventos, action.payload];
        default:
            return eventos;
    }
}

export default reducer; 