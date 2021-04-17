import axios from 'axios';

const urlConsecutvios = 'http://localhost:5000/consecutivos';
const urlRestaurantes = 'http://localhost:5000/restaurantes';
const urlUnidadesMedidas = 'http://localhost:5000/unidadesMedida';
const urlPaises = 'http://localhost:5000/paises';
const urlMarcas = 'http://localhost:5000/marcas';
const urlBuffets = 'http://localhost:5000/buffets';
const urlEventos = 'http://localhost:5000/eventos';
const urlBebidas = 'http://localhost:5000/bebidas';
const urlEspecialidades = 'http://localhost:5000/especialidades';
const urlMesas = 'http://localhost:5000/mesas';
const urlPuestos = 'http://localhost:5000/puestos';
const urlEmpleados = 'http://localhost:5000/empleados';
const urlUsuarios = 'http://localhost:5000/usuarios';
const urlUsuariosLogin = 'http://localhost:5000/usuarios/login';
const urlProductos = 'http://localhost:5000/productos';
const urlProveedores = 'http://localhost:5000/proveedores';
const urlBitacoras = 'http://localhost:5000/bitacoras';
const urlClientes = 'http://localhost:5000/clientes';

export const fetchConsecutivos = () => axios.get(urlConsecutvios);
export const createConsecutivo = (newConsecutivo) => axios.post(urlConsecutvios, newConsecutivo);
export const updateConsecutivo = (id, updatedConsecutivo) => axios.patch(`${urlConsecutvios}/${id}`, updatedConsecutivo);
export const deleteConsecutivo = (id) => axios.delete(`${urlConsecutvios}/${id}`);

export const fetchRestaurantes = () => axios.get(urlRestaurantes);
export const createRestaurante = (newRestaurante) => axios.post(urlRestaurantes, newRestaurante);
export const updateRestaurante = (id, updatedRestaurante) => axios.patch(`${urlRestaurantes}/${id}`, updatedRestaurante);
export const deleteRestaurante = (id) => axios.delete(`${urlRestaurantes}/${id}`);

export const fetchUnidadesMedidas = () => axios.get(urlUnidadesMedidas);
export const createUnidadMedida = (newUnidadMedida) => axios.post(urlUnidadesMedidas, newUnidadMedida);
export const updateUnidadMedida = (id, updatedUnidadMedida) => axios.patch(`${urlUnidadesMedidas}/${id}`, updatedUnidadMedida);
export const deleteUnidadMedida = (id) => axios.delete(`${urlUnidadesMedidas}/${id}`);

export const fetchPaises = () => axios.get(urlPaises);
export const createPais = (newPais) => axios.post(urlPaises, newPais);
export const updatePais = (id, updatedPais) => axios.patch(`${urlPaises}/${id}`, updatedPais);
export const deletePais = (id) => axios.delete(`${urlPaises}/${id}`);

export const fetchMarcas = () => axios.get(urlMarcas);
export const createMarca = (newMarca) => axios.post(urlMarcas, newMarca);
export const updateMarca= (id, updatedMarca) => axios.patch(`${urlMarcas}/${id}`, updatedMarca);
export const deleteMarca = (id) => axios.delete(`${urlMarcas}/${id}`);

export const fetchBuffets = () => axios.get(urlBuffets);
export const createBuffet = (newBuffet) => axios.post(urlBuffets, newBuffet);
export const updateBuffet = (id, updatedBuffet) => axios.patch(`${urlBuffets}/${id}`, updatedBuffet);
export const deleteBuffet = (id) => axios.delete(`${urlBuffets}/${id}`);

export const fetchEventos = () => axios.get(urlEventos);
export const createEvento = (newEvento) => axios.post(urlEventos, newEvento);
export const updateEvento = (id, updatedEvento) => axios.patch(`${urlEventos}/${id}`, updatedEvento);
export const deleteEvento = (id) => axios.delete(`${urlEventos}/${id}`);

export const fetchBebidas = () => axios.get(urlBebidas);
export const createBebida = (newBebida) => axios.post(urlBebidas, newBebida);
export const updateBebida = (id, updatedBebida) => axios.patch(`${urlBebidas}/${id}`, updatedBebida);
export const deleteBebida = (id) => axios.delete(`${urlBebidas}/${id}`);

export const fetchEspecialidades = () => axios.get(urlEspecialidades);
export const createEspecialidad = (newEspecialidad) => axios.post(urlEspecialidades, newEspecialidad);
export const updateEspecialidad = (id, updatedEspecialidad) => axios.patch(`${urlEspecialidades}/${id}`, updatedEspecialidad);
export const deleteEspecialidad = (id) => axios.delete(`${urlEspecialidades}/${id}`);

export const fetchMesas = () => axios.get(urlMesas);
export const createMesa = (newMesa) => axios.post(urlMesas, newMesa);
export const updateMesa = (id, updatedMesa) => axios.patch(`${urlMesas}/${id}`, updatedMesa);
export const deleteMesa = (id) => axios.delete(`${urlMesas}/${id}`);

export const fetchPuestos = () => axios.get(urlPuestos);
export const createPuesto = (newPuesto) => axios.post(urlPuestos, newPuesto);
export const updatePuesto = (id, updatedPuesto) => axios.patch(`${urlPuestos}/${id}`, updatedPuesto);
export const deletePuesto = (id) => axios.delete(`${urlPuestos}/${id}`);

export const fetchEmpleados = () => axios.get(urlEmpleados);
export const createEmpleado = (newEmpleado) => axios.post(urlEmpleados, newEmpleado);
export const updateEmpleado = (id, updatedEmpleado) => axios.patch(`${urlEmpleados}/${id}`, updatedEmpleado);
export const deleteEmpleado = (id) => axios.delete(`${urlEmpleados}/${id}`);

export const fetchUsuarios = () => axios.get(urlUsuarios);
export const createUsuario = (newUsuario) => axios.post(urlUsuarios, newUsuario);
export const updateUsuario = (id, updatedUsuario) => axios.patch(`${urlUsuarios}/${id}`, updatedUsuario);
export const deleteUsuario = (id) => axios.delete(`${urlUsuarios}/${id}`);
export const login  = (usuarioData) => axios.post(urlUsuariosLogin, usuarioData);

export const fetchProductos = () => axios.get(urlProductos);
export const createProducto = (newProducto) => axios.post(urlProductos, newProducto);
export const updateProducto = (id, updatedProducto) => axios.patch(`${urlProductos}/${id}`, updatedProducto);
export const deleteProducto = (id) => axios.delete(`${urlProductos}/${id}`);

export const fetchProveedores = () => axios.get(urlProveedores);
export const createProveedor = (newProducto) => axios.post(urlProveedores, newProducto);
export const updateProveedor = (id, updatedProducto) => axios.patch(`${urlProveedores}/${id}`, updatedProducto);
export const deleteProveedor = (id) => axios.delete(`${urlProveedores}/${id}`);

export const fetchBitacoras = () => axios.get(urlBitacoras);
export const createBitacora = (newBitacora) => axios.post(urlBitacoras, newBitacora);

export const fetchClientes = () => axios.get(urlClientes);
export const createCliente = (newCliente) => axios.post(urlClientes, newCliente);
export const updateCliente = (id, updatedCliente) => axios.patch(`${urlClientes}/${id}`, updatedCliente);
export const deleteCliente = (id) => axios.delete(`${urlClientes}/${id}`);