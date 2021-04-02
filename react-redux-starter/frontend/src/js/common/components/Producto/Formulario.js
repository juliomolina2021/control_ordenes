import { fromPairs } from 'lodash';
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { AsyncSelectField, renderField, renderNumber, renderFilePicker } from '../Utils/renderField/renderField';
import { api } from '../../../utility/api';

class Formulario extends Component{
    componentWillUnMount=()=>{
        const {clearFile}=this.props;
        clearFile();
    }
    render(){
        const {handleSubmit, crear, setImagen, imagen } = this.props;
        const editar = window.location.href.includes('editar')
        let titulo = editar ? 'Editar Producto' : 'Registrar Producto';
        let disabled = false;
        if(crear == false && editar == false){
            disabled = true;
            titulo= 'Ver Producto';
        }
        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>
                <label>Nombre</label>
                <Field name='nombre' component={renderField} disabled={disabled} />
                <br/><br/>
                <label>Precio</label>
                <Field
                    disabled={disabled}
                    decimalScale={2}
                    name="precio"
                    placeholder="Precio Producto"
                    component={renderNumber}
                />
                <br/><br/>
                <label>Existencia</label>
                <Field
                    disabled={disabled}
                    decimalScale={2}
                    name="stock"
                    placeholder="Existencia"
                    component={renderNumber}
                />
                <br/><br/>
                <label>Descripcion</label>
                <Field name='descripcion' component={renderField} disabled={disabled} />
                <br/><br/>
                <label>Imagen</label>
                <Field
                    accept="image/*,.pdf,document/*"
                    setFile={setImagen}
                    name="imagen"
                    photo={imagen}
                    component={renderFilePicker}
                />
                <div className='d-flex flex-row justify-content-end mt-2' >
                    <a
                        href='/#/productos'
                        className='btn btn-secondary  btn-sm mr-2'>
                        Cancelar
                    </a>
                    {disabled == false  &&
                        <button
                            className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                            type='submit'
                        >
                            {editar ? 'Actualizar':'Registrar'}
                        </button>
                    }
                </div>
            </form>
        );
    }
}
export default reduxForm({
    form:'producto' // a unique identifier for this form
})(Formulario)

