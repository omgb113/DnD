//Recudcers are funcitions that accept a state (array of empleados) and action.

const reducer = (empleados = [], action) => {
    switch (action.type) {
        case 'DELETE_EMPLEADO':
            return empleados.filter((empleado) => empleado._id !== action.payload); //keep all the empleados but the action.payload
        case 'UPDATE_EMPLEADO':
            return empleados.map((empleado) => empleado._id === action.payload.id ? action.payload : empleado);
        case 'FETCH_ALL_EMPLEADOS':
            return action.payload;
        case 'CREATE_EMPLEADO':
            return [...empleados, action.payload];
        default:
            return empleados;
    }
}

export default reducer; 