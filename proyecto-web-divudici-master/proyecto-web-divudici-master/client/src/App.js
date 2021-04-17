import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import Consecutivo from './components/Consecutivo/Consecutivo';
import Restaurante from './components/Restaurante/Restaurante';
import UnidadMedida from './components/UnidadMedida/UnidadMedida';
import Pais from './components/Pais/Pais';
import Marca from './components/Marca/Marca';
import Buffet from './components/Buffet/Buffet';
import Evento from './components/Evento/Evento';
import BebidaCaliente from './components/BebidaCaliente/BebidaCaliente';
import BebidaHelada from './components/BebidaHelada/BebidaHelada';
import BebidaGaseosa from './components/BebidaGaseosa/BebidaGaseosa';
import BebidaLicor from './components/BebidaLicor/BebidaLicor';
import BebidaVino from './components/BebidaVino/BebidaVino';
import Especialidad from './components/Especialidad/Especialidad';
import Mesa from './components/Mesa/Mesa';
import Puesto from './components/Puesto/Puesto';
import Empleado from './components/Empleado/Empleado';
import Usuario from './components/Usuario/Usuario';
import ProductoComestible from './components/ProductoComestible/ProductoComestible';
import ProductoDesechable from './components/ProductoDesechable/ProductoDesechable';
import ProductoLimpieza from './components/ProductoLimpieza/ProductoLimpieza';
import ProductoTecnologia from './components/ProductoTecnologia/ProductoTecnologia';
import ProductoUtencilio from './components/ProductoUtencilio/ProductoUtencilio';
import Proveedor from './components/Proveedor/Proveedor';
import Auth from './components/Auth/Auth';
import UpperNav from './components/UpperNav/UpperNav';
import Home from './components/Home/Home';
import Seguridad from './components/Seguridad/Seguridad';
import ProveedorHome from './components/ProveedorHome/ProveedorHome';
import ProductosHome from './components/ProductosHome/ProductosHome';
import Administracion from './components/Administracion/Administracion';
import EspecialHome from './components/EspecialHome/EspecialHome';
import BebidaHome from './components/BebidaHome/BebidaHome';
import RestauranteHome from './components/RestauranteHome/RestauranteHome';
import Bitacora from './components/Bitacora/Bitacora';
import Canvas from './components/Canvas/Canvas';
import Clientes from './components/Cliente/Cliente';


const App = () => {
    

    return (
        <BrowserRouter>
            <UpperNav/>
            <Container>

                <Switch>
                    <Route path="/" exact component={Auth} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/consecutivos" exact component={Consecutivo} />
                    <Route path="/restaurantes" exact component={Restaurante} />
                    <Route path="/unidades" exact component={UnidadMedida} />
                    <Route path="/paises" exact component={Pais} />
                    <Route path="/marcas" exact component={Marca} />
                    <Route path="/buffets" exact component={Buffet} />
                    <Route path="/eventos" exact component={Evento} />
                    <Route path="/calientes" exact component={BebidaCaliente} />
                    <Route path="/heladas" exact component={BebidaHelada} />
                    <Route path="/gaseosas" exact component={BebidaGaseosa} />
                    <Route path="/licores" exact component={BebidaLicor} />
                    <Route path="/vinos" exact component={BebidaVino} />
                    <Route path="/especialidades" exact component={Especialidad} />
                    <Route path="/mesas" exact component={Mesa} />
                    <Route path="/puestos" exact component={Puesto} />
                    <Route path="/empleados" exact component={Empleado} />
                    <Route path="/usuarios" exact component={Usuario} />
                    <Route path="/comestibles" exact component={ProductoComestible} />
                    <Route path="/desechables" exact component={ProductoDesechable} />
                    <Route path="/limpieza" exact component={ProductoLimpieza} />
                    <Route path="/tecnologia" exact component={ProductoTecnologia} />
                    <Route path="/utencilios" exact component={ProductoUtencilio} />
                    <Route path="/proveedor" exact component={Proveedor} />
                    <Route path="/seguridad" exact component={Seguridad} />
                    <Route path="/proveedores" exact component={ProveedorHome} />
                    <Route path="/productos" exact component={ProductosHome} />
                    <Route path="/administracion" exact component={Administracion} />
                    <Route path="/especiales" exact component={EspecialHome} />
                    <Route path="/bebidas" exact component={BebidaHome} />
                    <Route path="/restauranteHome" exact component={RestauranteHome} />
                    <Route path="/bitacoras" exact component={Bitacora} />
                    <Route path="/canvas" exact component={Canvas} />
                    <Route path="/clientes" exact component={Clientes} />
                </Switch>
            
                {/* <Consecutivo/>
                <Restaurante/>
                <UnidadMedida />
                <Pais />
                <Marca />
                <Buffet />
                <Evento />
                <BebidaCaliente />
                <BebidaHelada/>
                <BebidaGaseosa/>
                <BebidaLicor/>
                <BebidaVino/>
                <Especialidad/>
                <Mesa/>
                <Puesto/>
                <Empleado/>
                <Usuario/>
                <ProductoComestible/>
                <ProductoDesechable/>
                <ProductoLimpieza/>
                <ProductoTecnologia/>
                <ProductoUtencilio/>
                <Proveedor/> */}

        
            </Container>

        </BrowserRouter>
    )
}

export default App;