import React from "react";
import { connect } from 'react-redux';
import CabecalhoCheckout from "../../components/checkout/CabecalhoCheckout";
import CarrinhoItem from "../../components/checkout/carrinho/CarrinhoItem";
import CarrinhoVazio from "../../components/checkout/carrinho/CarrinhoVazio";
import TotalCarrinho from "../../components/checkout/carrinho/TotalCarrinho";

import * as checkoutActions from '../../store/checkout/actions';

function Carrinho(props) {
    const itens_carrinho = props.checkout.list_carrinho
    const qtdeItens = props.checkout.qtdeItens
    const valorTotal = props.checkout.valorTotalFormatado
    const adicionarItem = (produto) => {
        props.OnchangeAddProdutoCarrinho(produto)
    }
    const removerItem = (produto) => {
        props.OnchangeRemoveItemProdutoCarrinho(produto)
    }
    const removerProduto = (produto) => {
        console.log("Valor de produto em removerProduto", produto)
        props.OnchangeRemoveProdutoProdutoCarrinho(produto)
    }

    return (
        <div className="flex flex-col gap-5 container">
            <CabecalhoCheckout passo="carrinho" />
            <div className="flex flex-col gap-4">
                {itens_carrinho.length === 0 && <CarrinhoVazio />}
                {itens_carrinho.map((item) => (
                    <CarrinhoItem
                        key={item.produto.id}
                        item={item}
                        adicionarItem={() => adicionarItem(item.produto)}
                        removerItem={() => removerItem(item.produto)}
                        removerProduto={() => removerProduto(item.produto)}
                    />
                ))}
            </div>
            <TotalCarrinho qtdeItens={qtdeItens} valorTotal={valorTotal} />
        </div>
    )
}

const reduxStateToProps = (state) =>({
    global: state.global,
    produtos: state.produtos,
    checkout: state.checkout
});

const reduxDispatchToProps = (dispatch) =>({
    OnchangeAddProdutoCarrinho:(produto)=>dispatch(checkoutActions.changeAddProdutoCarrinho(produto)),
    OnchangeRemoveProdutoProdutoCarrinho:(produto)=>dispatch(checkoutActions.changeRemoveProdutoProdutoCarrinho(produto)),
    OnchangeRemoveItemProdutoCarrinho:(produto)=>dispatch(checkoutActions.changeRemoveItemProdutoCarrinho(produto)),
});

export default connect(reduxStateToProps,reduxDispatchToProps)(Carrinho);