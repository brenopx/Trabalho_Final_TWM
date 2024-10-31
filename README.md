## Como usar o Fronted

`npm run start`

## Como usar o Backend

### Criando o ambiente virtual
`pthon3 -m venv .back`

### Ativando o ambiente virtual
`pthon3 -m venv .back`

### Executando o back
`uvicorn src.main:app --port 8000 --host 0.0.0.0`

## Usando o docker-compose

### Instalando o docker-compose
`sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`

`sudo chmod +x /usr/local/bin/docker-compose`

# Executando o docker-compose 

`docker-compose up -d`