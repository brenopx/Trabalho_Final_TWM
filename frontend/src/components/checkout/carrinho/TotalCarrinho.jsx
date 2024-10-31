import React from "react";
import { IconShoppingCart } from '@tabler/icons-react';
import { Link } from "react-router-dom";

export default function TotalCarrinho(props) {
    return (
        <div className="flex justify-end items-center gap-7 bg-purple-950  h-24 rounded-xl px-7">
            <div className="flex flex-col">
                <span className="text-zinc-400">
                    Total ({props.qtdeItens}{' '}
                    {props.qtdeItens === 1 ? 'item' : 'itens'}):
                </span>
                <span className="text-emerald-500 text-2xl font-semibold">
                    {props.valorTotal ?? 0}
                </span>
            </div>
            <Link to="/pagamento" className="button bg-indigo-700">
                <IconShoppingCart size={20} />
                <span>Continuar</span>
            </Link>
        </div>
    )
}
