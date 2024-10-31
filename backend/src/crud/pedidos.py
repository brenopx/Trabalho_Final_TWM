from sqlalchemy.orm import Session
from .. import models


class TPedidos:

    @staticmethod
    def get_pedidos_all(db:Session):
        db_query = db.query(models.Pedidos)
        db_pedido = db_query.all()
        return(db_pedido)
    

    @staticmethod
    def get_pedidos_entrega(db:Session, id_pedido:int):
        db_query_pedido = db.query(models.Pedidos)
        db_pedido = db_query_pedido.filter(models.Pedidos.id == id_pedido).first()

        db_query_entrega = db.query(models.Entrega)
        db_entrega = db_query_entrega.filter(models.Entrega.id == db_pedido.__dict__['entrega_id']).first()

        db_result = {**db_pedido.__dict__, **db_entrega.__dict__}
        return(db_result)


    @staticmethod
    def get_pedidos_by_id(db:Session, id: int):
        db_query = db.query(models.Pedidos)
        db_pedido = db_query.filter(models.Pedidos.id == id).first()
        return(db_pedido)


    @staticmethod
    def create_pedidos(db:Session, params_pedidos:dict):       
        db_pedido = models.Pedidos(**params_pedidos.__dict__)
        db.add(db_pedido)
        db.commit()
        db.refresh(db_pedido)
        return(db_pedido)


    @staticmethod
    def update_pedidos(db:Session, id:int, params_pedidos:dict):
        db_pedido = TPedidos.get_pedidos_by_id(db=db, id=id)
        if db_pedido:
            for key, value in params_pedidos.__dict__.items():
                setattr(db_pedido, key, value)
            db.commit()
            db.refresh(db_pedido)
        return (db_pedido)


    @staticmethod
    def delete_pedidos(db:Session, id:int):
        db_pedido = TPedidos.get_pedidos_by_id(db=db, id=id)
        if db_pedido:
            db.delete(db_pedido)
            db.commit()
        return (db_pedido)
