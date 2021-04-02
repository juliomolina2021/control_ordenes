import React, {Component} from 'react';
import Formulario from './Formulario';

class Producto extends Component{
    state={
        creacion: true,
        imagen: null,
    }

    componentWillMount = () => {
        const {leer, match} = this.props;
        const id = match.params.id;

        if(id) {
            this.setState({creacion: false});
            leer(id);
        }
    }

    setImagen=(imagen)=>{
        this.setState({imagen});
    }

    registro =(data)=>{
        const {registroProducto, imagen}= this.props;
        registroProducto({...data, imagen:null}, [{file: this.state.imagen, name:'imagen'}, ])
    }

    actualizar =(data)=>{
        const {actualizarProducto, imagen }= this.props;
        actualizarProducto({...data, imagen:null}, [{file: this.state.imagen, name:'imagen'}, ])
    }

    render(){
        const { imagen, clearFile} = this.props;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? this.registro: this.actualizar;

        return(
            <React.Fragment>
                <Formulario
                    crear= {creacion}
                    onSubmit={funcionEnvio}
                    setImagen={this.setImagen}
                    imagen={imagen}
                    clearFile={clearFile}
                    />
            </React.Fragment>

        );
    }
}
export default Producto;
