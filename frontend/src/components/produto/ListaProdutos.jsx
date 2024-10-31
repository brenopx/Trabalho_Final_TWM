import React, {useEffect} from "react";
import { connect } from 'react-redux';
import ProdutoItem from './ProdutoItem';
import ProdutoNaoEncontrado from './ProdutoNaoEncontrado';

import * as produtosActions from '../../store/produtos/actions'
import * as checkoutActions from '../../store/checkout/actions'

function ListaProdutos(props) {
    const produtos = props.produtos.list_produtos
    let component_list = []
    useEffect(() => {
        props.OnGetProdutos(props.global.api_instance)
    },[]);
    
    const list_produtos_filter = props.produtos.filter_produtos
    useEffect(() => {
    },[list_produtos_filter]);

    if(list_produtos_filter.length > 0){
        component_list = list_produtos_filter
    } else {
        component_list = produtos
    }
    
    return component_list.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2
            md:grid-cols-3 lg:grid-cols-4 gap-5 "
        >
            {component_list.map((produto) => (
                <ProdutoItem produto={produto} key={produto.id} />
            ))}
        </div>
    ) : (
        <ProdutoNaoEncontrado semBotaVoltar />
    )
}

const reduxStateToProps = (state) =>({
    global: state.global,
    produtos: state.produtos,
    checkout: state.checkout
});

const reduxDispatchToProps = (dispatch) =>({
    OnGetProdutos:(api)=>dispatch(produtosActions.getProdutosBackend(api)),
    OnChangeAddProdutoCarrinho:(produto)=>dispatch(checkoutActions.changeAddProdutoCarrinho(produto)),
});

export default connect(reduxStateToProps,reduxDispatchToProps)(ListaProdutos);