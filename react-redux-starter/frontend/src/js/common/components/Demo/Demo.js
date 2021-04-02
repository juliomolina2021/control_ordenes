import React, { Component } from 'react';
import Grid from "../../components/Utils/Grid";
import './card.css';
import Dashboard from './Dashboard'
import Demo2 from './Demo2'
class Demo extends Component {
    componentWillMount = () => {
        const {totalVentasProducto, promedioPrecioProducto, listarVentas}= this.props;
        totalVentasProducto();
        promedioPrecioProducto();
        listarVentas();
    }
    render() {
        const {ventas, totales_venta_prod, promedio, loader}=this.props;
       console.log("props", this.props);

        return (
            <React.Fragment>
                <br/>
                <div className="card mb3 col-12">
                    <div className="row">
                        <div className="col-md-12 mt-lg-4 mt-4">
                            <div className="d-sm-flex align-items-center justify-content-center mb-4">
                                <h1 className="h3 mb-0">Totales</h1>
                            </div>
                        </div>
                        <hr width="100%"/>
                        <div className="col-lg-6 col-sm-12">
                            <div className="circle-tile ">
                                <a href="/#/misventas"><div className="circle-tile-heading dark-blue"><i className="fa fa-users fa-fw fa-3x"></i></div></a>
                                <div className="circle-tile-content dark-blue">
                                    <div className="circle-tile-description text-faded"> Total ventas global</div>
                                    <div className="circle-tile-number text-faded ">{ventas.count}</div>
                                    <a className="circle-tile-footer" href="/#/misventas">Ver Mas  <i className="fa fa-chevron-circle-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-12">
                            <div className="circle-tile ">
                                <a href="/#/productos"><div className="circle-tile-heading red"><i className="fa fa-graduation-cap fa-fw fa-3x"></i></div></a>
                                <div className="circle-tile-content red">
                                    <div className="circle-tile-description text-faded"> Promedio precios manejados </div>
                                    <div className="circle-tile-number text-faded "> Q.{promedio.promedio}</div>
                                    <a className="circle-tile-footer" href="/#/productos">Ver Mas  <i className="fa fa-chevron-circle-right"></i></a>
                                </div>
                            </div>
                        </div>

                        
                        <hr width="100%"/>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mt-lg-4 mt-4">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0">Total de ventas por producto</h1>
                            </div>
                        </div>
                        <div className="col-md-12 mt-lg-4 mt-4">
                        {totales_venta_prod &&
                            <Grid
                                hover
                                striped
                                data={totales_venta_prod}
                                loading={loader}
                                //onPageChange={onPageChange}
                                //onSortChange={onSortChange}
                            >
                                <TableHeaderColumn
                                    isKey
                                    dataField="prod"
                                    dataSort
                                >
                                    Producto
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField="total_venta_producto"
                                    dataSort
                                >
                                    Total ventas
                                </TableHeaderColumn>
                            </Grid>
                        }
                        </div>
                    </div>
                </div>
                <br/>
            </React.Fragment>
        );
    }
}

export default Demo;
