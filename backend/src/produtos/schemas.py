from pydantic import BaseModel

class CreateProdutos(BaseModel):
    nome : str 
    descricao : str 
    marca : str 
    descricao : str 
    modelo : str 
    imagem : str 
    nota : float 
    tag : str 
    precoBase : float 
    precoPromocional : float 
    precoParcelado : float 
    especificacoes : str 


class Produtos(CreateProdutos):
    id : int
