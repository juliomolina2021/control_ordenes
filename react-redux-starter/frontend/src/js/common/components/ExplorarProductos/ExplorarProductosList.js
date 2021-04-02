import React, { Component } from 'react';
import Imagen from './ImagenProducto'

class ListadoProductos extends Component{
    componentWillMount = () => {
        const { listarProductos } = this.props;
        listarProductos();
    }
    mostrarImagenes=()=>{
        const colores=["dark-blue","blue","dark-gray","purple", "gray ", "light-gray","orange","red", "yellow","fusia","mostaza", "verde","green"];
        const {data}=this.props
        let i=0;
        const obtenerColor=()=>{
            let color = colores[i]
            i+=1;
            return color;
        }
        return(
            <React.Fragment>
                <div className="col-12 p-5 row ">
                    {data &&
                        data.results.map(producto => (
                            <Imagen
                                key={producto.id}
                                imagen={producto.imagen}
                                nombre={producto.nombre}
                                precio={producto.precio}
                                stock={producto.stock}
                                color={obtenerColor()}
                                id={producto.id}
                                vendedor={producto.user.username}
                            />

                        ))
                    }
                </div>
            </React.Fragment>
        )
    }
    render(){
        return(
            <React.Fragment>
                <center><h3>Productos registrados </h3></center>
                {this.mostrarImagenes() }
        </React.Fragment>
        );
    }
}

export default ListadoProductos;
