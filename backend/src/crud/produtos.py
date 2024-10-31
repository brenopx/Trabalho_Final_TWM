from sqlalchemy.orm import Session
from .. import models
import json

class TProdutos:
    @staticmethod
    def create_produtos_json(file_json, db:Session):
        with open(file_json) as file:
            data_dict = json.load(file)
        for item in data_dict['Produtos']:
            item['especificacoes'] = json.dumps(item['especificacoes'])
            db_produtos = models.Produtos(**item)
            db.add(db_produtos)
            db.commit()
            db.refresh(db_produtos)
        return(data_dict)

    @staticmethod
    def get_produtos_all(db:Session):
        db_query = db.query(models.Produtos)
        db_produtos = db_query.all()
        return(db_produtos)


    @staticmethod
    def get_produtos_by_id(db:Session, id: int):
        db_query = db.query(models.Produtos)
        db_produtos = db_query.filter(models.Produtos.id == id).first()
        return(db_produtos)


    @staticmethod
    def create_produtos(db:Session, params_produtos:dict):
        db_produtos = models.Produtos(**params_produtos.__dict__)
        db.add(db_produtos)
        db.commit()
        db.refresh(db_produtos)
        return(db_produtos)


    @staticmethod
    def update_produtos(db:Session, id:int, params_produtos:dict):
        db_produtos = TProdutos.get_produtos_by_id(db=db, id=id)
        if db_produtos:
            for key, value in params_produtos.__dict__.items():
                setattr(db_produtos, key, value)
            db.commit()
            db.refresh(db_produtos)
        return (db_produtos)


    @staticmethod
    def delete_produtos(db:Session, id:int):
        db_produtos = TProdutos.get_produtos_by_id(db=db, id=id)
        if db_produtos:
            db.delete(db_produtos)
            db.commit()
        return (db_produtos)
