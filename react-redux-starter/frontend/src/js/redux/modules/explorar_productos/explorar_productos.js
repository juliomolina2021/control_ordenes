import Swal from 'sweetalert2';
import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_PRODUCTOS = 'GUARDAR_LISTADO_PRODUCTOS';
const GUARDAR_LISTADO_VENTAS = 'GUARDAR_LISTADO_VENTAS';
const GUARDAR_LISTADO_COMPRAS = 'GUARDAR_LISTADO_COMPRAS';
const GUARDAR_LISTADO_TOTAL_VENTAS_PRODUCTO = 'GUARDAR_LISTADO_TOTAL_VENTAS_PRODUCTO';
const GUARDAR_REGISTRO_PRODUCTO = 'GUARDAR_REGISTRO_PRODUCTO';
const GUARDAR_REGISTRO_PROMEDIO = 'GUARDAR_REGISTRO_PROMEDIO';

export const listarProductos = () => (dispatch) => {
    api.get('/producto/explorar_productos').then((response) => {
        dispatch({type:GUARDAR_LISTADO_PRODUCTOS, data:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los productos',
            'ERROR',
            0
        );
    });
}

export const leerProducto = (id) => (dispatch) => {
    api.get(`/producto/${id}`).then((response)=>{
        dispatch({type: GUARDAR_REGISTRO_PRODUCTO, registro:response});
        dispatch(initializeForm('producto', response))
        dispatch(initializeForm('producto_compra', response))
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const registroCompra = (data) => (dispatch) => {
    let cantidad= parseFloat(data.cantidad);
    let total= cantidad * data.precio;
    const formData={
        direccion_envio: data.direccion_envio,
        cantidad: cantidad,
        total: total,
        producto: data.nombre,
        id_producto: data.id
    }
    if(data.stock < cantidad || data.stock == 0){
        Swal.fire({
            type: 'error',
            title: 'Uupssss',
            text: `Ha ocurrido un error! La cantidad que pides es mayor a la existencia`,
            footer: '',
        });
    }else{
        Swal.fire({
            title: 'Detalle compra',
            text: `Cantidad escogida ${cantidad}, El total a pagar es: Q.${total}!`,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Entendido, Comprar!',
        }).then((result) => {
            if (result.value) {

                api.post('/venta', formData)
                .then(()=>{
                    Swal.fire('Exito!', 'Se ha relizado tu compra.', 'success');

                    dispatch(push('/explorar'))
                }).catch((error)=>{
                    console.log("Error: ", error);
                    Swal.fire({
                        type: 'error',
                        title: 'Uupssss',
                        text: 'Ha ocurrido un error!',
                    });
                })
            }
        });
    }
}
export const listarVentas= () => (dispatch) => {
    api.get('/venta/mis_ventas').then((response) => {
        dispatch({type:GUARDAR_LISTADO_VENTAS, ventas:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar las ventas',
            'ERROR',
            0
        );
    });
}

export const listarCompras= () => (dispatch) => {
    api.get('/venta/mis_compras').then((response) => {
        dispatch({type:GUARDAR_LISTADO_COMPRAS, compras:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar las compras',
            'ERROR',
            0
        );
    });
}

export const totalVentasProducto= () => (dispatch) => {
    api.get('/venta/totales_ventas').then((response) => {
        console.log("Response total ventas producto", response)
        dispatch({type:GUARDAR_LISTADO_TOTAL_VENTAS_PRODUCTO, totales_venta_prod:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los totales',
            'ERROR',
            0
        );
    });
}
export const promedioPrecioProducto= () => (dispatch) => {
    api.get('/venta/promedio_precios').then((response) => {
        console.log("Response promedio", response)
        dispatch({type:GUARDAR_REGISTRO_PROMEDIO, promedio:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar las ventas',
            'ERROR',
            0
        );
    });
}
export const actions = {
    listarProductos,
    leerProducto,
    registroCompra,
    listarVentas,
    listarCompras,
    totalVentasProducto,
    promedioPrecioProducto,
};

export const reducers = {
    [GUARDAR_LISTADO_PRODUCTOS]: (state, { data } )=> {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_PRODUCTO]: (state, { registro } )=> {
        return {
            ...state,
            registro,
        };
    },
    [GUARDAR_LISTADO_VENTAS]: (state, { ventas } )=> {
        return {
            ...state,
            ventas,
        };
    },
    [GUARDAR_LISTADO_COMPRAS]: (state, { compras } )=> {
        return {
            ...state,
            compras,
        };
    },
    [GUARDAR_LISTADO_TOTAL_VENTAS_PRODUCTO]: (state, { totales_venta_prod } )=> {
        return {
            ...state,
            totales_venta_prod,
        };
    },
    [GUARDAR_REGISTRO_PROMEDIO]: (state, { promedio } )=> {
        return {
            ...state,
            promedio,
        };
    },
};

export const initialState = {
    loader: false,
    data: null,
    registro: null,
    ventas:null,
    compras: null,
    totales_venta_prod:null,
    promedio:null,
}

export default handleActions(reducers, initialState);
