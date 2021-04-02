import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {renderField, renderFilePicker}from '../Utils/renderField/renderField'
import './card.css';

class DetalleProducto extends Component{
    componentWillMount = () => {
        const { leerProducto, match } = this.props;
        const id = match.params.id
        leerProducto(id);
    }

    render(){

        const {registro} = this.props;
        return(
            <React.Fragment>
                <br/>
                <div className="card mb3 col-12" >
                    <br/>
                    <div className="row">
                        <div className="col-md-12 mt-lg-4 mt-4">
                            <div className="d-sm-flex align-items-center justify-content-center mb-4">
                                {registro.nombre &&
                                    <h1 className="h3 mb-0">{registro.nombre}</h1>
                                }
                            </div>
                        </div>
                        <hr width="100%"/>

                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-sm-12">
                            <img src={registro.imagen} className="card-img-top" height='auto'/> 
                        </div>

                        <div className="col-lg-6 col-sm-12">
                            <p className="informacion">
                                Precio: Q.{registro.precio}<br/>
                                Existencia: {registro.stock}<br/> 
                                Vendedor: {registro.user.username}<br/>
                                Descripcion: {registro.descripcion}
                            </p><br/>
                            <center><a href={`/#/compra/${registro.id}`} className="btn btn-primary btn-lg">¡Compralo ahora!</a></center>
                            
                        </div>
                    </div>
                    <br/>
                </div>
                <br/>
            </React.Fragment>
        );
    }
}
export default DetalleProducto;

