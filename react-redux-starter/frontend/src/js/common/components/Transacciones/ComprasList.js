import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import moment from 'moment'

class ListadoCompras extends Component{
    componentWillMount = () => {
        const { listarCompras } = this.props;
        listarCompras();
    }

    render(){
        const { compras, loader, } = this.props;
        
        return(
            <React.Fragment>
                <center><h3>Listado compras </h3></center>
            { compras &&
                <Grid
                    hover
                    striped data={compras}
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

export default ListadoCompras;
