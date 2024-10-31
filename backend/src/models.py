from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import relationship

from .database import Base


class Produtos(Base):
    __tablename__ = "produtos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    descricao = Column(String, nullable=False)
    marca = Column(String, nullable=False)
    descricao = Column(String, nullable=False)
    modelo = Column(String, nullable=False)
    imagem = Column(String, nullable=False)
    nota = Column(Float, nullable=False)
    tag = Column(String, nullable=False)
    precoBase = Column(Float, nullable=False)
    precoPromocional = Column(Float, nullable=False)
    precoParcelado = Column(Float, nullable=False)
    especificacoes = Column(String, nullable=False)


class Entrega(Base):
    __tablename__ = "entrega"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String, nullable=False)
    cpf = Column(String, nullable=False)
    logradouro = Column(String, nullable=False)
    complemento = Column(String, nullable=False)
    cidade = Column(String, nullable=False)
    estado = Column(String, nullable=False)

    datasources = relationship("Pedidos", backref='entrega')


class Pedidos(Base):
    __tablename__ = "pedidos"

    id = Column(Integer, primary_key=True, index=True)
    data = Column(String, nullable=False)
    formaPagamento = Column(String, nullable=False)
    valorTotal = Column(Float, nullable=False)
    status = Column(String, nullable=False)
    valorParcelado = Column(Float, nullable=False)
    itens = Column(String, nullable=False)

    entrega_id = Column(Integer, ForeignKey("entrega.id"))
