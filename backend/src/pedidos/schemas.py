from pydantic import BaseModel

class CreatePedidos(BaseModel):
    data : str
    formaPagamento : str
    valorTotal : float
    status : str
    valorParcelado : float
    itens : str
    entrega_id : int


class Pedidos(CreatePedidos):
    id : int
