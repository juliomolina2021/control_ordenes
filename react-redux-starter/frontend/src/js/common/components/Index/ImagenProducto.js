import React from  'react'
import './card.css';

const Imagen=(props)=>{
    const {imagen, nombre, color,id, precio, stock, vendedor, eliminar} = props;
    return(
        <React.Fragment>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
                <div className="card">
                    <a>
                    {!imagen && <img src={`http://localhost:8000/media/Avatar/defaultprod.png`} className="card-img-top" height="150px"/> }
                    {imagen && <img src={imagen} className="card-img-top" height="150px"/> }
                    </a>
                    <div className={`card-body text-faded ${color}`} >
                        <center><label>{nombre}</label></center>
                        <p className="text-faded ">
                            Precio: Q.{precio}<br/>
                            Existencia: {stock}<br/> 
                            Vendedor: {vendedor}

                        </p>
                    </div>
                    <center><a className={`circle-tile-footer ${color}`}  href={`/#/detalle/${id}`}>Ver Mas  <i className="fa fa-chevron-circle-right"></i></a></center>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Imagen;
