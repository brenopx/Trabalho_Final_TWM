import {AxiosError} from 'axios';
import * as actionTypes from './actionTypes';

export const changeAddProdutoCarrinho=(produto) => ({
    type:actionTypes.ADD_ITEM_CARRINHO, 
    produto:produto
});

export const changeRemoveItemProdutoCarrinho=(produto) => ({
    type:actionTypes.REMOVE_ITEM_CARRINHO, 
    produto:produto
});

export const changeRemoveProdutoProdutoCarrinho=(produto) => ({
    type:actionTypes.REMOVE_PRODUTO_CARRINHO, 
    produto:produto
});

export const saveCompra=(item) => ({
    type:actionTypes.SAVE_COMPRA, 
    new_item:item
});

export const CLEAR_CARRINHO=() => ({
    type:actionTypes.CLEAR_CARRINHO
});

export const changeFormaPagamento=(tipo) => ({
    type:actionTypes.CHANGEF0RMAPAGAMENTO, 
    selectionFormaPagamento:tipo
});

export const postPedidoBackend=(api_instance, pedido) => (dispatch) => {
    console.log("Valor de pedido", pedido)
    api_instance.post('/post_entrega', pedido['entrega'])
    .then( (res) => {
        console.log("Deu certo /post_entrega !!!!!!!", typeof(res.data.id))
        pedido['entrega_id'] = res.data.id
        pedido['itens'] = JSON.stringify(pedido['itens'])
        console.log("Valor de pedido", pedido)
        api_instance.post('/post_pedidos', pedido)
        .then( (res) => {
            console.log("Deu certo /post_pedidos !!!!!!!", res.data.id)
        } )
        .catch( (req) => {
            console.log("Deu errado !!!!!!!", req)
            if(req.code===AxiosError.ERR_NETWORK){
                console.log(AxiosError.ERR_NETWORK)
            }
        })
    } )
    .catch( (req) => {
        console.log("Deu errado !!!!!!!", req)
        if(req.code===AxiosError.ERR_NETWORK){
            console.log(AxiosError.ERR_NETWORK)
        }
    })
};