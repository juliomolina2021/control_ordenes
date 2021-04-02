import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/explorar_productos/explorar_productos';
import VentasList from './VentasList'

const ms2p = (state)=>{
    return{
        ...state.explorar_producto //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(VentasList);
