import * as actionTypes from './actionTypes';

function qtdeItens(list_item) {
    return list_item.map((item) => item.quantidade).reduce((a, b) => a + b, 0)
}

function valorTotal(list_item) {
    let value = list_item
        .map((item) => parseFloat(item.produto.precoPromocional) * item.quantidade)
        .reduce((a, b) => a + b, 0)
    return value
}

function valorTotalParcelado(list_item) {
    let value = list_item
        .map((item) => parseFloat(item.produto.precoParcelado) * item.quantidade)
        .reduce((a, b) => a + b, 0)
    return value
}

function valorTotalCheio(list_item) {
    let value = list_item
        .map((item) => (parseFloat(item.produto.precoBase) * item.quantidade))
        .reduce((a, b) => a + b, 0)
    return value
}

function Formatar(item) {
    return item.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

const initialState = {
    list_carrinho:[],
    formaPagamento: [
        {'label': "Pagamento no PIX", 'tipo': 'PIX'},
        {'label': "Pagamento no BOLETO", 'tipo': 'BOLETO'}
    ],
    selectionFormaPagamento: 'PIX',
    qtdeItens: 0,
    valorTotal: 0,
    valorTotalCheio: 0,
    valorTotalParcelado: 0,
    valorTotalParceladoFormatado: 0,
    valorTotalFormatado: 0,
    valorTotalCheioFormatado: 0,
    desconto: 0,
    lista_de_compras: []
};

const reducer = (state=initialState, action) => {
    const newState = {...state};
    switch ( action.type ) {
        case actionTypes.ADD_ITEM_CARRINHO:
            let new_item = state.list_carrinho.find((item) => 
                item.produto.id === action.produto.id
            )
            let new_list = []
            if (new_item) {
                new_list = state.list_carrinho.map(
                    (item)=>{
                        if(item.produto.id === action.produto.id){
                            item.quantidade += 1
                        }
                        return item
                    })
            } else {
                new_list = ([
                    ...state.list_carrinho, 
                    { 'produto': action.produto, 'quantidade': 1 }
                ])
            }
            let new_valorTotal = valorTotal(new_list);
            let new_valorTotalCheio = valorTotalCheio(new_list);
            let new_valorTotalParcelado = valorTotalParcelado(new_list);
            let new_desconto = new_valorTotalCheio - new_valorTotal
            newState.list_carrinho = new_list;
            newState.qtdeItens = qtdeItens(new_list);
            newState.valorTotal = new_valorTotal;
            newState.valorTotalCheio = new_valorTotalCheio;
            newState.valorTotalParcelado = new_valorTotalParcelado;
            newState.valorTotalParceladoFormatado = Formatar(new_valorTotalParcelado);
            newState.desconto = Formatar(new_desconto);
            newState.valorTotalFormatado = Formatar(new_valorTotal);
            newState.valorTotalCheioFormatado = Formatar(new_valorTotalCheio);
            break
        case actionTypes.REMOVE_ITEM_CARRINHO:
            let list_itens_carrinho = []
            state.list_carrinho.forEach((item)=>{
                if(item.produto.id === action.produto.id){
                    if(item.quantidade === 1){
                        return 
                    } else {
                        item.quantidade -=1
                    }
                }
                list_itens_carrinho.push(item)
            })
            let novo_valorTotal = valorTotal(list_itens_carrinho);
            let novo_valorTotalCheio = valorTotalCheio(list_itens_carrinho);
            let novo_valorTotalParcelado = valorTotalParcelado(list_itens_carrinho);
            let novo_desconto = novo_valorTotalCheio - novo_valorTotal;
            newState.list_carrinho = list_itens_carrinho;
            newState.qtdeItens = qtdeItens(list_itens_carrinho);
            newState.valorTotal = novo_valorTotal;
            newState.valorTotalCheio = novo_valorTotalCheio;
            newState.valorTotalParcelado = novo_valorTotalParcelado;
            newState.valorTotalParceladoFormatado = Formatar(novo_valorTotalParcelado);
            newState.desconto = Formatar(novo_desconto);
            newState.valorTotalFormatado = Formatar(novo_valorTotal);
            newState.valorTotalCheioFormatado = Formatar(novo_valorTotalCheio);
            break
        case actionTypes.REMOVE_PRODUTO_CARRINHO:
            let itens_carrinho = []
            console.log("valor de state.list_carrinho", state.list_carrinho)
            state.list_carrinho.forEach((item)=>{
                if(item.produto.id === action.produto.id){
                    return 
                }
                itens_carrinho.push(item)
            })
            if(itens_carrinho.length === 0){
                newState.list_carrinho = itens_carrinho;
                newState.qtdeItens = 0;
                newState.valorTotal = 0;
                newState.valorTotalCheio = 0;
                newState.valorTotalParcelado = 0;
                newState.valorTotalParceladoFormatado = 0;
                newState.desconto = 0;
                newState.valorTotalFormatado = 0;
                newState.valorTotalCheioFormatado = 0;
            } else {
                let n_valorTotal = valorTotal(itens_carrinho);
                let n_valorTotalCheio = valorTotalCheio(itens_carrinho);
                let n_valorTotalParcelado = valorTotalParcelado(itens_carrinho);
                let n_desconto = n_valorTotalCheio - n_valorTotal;
                newState.list_carrinho = itens_carrinho;
                newState.qtdeItens = qtdeItens(itens_carrinho);
                newState.valorTotal = n_valorTotal;
                newState.valorTotalCheio = n_valorTotalCheio;
                newState.valorTotalParcelado = n_valorTotalParcelado;
                newState.valorTotalParceladoFormatado = Formatar(n_valorTotalParcelado);
                newState.desconto = Formatar(n_desconto);
                newState.valorTotalFormatado = Formatar(n_valorTotal);
                newState.valorTotalCheioFormatado = Formatar(n_valorTotalCheio);
            }
            break
        case actionTypes.SAVE_COMPRA:
            newState.lista_de_compras = [...state.lista_de_compras, action.new_item]
            break
        case actionTypes.CLEAR_CARRINHO:
            newState.list_carrinho = initialState.list_carrinho;
            newState.selectionFormaPagamento = initialState.selectionFormaPagamento
            newState.qtdeItens = initialState.qtdeItens;
            newState.valorTotal = initialState.valorTotal;
            newState.valorTotalCheio = initialState.valorTotalCheio;
            newState.desconto = initialState.desconto;
            newState.valorTotalFormatado = initialState.valorTotalFormatado;
            newState.valorTotalCheioFormatado = initialState.valorTotalCheioFormatado;
            break
        case actionTypes.CHANGEF0RMAPAGAMENTO:
            newState.selectionFormaPagamento = action.selectionFormaPagamento;
            break
        default:
            // console.debug('[reducers/auth]',action)
            break
    }
    return(newState);
};

export default reducer;
