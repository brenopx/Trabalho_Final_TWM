import React from "react";
import Especificacoes from './Especificacoes';

export default function InformacoesProduto(props) {
    const { produto } = props
    return produto ? (
        <div className="flex items-center bg-purple-950  rounded-xl p-5">
            <div className="flex-1 relative flex justify-center h-96">
                <img
                    src={produto?.imagem}
                    fill
                    className="object-cover p-7"
                    alt="Imagem do Produto"
                />
            </div>
            <Especificacoes produto={produto} />
        </div>
    ) : null
}
