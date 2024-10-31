import React from "react";
import { connect } from 'react-redux';
import { useState } from 'react'
import { IconSearch } from '@tabler/icons-react';

import * as produtosActions from '../../store/produtos/actions'

function FiltroProduto(props) {
    const [pesquisa, setPesquisa] = useState('')

    function FiltrarProdutos(pesquisa) {
        setPesquisa(pesquisa)
        const palavras = pesquisa.toLowerCase().split(' ')
        const return_list_produtos = props.produtos.list_produtos.filter((produto) => {
            const texto = `
                ${produto.nome}
                ${produto.descricao}
                ${Object.values(produto.especificacoes).join(' ')}
                ${produto.marca}
            `.toLowerCase()
            return palavras.every((palavra) => texto.includes(palavra))
        })
        props.OnChangeFilterProdutos(return_list_produtos)
        return return_list_produtos
    }
    
    return (
        <div>
            <div
                className={`
                    flex gap-2 bg-purple-950  border border-white/20 
                    rounded-full overflow-hidden ${props.className ?? ''}
                `}
            >
                <input
                    value={pesquisa}
                    onChange={(e) => FiltrarProdutos(e.target.value)}
                    placeholder="O que você procura?"
                    className="flex-1 bg-transparent outline-none px-6 py-3"
                />
                <div className="flex justify-center items-center
                    bg-emerald-500 px-4">
                    <IconSearch size={24} className="text-white" />
                </div>
            </div>
        </div>
    )
}

const reduxStateToProps = (state) =>({
    global: state.global,
    produtos: state.produtos
});

const reduxDispatchToProps = (dispatch) =>({
    OnChangeFilterProdutos:(list_produto)=>dispatch(produtosActions.changeFilterProdutos(list_produto)),
});

export default connect(reduxStateToProps,reduxDispatchToProps)(FiltroProduto);