import React from "react";
import FiltroProduto from '../../components/produto/FiltroProduto';
import ListaProdutos from '../../components/produto/ListaProdutos';

export default function Home() {
    return(
        <div className="flex flex-col gap-6 container p-10">
            <FiltroProduto />
            <ListaProdutos />
        </div>
    )
}