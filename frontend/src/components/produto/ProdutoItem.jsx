import React from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { IconShoppingCartPlus } from '@tabler/icons-react';
import NotaReview from '../shared/NotaReview';

import * as produtosActions from '../../store/produtos/actions';
import * as checkoutActions from '../../store/checkout/actions';


function ProdutoItem(props) {
    const { produto } = props
    function adicionarItem(item) {
        props.OnChangeAddProdutoCarrinho(item)
    }
    const navigate = useNavigate();
    return (
        <div
            onClick={(e) => {
                props.OnChangeSelectProduto(produto)
                navigate("/produto");
            }}
            className="flex flex-col bg-purple-950  border-2 border-white/10 
            rounded-xl relative max-w-[350px] hover:border-emerald-500"
        >
            <div className="flex justify-end top-2.5 right-2.5 h-6 items-center p-2">
                <NotaReview nota={produto.nota} />
            </div>
            <div className="w-full relative">
                <img
                    src={produto.imagem}
                    className="h-48 w-full"
                    alt={produto.nome}
                />
            </div>
            <div className="flex-1 flex flex-col gap-3 p-5 border-t border-white/10">
                <span className="text-lg text-white font-semibold">{produto.nome}</span>
                <div className="self-start text-sm border-b border-dashed text-white">
                    {produto.especificacoes.destaque}
                </div>
                <div className="flex-1"></div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-400 line-through">
                        de {produto.precoBaseFormatado}
                    </span>
                    <span className="text-xl font-semibold text-emerald-400">
                        por {produto.precoPromocionalFormatado}
                    </span>
                    <span className="text-zinc-400 text-xs">
                        até {12}x de{' '}
                        {produto.precoParceladoFormatado}
                    </span>
                </div>
                <button
                    className="
                      flex justify-center items-center gap-2 h-8 z-20
                      bg-violet-700 hover:border-2 border-emerald-500 rounded-full
                    "
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        adicionarItem(produto)
                    }}
                >
                    <IconShoppingCartPlus size={20} />
                    <span>Adicionar</span>
                </button>
            </div>
        </div>
    )
}

const reduxStateToProps = (state) =>({
    global: state.global,
    produtos: state.produtos,
    checkout: state.checkout
});

const reduxDispatchToProps = (dispatch) =>({
    OnChangeSelectProduto:(produto)=>dispatch(produtosActions.changeSelectProduto(produto)),

    OnChangeAddProdutoCarrinho:(produto)=>dispatch(checkoutActions.changeAddProdutoCarrinho(produto)),
});

export default connect(reduxStateToProps,reduxDispatchToProps)(ProdutoItem);