import React, {useState} from "react";

export default function SelecaoFormaPagamento(props) {
    const {formaPagamento, formaPagamentoMudou} = props
    const [FormaPagamentoSelecionado, setFormaPagamentoSelecionado] = useState(formaPagamento[0].tipo);
    function renderizarItem(item) {
        const {label} = item
        const selecionado = item === FormaPagamentoSelecionado ? true : false
        return (
            <button
                className="flex items-center gap-3 bg-purple-950  rounded-lg h-12 px-7"
                onClick={(e) => {
                    setFormaPagamentoSelecionado(item)
                    formaPagamentoMudou(item)
                }}
            >
                <span
                    className={`
                        ${selecionado ? 'bg-emerald-500 border-emerald-500' : 'bg-transparent border-white'}
                        w-5 h-5 border-2 rounded-full
                    `}
                ></span>
                <span>{label}</span>
            </button>
        )
    }

    return (
        <div className={`flex flex-col gap-3 ${props.className ?? ''}`}>
            <span className="px-7 pb-2 text-xl font-bold text-white/70">
                Forma de Pagamento
            </span>
            <div className="flex flex-col gap-3">
                {formaPagamento.map((item)=> renderizarItem(item))}
            </div>
        </div>
    )
}
