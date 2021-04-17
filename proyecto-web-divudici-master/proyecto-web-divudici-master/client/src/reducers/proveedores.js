//Recudcers are funcitions that accept a state (array of proveedores) and action.

const reducer = (proveedores = [], action) => {
    switch (action.type) {
        case 'DELETE_PROVEEDOR':
            return proveedores.filter((proveedor) => proveedor._id !== action.payload); //keep all the proveedores but the action.payload
        case 'UPDATE_PROVEEDOR':
            return proveedores.map((proveedor) => proveedor._id === action.payload.id ? action.payload : proveedor);
        case 'FETCH_ALL_PROVEEDORES':
            return action.payload;
        case 'CREATE_PROVEEDOR':
            return [...proveedores, action.payload];
        default:
            return proveedores;
    }
}

export default reducer; 