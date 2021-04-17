//Recudcers are funcitions that accept a state (array of especialidades) and action.

const reducer = (especialidades = [], action) => {
    switch (action.type) {
        case 'DELETE_ESPECIALDIAD':
            return especialidades.filter((especialidad) => especialidad._id !== action.payload); //keep all the especialidades but the action.payload
        case 'UPDATE_ESPECIALIDAD':
            return especialidades.map((especialidad) => especialidad._id === action.payload.id ? action.payload : especialidad);
        case 'FETCH_ALL_ESPECIALIDADES':
            return action.payload;
        case 'CREATE_ESPECIALIDAD':
            return [...especialidades, action.payload];
        default:
            return especialidades;
    }
}

export default reducer; 