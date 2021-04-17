//Recudcers are funcitions that accept a state (array of productos) and action.

const reducer = (productos = [], action) => {
    switch (action.type) {
        case 'DELETE_PRODUCTO':
            return productos.filter((producto) => producto._id !== action.payload); //keep all the productos but the action.payload
        case 'UPDATE_PRODUCTO':
            return productos.map((producto) => producto._id === action.payload.id ? action.payload : producto);
        case 'FETCH_ALL_PRODUCTOS':
            return action.payload;
        case 'CREATE_PRODUCTO':
            return [...productos, action.payload];
        default:
            return productos;
    }
}

export default reducer; 