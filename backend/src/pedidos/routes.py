from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from . import schemas
from ..database import get_db
from ..crud import TPedidos


def create_pedidos(params_pedidos:schemas.CreatePedidos, 
    db:Session=Depends(get_db))->schemas.Pedidos:
    response = None
    try:
        response = TPedidos.create_pedidos(
            db = db, params_pedidos = params_pedidos)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
    return (response)


def update_pedidos(params_pedidos:schemas.Pedidos, 
    db:Session=Depends(get_db))->schemas.Pedidos:
    response = None
    try:
        response = TPedidos.update_pedidos(
            db = db, 
            id = params_pedidos.id, 
            params_pedidos = params_pedidos
        )
    except Exception as ex:
        raise HTTPException(status_code=404, detail=str(ex))
    return (response)


def get_pedidos_all(db:Session=Depends(get_db))->List[schemas.Pedidos]:
    response = None
    try:
        response = TPedidos.get_pedidos_all(db = db)
    except Exception as ex:
        raise HTTPException(status_code=404, detail=str(ex))
    return (response)


def get_pedidos_entrega(id_pedido:int, db:Session=Depends(get_db))->dict:
    response = None
    try:
        response = TPedidos.get_pedidos_entrega(db = db, id_pedido = id_pedido)
        response.pop("_sa_instance_state")
    except Exception as ex:
        raise HTTPException(status_code=404, detail=str(ex))
    return (response)


def delete_pedidos(id:int, db:Session=Depends(get_db)) -> bool:
    try:
        response = TPedidos.delete_pedidos(db = db, id = id)
        if(response):
            return(True)
        else:
            return(False)
    except Exception as ex:
        raise HTTPException(
            status_code=500,
            detail=f'Workspace removal failed with error: "{str(ex)}"'
        )    