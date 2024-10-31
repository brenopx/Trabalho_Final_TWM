import React from "react";
import { IconDevicesPcOff } from '@tabler/icons-react';

export default function ProdutoNaoEncontrado(props) {
    return (
        <div className="flex-1 flex flex-col justify-center items-center text-violet-300">
            <IconDevicesPcOff size={180} stroke={0.5} />
            <span className="text-violet-300 font-light">Produto não encontrado</span>
            {!props.semBotaVoltar && (
                <div href="/" className="button bg-violet-700 text-white mt-5">
                    Voltar
                </div>
            )}
        </div>
    )
}
