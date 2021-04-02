import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {renderField, renderNumber, renderTextArea}from '../Utils/renderField/renderField';
import './card.css';

class ProductoCompra extends Component{
    render(){

        const {handleSubmit, nombre, imagen, precio, stock, vendedor, descripcion} = this.props;
        return(
            <React.Fragment>
                <br/>
                <div className="card mb3 col-12" >
                    <br/>
                    <div className="row">
                        <div className="col-md-12 mt-lg-4 mt-4">
                            <div className="d-sm-flex align-items-center justify-content-center mb-4">
                                {nombre &&
                                    <h1 className="h3 mb-0">{nombre}</h1>
                                }
                            </div>
                        </div>
                        <hr width="100%"/>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-sm-12">
                            <img src={imagen} className="card-img-top" height='auto'/> 
                        </div>

                        <div className="col-lg-6 col-sm-12">
                            <p className="infoCompra">
                                Precio:  Q.{precio}<br/>
                                Existencia:  {stock}<br/> 
                                Vendedor:  {vendedor}<br/>
                                Descripcion:  {descripcion}
                            </p>
                            <hr width="100%"/>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="number_field">Introduce la cantidad</label>
                                <Field
                                    name="cantidad"
                                    placeholder="Cantidad de productos"
                                    component={renderNumber}
                                />
                                <br/>
                                <label>Ingresa la direccion de envio</label>
                                <Field name='direccion_envio' component={renderTextArea}/>
                                <br/>
                                <center><button type='submit' className="btn btn-primary btn-lg">¡Comprar!</button></center>
                            </form>
                        </div>
                    </div>
                    <br/>
                </div>
                <br/>
            </React.Fragment>
        );
    }
}
export default reduxForm({
    form:'producto_compra' // a unique identifier for this form
})(ProductoCompra)
