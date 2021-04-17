import { combineReducers } from 'redux';
import consecutivos from './consecutivos';
import restaurantes from './restaurantes';
import unidadesMedidas from './unidadesMedidas';
import paises from './paises';
import marcas from './marcas';
import buffets from './buffets';
import eventos from './eventos';
import bebidas from './bebidas';
import especialidades from './especialidades';
import mesas from './mesas';
import puestos from './puestos';
import empleados from './empleados';
import usuarios from './usuarios';
import productos from './productos';
import proveedores from './proveedores';
import bitacoras from './bitacoras';
import auth from './auth';


export default combineReducers({ 
    consecutivos, 
    restaurantes, 
    unidadesMedidas,
    paises,
    marcas,
    buffets,
    eventos,
    bebidas,
    especialidades,
    mesas,
    puestos,
    empleados,
    usuarios,
    productos,
    proveedores,
    bitacoras,
    auth
});
