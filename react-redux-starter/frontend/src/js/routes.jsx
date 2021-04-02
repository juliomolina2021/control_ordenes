import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import DemoContainer from './common/components/Demo/DemoContainer';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

import ProductoListContainer from './common/components/Producto/ProductoListContainer';
import ProductoCrearContainer from './common/components/Producto/ProductoCrearContainer';

import ExplorarProductosListContainer from './common/components/ExplorarProductos/ExplorarProductosListContainer';

import DetalleProductoContainer from './common/components/ExplorarProductos/DetalleProductoContainer';

import ProductoCompraContainer from './common/components/ExplorarProductos/ProductoCompraContainer';

import ComprasListContainer from './common/components/Transacciones/ComprasListContainer';
import VentasListContainer from './common/components/Transacciones/VentasListContainer';

import ProductoIndexListContainer from './common/components/Index/ProductoIndexListContainer';

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/index" component={ProductoIndexListContainer} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={DemoContainer} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />

                <ProtectedRoute exact path="/productos/crear" component={ProductoCrearContainer}/>
                <ProtectedRoute exact path="/productos/:id" component={ProductoCrearContainer} />
                <ProtectedRoute exact path="/productos/:id/editar" component={ProductoCrearContainer} />
                <ProtectedRoute exact path="/productos" component={ProductoListContainer}/>

                <ProtectedRoute exact path="/explorar" component={ExplorarProductosListContainer}/>

                <ProtectedRoute exact path="/detalle/:id" component={DetalleProductoContainer}/>

                <ProtectedRoute exact path="/compra/:id" component={ProductoCompraContainer}/>

                <ProtectedRoute exact path="/miscompras" component={ComprasListContainer}/>
                <ProtectedRoute exact path="/misventas" component={VentasListContainer}/>

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
