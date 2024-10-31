from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from . import schemas
from ..database import get_db
from ..crud import TEntrega


def create_entrega(params_entrega:schemas.CreateEntrega, 
    db:Session=Depends(get_db))->schemas.Entrega:
    response = None
    try:
        response = TEntrega.create_entrega(
            db = db, params_entrega = params_entrega)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
    return (response)


def update_entrega(params_entrega:schemas.Entrega, 
    db:Session=Depends(get_db))->schemas.Entrega:
    response = None
    try:
        response = TEntrega.update_entrega(
            db = db, 
            id = params_entrega.id, 
            params_entrega = params_entrega
        )
    except Exception as ex:
        raise HTTPException(status_code=404, detail=str(ex))
    return (response)


def get_entrega_all(db:Session=Depends(get_db))->List[schemas.Entrega]:
    response = None
    try:
        response = TEntrega.get_entrega_all(db = db)
    except Exception as ex:
        raise HTTPException(status_code=404, detail=str('Error na rota get_entrega_all'))
        # raise HTTPException(status_code=404, detail=str(ex))
    return (response)


def delete_entrega(id:int, db:Session=Depends(get_db)) -> bool:
    try:
        response = TEntrega.delete_entrega(db = db, id = id)
        if(response):
            return(True)
        else:
            return(False)
    except Exception as ex:
        raise HTTPException(
            status_code=500,
            detail=f'Workspace removal failed with error: "{str(ex)}"'
        )
    