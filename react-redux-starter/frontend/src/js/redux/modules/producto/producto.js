import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_PRODUCTOS = 'GUARDAR_LISTADO_PRODUCTOS';
const GUARDAR_REGISTRO_PRODUCTO = 'GUARDAR_REGISTRO_PRODUCTO';
const GUARDAR_IMAGEN_PRODUCTO = 'GUARDAR_IMAGEN_PRODUCTO';
const GUARDAR_LISTADO_GENERAL_PRODUCTOS = 'GUARDAR_LISTADO_GENERAL_PRODUCTOS';

export const listarMisProductos = () => (dispatch) => {
    api.get('/producto/mis_productos').then((response) => {
        console.log(response)
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
export const listarProductos = () => (dispatch) => {
    api.get('/producto').then((response) => {
        console.log(response)
        dispatch({type:GUARDAR_LISTADO_GENERAL_PRODUCTOS, productos:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los productos',
            'ERROR',
            0
        );
    });
}

export const leer = (id) => (dispatch) => {
    api.get(`/producto/${id}`).then((response)=>{
        dispatch({type: GUARDAR_IMAGEN_PRODUCTO, imagen: response.imagen});
        dispatch({type: GUARDAR_REGISTRO_PRODUCTO, registro:response});
        dispatch(initializeForm('producto', response))
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const registroProducto = (data={}, attachments=[]) => (dispatch) => {
    console.log("DATA ", data)
    console.log("attachements  ", attachments)
    api.postAttachments('/producto', data, attachments)
    .then(()=>{
        NotificationManager.success(
            'Producto registrado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/productos'))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar al producto',
            'ERROR',
            0
        );
    })
}

export const actualizarProducto = (data={}, attachments=[]) => (dispatch) => {
    api.putAttachments(`/producto/${data.id}`, data, attachments).then((response)=>{
        NotificationManager.success(
            'Producto actualizado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/productos'))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al actualizar el producto',
            'ERROR',
            0
        );
    })
}

export const eliminar = (id) => (dispatch)=>{
    api.eliminar(`/producto/${id}`).then((response)=>{
        NotificationManager.success(
            'Producto eliminado correctamente',
            'Exito',
            3000
        );
        dispatch(listarMisProductos());
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al eliminar el producto',
            'ERROR',
            0
        );
    })
}

export const clearFile=()=>(dispatch)=>{
    dispatch({type:GUARDAR_IMAGEN_PRODUCTO, imagen: null})
}

export const actions = {
    registroProducto,
    actualizarProducto,
    listarMisProductos,
    listarProductos,
    leer,
    eliminar,
    clearFile,
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
    [GUARDAR_IMAGEN_PRODUCTO]: (state, { imagen } )=> {
        return {
            ...state,
            imagen,
        };
    },
    [GUARDAR_LISTADO_GENERAL_PRODUCTOS]: (state, { productos } )=> {
        return {
            ...state,
            productos,
        };
    },
};

export const initialState = {
    loader: false,
    data: null,
    registro: null,
    imagen:null,
    productos:null,
}

export default handleActions(reducers, initialState);
