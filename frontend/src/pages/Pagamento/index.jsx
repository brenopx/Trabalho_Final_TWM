import React, {useState} from "react";
import { connect } from 'react-redux';
import CabecalhoCheckout from '../../components/checkout/CabecalhoCheckout';
import FormularioEntrega from '../../components/checkout/pagamento/FormularioEntrega';
import ResumoPagamento from '../../components/checkout/pagamento/ResumoPagamento';
import SelecaoFormaPagamento from '../../components/checkout/pagamento/SelecaoFormaPagamento';
import { useNavigate } from "react-router-dom";

import * as checkoutActions from '../../store/checkout/actions';

function Pagamento(props) {
    const navigate = useNavigate();
    const { desconto, qtdeItens, valorTotalFormatado, formaPagamento, 
        selectionFormaPagamento, valorTotalCheioFormatado, valorTotalParcelado,
        valorTotalParceladoFormatado, valorTotal, list_carrinho } = props.checkout
    
    const [entrega, setEntrega] = useState({
        'nome': '',
        'email': '',
        'cpf': '',
        'logradouro': '',
        'complemento': '',
        'cidade': '',
        'estado': ''
    })
    const alterarEntrega = (item)=>{setEntrega(item)}

    const alterarFormaPagamento = (item)=>{
        props.OnChangeFormaPagamento(item.tipo)
    }

    async function finalizarCompra() {
        const pedido = {
            data: new Date(),
            formaPagamento: selectionFormaPagamento,
            valorTotal: valorTotal,
            entrega: entrega,
            status: 'RECEBIDO',
            valorParcelado: valorTotalParcelado,
            itens: list_carrinho.map(
                (item) =>
                    ({
                        produto: item.produto,
                        quantidade: item.quantidade,
                        precoUnitario: item.produto.precoPromocional,
                    })
            ),
        }
        await props.OnpostPedidoBackend(props.global.api_instance,pedido);
        await props.OnCLEAR_CARRINHO();
        navigate('/sucesso');
    }

    return (
        <div className="flex flex-col gap-7 container">
            <CabecalhoCheckout passo="pagamento" />
            <div className="flex gap-5">
                <div className="flex-1 flex flex-col gap-5">
                    <SelecaoFormaPagamento
                        formaPagamento={formaPagamento}
                        formaPagamentoMudou={alterarFormaPagamento}
                    />
                    <FormularioEntrega entrega={entrega} entregaMudou={alterarEntrega} />
                </div>
                <ResumoPagamento
                    qtdeItens={qtdeItens}
                    valorTotalFormatado={valorTotalFormatado}
                    valorTotalCheioFormatado={valorTotalCheioFormatado}
                    desconto={desconto}
                    valorTotalParceladoFormatado={valorTotalParceladoFormatado}
                    selectionFormaPagamento={selectionFormaPagamento}
                    finalizarCompra={finalizarCompra}
                    className="mt-12"
                />
            </div>
        </div>
    )
}

const reduxStateToProps = (state) =>({
    global: state.global,
    produtos: state.produtos,
    checkout: state.checkout
});

const reduxDispatchToProps = (dispatch) =>({
    OnchangeAddProdutoCarrinho:(produto)=>dispatch(checkoutActions.changeAddProdutoCarrinho(produto)),
    OnchangeRemoveProdutoProdutoCarrinho:(produto)=>dispatch(checkoutActions.changeRemoveProdutoProdutoCarrinho(produto)),
    OnchangeRemoveItemProdutoCarrinho:(produto)=>dispatch(checkoutActions.changeRemoveItemProdutoCarrinho(produto)),
    OnChangeFormaPagamento:(tipo)=>dispatch(checkoutActions.changeFormaPagamento(tipo)),
    OnpostPedidoBackend:(api, pedido)=>dispatch(checkoutActions.postPedidoBackend(api, pedido)),
    OnCLEAR_CARRINHO:()=>dispatch(checkoutActions.CLEAR_CARRINHO()),
});

export default connect(reduxStateToProps,reduxDispatchToProps)(Pagamento);