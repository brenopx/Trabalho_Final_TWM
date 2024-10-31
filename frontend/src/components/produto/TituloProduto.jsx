import React from "react";

export default function TituloProduto(props) {
    const { produto } = props
    return (
        <div className="flex flex-col">
            <div className="text-2xl">{produto?.nome}</div>
            <div className="font-light text-zinc-400">{produto?.descricao}</div>
        </div>
    )
}
