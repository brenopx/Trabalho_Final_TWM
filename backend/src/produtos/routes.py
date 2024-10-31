from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from . import schemas
from ..database import get_db
from ..crud import TProdutos
import json


def create_produtos(params_produtos:schemas.CreateProdutos, 
    db:Session=Depends(get_db))->schemas.Produtos:
    response = None
    try:
        response = TProdutos.create_produtos(
            db = db, params_produtos = params_produtos)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
    return (response)


def update_produtos(params_produtos:schemas.Produtos, 
    db:Session=Depends(get_db))->schemas.Produtos:
    response = None
    try:
        response = TProdutos.update_produtos(
            db = db, 
            id = params_produtos.id, 
            params_produtos = params_produtos
        )
    except Exception as ex:
        raise HTTPException(status_code=404, detail=str(ex))
    return (response)


def get_produtos_all(db:Session=Depends(get_db)):
    response = None
    try:
        response = TProdutos.get_produtos_all(db = db)
        for item in response:
            item = item.__dict__
            item['especificacoes'] = json.loads(item['especificacoes'])
    except Exception as ex:
        raise HTTPException(status_code=404, detail=str(ex))
    return (response)


def delete_produtos(id:int, db:Session=Depends(get_db)) -> bool:
    try:
        response = TProdutos.delete_produtos(db = db, id = id)
        if(response):
            return(True)
        else:
            return(False)
    except Exception as ex:
        raise HTTPException(
            status_code=500,
            detail=f'Workspace removal failed with error: "{str(ex)}"'
        )    