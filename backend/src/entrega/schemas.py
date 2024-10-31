from pydantic import BaseModel

class CreateEntrega(BaseModel):
    nome : str
    email : str
    cpf : str
    logradouro : str
    complemento : str
    cidade : str
    estado : str


class Entrega(CreateEntrega):
    id : int
