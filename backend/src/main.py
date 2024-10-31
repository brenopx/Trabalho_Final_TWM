from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import (
    get_redoc_html,
    get_swagger_ui_html,
    get_swagger_ui_oauth2_redirect_html
)

from .env import Enviroment as Env
from .database import SessionManager, engine, Base
from .crud import TProdutos

from .produtos import routes as produtos_routes
from .produtos import schemas as produtos_schemas

from .entrega import routes as entrega_routes
from .entrega import schemas as entrega_schemas

from .pedidos import routes as pedidos_routes
from .pedidos import schemas as pedidos_schemas

Base.metadata.create_all(bind=engine)
app = FastAPI(root_path=f"{Env.API_NAME}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Offline docs
@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url=f"{Env.API_NAME}{app.openapi_url}",
        title=app.title + " - Swagger UI",
        oauth2_redirect_url=app.swagger_ui_oauth2_redirect_url,
        swagger_js_url=f"{Env.API_NAME}/static/swagger-ui-bundle.js",
        swagger_css_url=f"{Env.API_NAME}/static/swagger-ui.css",
    )


@app.get(app.swagger_ui_oauth2_redirect_url, include_in_schema=False)
async def swagger_ui_redirect():
    return get_swagger_ui_oauth2_redirect_html()

@app.get("/redoc", include_in_schema=False)
async def redoc_html():
    return get_redoc_html(
        openapi_url=f"{Env.API_NAME}{app.openapi_url}",
        title=app.title + " - ReDoc",
        redoc_js_url=f"{Env.API_NAME}/static/redoc.standalone.js",
    )

with SessionManager() as db:
    list_produtos = produtos_routes.get_produtos_all(db)
    if (len(list_produtos)==0):
        TProdutos.create_produtos_json(file_json='src/mock/produtos.json', db=db)

# Application Routes

### Produtos
app.add_api_route('/get_produtos',
    methods=['GET'], 
    # response_model=List[dict],
    endpoint=produtos_routes.get_produtos_all)

app.add_api_route('/post_produtos',
    methods=['POST'], response_model=produtos_schemas.Produtos,
    endpoint=produtos_routes.create_produtos)

app.add_api_route('/update_produtos',
    methods=['PUT'], response_model=produtos_schemas.Produtos,
    endpoint=produtos_routes.update_produtos)

app.add_api_route('/delete_produto',
    methods=['DELETE'], response_model=bool,
    endpoint=produtos_routes.delete_produtos)


### Entrega
app.add_api_route('/get_entrega',
    methods=['GET'], response_model=List[entrega_schemas.Entrega],
    endpoint=entrega_routes.get_entrega_all)

app.add_api_route('/post_entrega',
    methods=['POST'], response_model=entrega_schemas.Entrega,
    endpoint=entrega_routes.create_entrega)

app.add_api_route('/update_entrega',
    methods=['PUT'], response_model=entrega_schemas.Entrega,
    endpoint=entrega_routes.update_entrega)

app.add_api_route('/delete_entrega',
    methods=['DELETE'], response_model=bool,
    endpoint=entrega_routes.delete_entrega)


### Pedidos
app.add_api_route('/get_pedidos',
    methods=['GET'], response_model=List[pedidos_schemas.Pedidos],
    endpoint=pedidos_routes.get_pedidos_all)

app.add_api_route('/get_pedidos_entrega',
    methods=['GET'], 
    # response_model=dict,
    endpoint=pedidos_routes.get_pedidos_entrega)

app.add_api_route('/post_pedidos',
    methods=['POST'], response_model=pedidos_schemas.Pedidos,
    endpoint=pedidos_routes.create_pedidos)

app.add_api_route('/update_pedidos',
    methods=['PUT'], response_model=pedidos_schemas.Pedidos,
    endpoint=pedidos_routes.update_pedidos)

app.add_api_route('/delete_pedidos',
    methods=['DELETE'], response_model=bool,
    endpoint=pedidos_routes.delete_pedidos)
