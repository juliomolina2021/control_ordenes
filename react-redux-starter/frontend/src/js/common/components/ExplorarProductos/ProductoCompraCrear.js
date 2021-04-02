import React, {Component} from 'react';
import ProductoCompra from './ProductoCompra';

class ProductoCompraCrear extends Component{
    componentWillMount = () => {
        const { leerProducto, match } = this.props;
        const id = match.params.id
        leerProducto(id);
    }
    render(){
        const { registroCompra, registro,  } = this.props;
        return(
            <React.Fragment>
                <ProductoCompra
                    onSubmit={registroCompra}
                    nombre={registro.nombre}
                    imagen={registro.imagen}
                    precio={registro.precio}
                    stock={registro.stock}
                    descripcion={registro.descripcion}
                    vendedor={registro.user.username}
                />
            </React.Fragment>

        );
    }
}
export default ProductoCompraCrear;
