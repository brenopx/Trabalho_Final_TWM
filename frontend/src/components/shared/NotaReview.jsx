import React from "react";
import { IconStar, IconStarFilled, IconStarHalfFilled } from '@tabler/icons-react';

export default function NotaReview(props) {
    function notaParaEstrelas(nota) {
        const estrelas = []
        for (let i = 1; i <= 5; i++) {
            if (nota >= i) {
                estrelas.push(<IconStarFilled key={i} size={props.tamanho ?? 12} />)
            } else if (nota >= i - 0.5) {
                estrelas.push(<IconStarHalfFilled key={i} size={props.tamanho ?? 12} />)
            } else {
                estrelas.push(<IconStar key={i} size={props.tamanho ?? 12} />)
            }
        }
        return estrelas
    }

    return <div className="flex gap-0.5 text-emerald-400">{notaParaEstrelas(props.nota)}</div>
}
