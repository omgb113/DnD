//Recudcers are funcitions that accept a state (array of usuarios) and action.

const reducer = (usuarios = [], action) => {
    switch (action.type) {
        case 'DELETE_USUARIO':
            return usuarios.filter((usuario) => usuario._id !== action.payload); //keep all the usuarios but the action.payload
        case 'UPDATE_USUARIO':
            return usuarios.map((usuario) => usuario._id === action.payload.id ? action.payload : usuario);
        case 'FETCH_ALL_USUARIOS':
            return action.payload;
        case 'CREATE_USUARIO':
            return [...usuarios, action.payload];
        default:
            return usuarios;
    }
}

export default reducer; 