import * as actionTypes from './actionTypes';

function Formatar(item) {
    return item.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

const initialState = {
    list_produtos:[],
    filter_produtos:[],
    select_produto:{}
};

const reducer = (state=initialState, action) => {
    const newState = {...state};
    switch ( action.type ) {
        case actionTypes.GET_PRODUTOS:
            const new_list_produtos = action.list_produtos.map((produto)=>{
                produto.precoBaseFormatado = Formatar(produto.precoBase)
                produto.precoPromocionalFormatado = Formatar(produto.precoPromocional)
                produto.precoParceladoFormatado = Formatar(produto.precoParcelado)
                return produto
            })
            newState.list_produtos = new_list_produtos;
            break
        case actionTypes.CHANGE_FILTER_PRODUTOS:
            console.log("Valor dento de CHANGE_FILTER_PRODUTOS", action.filter_produtos)
            newState.filter_produtos = action.filter_produtos;
            break
        case actionTypes.SELECT_PRODUTO:
            console.log("Valor de action.select_produto", action.select_produto)
            newState.select_produto = action.select_produto;
            break
        default:
            // console.debug('[reducers/auth]',action)
            break
    }
    return(newState);
};

export default reducer;
