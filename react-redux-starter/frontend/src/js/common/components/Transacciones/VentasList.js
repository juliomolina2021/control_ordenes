import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import moment from 'moment'

class ListadoVentas extends Component{
    componentWillMount = () => {
        const { listarVentas } = this.props;
        listarVentas();
    }

    render(){
        const { ventas, loader, } = this.props;
        console.log("Ventaaas ", ventas)
        return(
            <React.Fragment>
                <center><h3>Listado Ventas </h3></center>
            { ventas &&
                <Grid
                    hover
                    striped data={ventas}
                    loading={loader}
                    //onPageChange={listar}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn
                        isKey
                        dataField="fecha"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if(row.fecha){
                                return moment(row.fecha).format('YYYY-MM-DD hh:mm a');
                            }
                        }}
                    >
                        Fecha
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="producto"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if(row.producto){
                                return row.producto.nombre;
                            }
                        }}
                    >
                        Producto
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="cantidad"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if(row.cantidad){
                                return row.cantidad;
                            }
                        }}
                    >
                        Cantidad
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="producto"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if(row.producto.precio){
                                return row.producto.precio;
                            }
                        }}
                    >
                        Precio Unitario
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="total"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if(row.total){
                                return row.total;
                            }
                        }}
                    >
                        Total
                    </TableHeaderColumn>         
                </Grid>
            }
        </React.Fragment>
        );
    }
}

export default ListadoVentas;
