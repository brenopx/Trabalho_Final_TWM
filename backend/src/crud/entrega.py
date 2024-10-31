from sqlalchemy.orm import Session
from .. import models


class TEntrega:

    @staticmethod
    def get_entrega_all(db:Session):
        db_query = db.query(models.Entrega)
        db_entrega = db_query.all()
        return(db_entrega)


    @staticmethod
    def get_entrega_by_id(db:Session, id: int):
        db_query = db.query(models.Entrega)
        db_entrega = db_query.filter(models.Entrega.id == id).first()
        return(db_entrega)


    @staticmethod
    def create_entrega(db:Session, params_entrega:dict):    
        db_entrega = models.Entrega(**params_entrega.__dict__)
        db.add(db_entrega)
        db.commit()
        db.refresh(db_entrega)
        return(db_entrega)


    @staticmethod
    def update_entrega(db:Session, id:int, params_entrega:dict):
        db_entrega = TEntrega.get_entrega_by_id(db=db, id=id)
        if db_entrega:
            for key, value in params_entrega.__dict__.items():
                setattr(db_entrega, key, value)
            db.commit()
            db.refresh(db_entrega)
        return (db_entrega)


    @staticmethod
    def delete_entrega(db:Session, id:int):
        db_entrega = TEntrega.get_entrega_by_id(db=db, id=id)
        if db_entrega:
            db.delete(db_entrega)
            db.commit()
        return (db_entrega)
