import React from "react";
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';

export default function Pagina(props) {
    return (
        <div
            className="flex flex-col min-h-screen flex-1 gap-2"
            style={{ background: 'radial-gradient(50% 50% at 50% 50%, #2d0064 0%, #0d001c 100%)' }}
        >
            <div
                className="flex-1 flex flex-col w-screen gap-2"
                style={{ background: 'url("/background.png")' }}
            >
                {!props.semCabecalho && <Cabecalho />}
                <main className={`flex-1 flex flex-col gap-4 ${props.className ?? ''}`}>
                    {props.children}
                </main>
                {!props.semRodape && <Rodape />}
            </div>
        </div>
    )
}
