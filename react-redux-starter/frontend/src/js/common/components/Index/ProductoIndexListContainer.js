import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/producto/producto';
import ProductoIndexList from './ProductoIndexList'

const ms2p = (state)=>{
    return{
        ...state.producto //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(ProductoIndexList);
