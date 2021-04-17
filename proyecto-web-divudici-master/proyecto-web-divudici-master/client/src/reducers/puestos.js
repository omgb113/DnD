//Recudcers are funcitions that accept a state (array of puestos) and action.

const reducer = (puestos = [], action) => {
    switch (action.type) {
        case 'DELETE_PUESTO':
            return puestos.filter((puesto) => puesto._id !== action.payload); //keep all the puestos but the action.payload
        case 'UPDATE_PUESTO':
            return puestos.map((puesto) => puesto._id === action.payload.id ? action.payload : puesto);
        case 'FETCH_ALL_PUESTOS':
            return action.payload;
        case 'CREATE_PUESTO':
            return [...puestos, action.payload];
        default:
            return puestos;
    }
}

export default reducer; 