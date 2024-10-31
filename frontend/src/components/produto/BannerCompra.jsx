import React from "react";
import { connect } from 'react-redux';
import { IconCreditCard, IconShoppingCart } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";

import * as checkoutActions from '../../store/checkout/actions'

function BannerCompra(props) {
    const navigate = useNavigate();
    const { produto } = props
    const adicionarItemCarrinho=(item)=>{
        props.OnChangeAddProdutoCarrinho(item)
    }
    return (
        <div className="flex">
            <div className="flex flex-col border-r border-zinc-500 pr-5">
                <div className="line-through text-zinc-400">de {produto?.precoBaseFormatado}</div>
                <div className="text-2xl font-semibold">
                    <span className="text-base text-zinc-300">por</span>{' '}
                    <span className="text-emerald-500">{produto?.precoPromocionalFormatado}</span>{' '}
                    <span className="text-base text-zinc-300">à vista</span>
                </div>
            </div>
            <div className="flex-1 flex flex-col text-2xl font-semibold text-zinc-400 pl-5">
                <span className="text-base text-zinc-300">{12}x de</span>
                {produto?.precoParceladoFormatado}
            </div>
            <div className="flex gap-2 items-center">
                <button
                    className="flex-1 button bg-pink-600"
                    onClick={(e) => adicionarItemCarrinho(produto)}
                >
                    <IconShoppingCart size={20} />
                    <span>Adicionar</span>
                </button>
                <button
                    className="flex-1 button bg-violet-700"
                    onClick={(e) => {
                        adicionarItemCarrinho(produto)
                        navigate("/carrinho")
                    }}
                >
                    <IconCreditCard size={20} />
                    <span>Comprar</span>
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
    OnChangeAddProdutoCarrinho:(produto)=>dispatch(checkoutActions.changeAddProdutoCarrinho(produto)),
});

export default connect(reduxStateToProps,reduxDispatchToProps)(BannerCompra);