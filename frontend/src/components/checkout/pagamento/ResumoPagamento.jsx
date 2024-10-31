import React from "react";
import { IconCreditCard } from '@tabler/icons-react';

export default function ResumoPagamento(props) {
    return (
        <div
            className={`
                flex flex-col self-start gap-3 
                w-96 px-6 py-8
                bg-purple-950  rounded-xl
                ${props.className ?? ''}
            `}
        >
            <span className="text-xl font-semibold">Resumo:</span>
            <div className="flex justify-between">
                <span className="text-zinc-400">Forma de Pagamento:</span>
                <span>{props.selectionFormaPagamento}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-zinc-400">Valor Total:</span>
                <span className="text-emerald-500 font-semibold">
                    {props.valorTotalCheioFormatado}
                </span>
            </div>
            <div className="flex justify-between">
                <span className="text-zinc-400">Desconto:</span>
                <span className="text-red-500 font-semibold">
                    -{props.desconto}
                </span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-zinc-400">à vista no PIX/Boleto</span>
                <span className="text-emerald-500 font-semibold text-2xl">
                    {props.valorTotalFormatado ?? 0}
                </span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-sm text-zinc-300 mt-2">
                    Parcelamento no Boleto
                </span>
                <div className="text-sm text-zinc-300">
                    em até{' '}
                    <span className="text-white font-semibold">
                        {12}x
                    </span>{' '}
                    de{' '}
                    <span className="text-white font-semibold">
                        {props.valorTotalParceladoFormatado}
                    </span>
                </div>
            </div>
            <button
                onClick={props.finalizarCompra}
                className="button bg-indigo-700 mt-7"
            >
                <IconCreditCard size={20} />
                <span>Finalizar Compra</span>
            </button>
        </div>
    )
}
