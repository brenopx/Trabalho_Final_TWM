import React from "react";
import { connect } from 'react-redux';
import AvaliacoesUsuarios from '../../components/produto/AvaliacoesUsuarios';
import BannerCompra from '../../components/produto/BannerCompra';
import InformacoesProduto from '../../components/produto/InformacoesProduto';
import ProdutoNaoEncontrado from '../../components/produto/ProdutoNaoEncontrado';
import TituloProduto from '../../components/produto/TituloProduto';

import * as produtosActions from '../../store/produtos/actions'

function Produto(props) {
    const selct_props = props.produtos.select_produto
    return selct_props ? (
        <div className="flex flex-col gap-20 container py-10">
            <div className="flex flex-col gap-10">
                <TituloProduto produto={selct_props} />
                <InformacoesProduto produto={selct_props} />
                <BannerCompra produto={selct_props} />
            </div>
            <AvaliacoesUsuarios produto={selct_props} />
        </div>
    ) : (
        <ProdutoNaoEncontrado />
    )
}

const reduxStateToProps = (state) =>({
    global: state.global,
    produtos: state.produtos
});

const reduxDispatchToProps = (dispatch) =>({
    OnChangeSelectProduto:(produto)=>dispatch(produtosActions.changeSelectProduto(produto)),
});

export default connect(reduxStateToProps,reduxDispatchToProps)(Produto);