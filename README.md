## Como usar o Fronted

### Instalando as dependencias
`npm install`

### Executando o front
`npm run start`

## Como usar o Backend

### Criando o ambiente virtual
`python3 -m venv .back`

### Ativando o ambiente virtual
`source .back/bin/activate`

### Instalando as dependencias
`pip install -r requirements.in`

### Executando o back
`uvicorn src.main:app --port 8000 --host 0.0.0.0`

## Usando o docker-compose

### Instalando o docker-compose
`sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`

`sudo chmod +x /usr/local/bin/docker-compose`

# Executando o docker-compose 

`docker-compose up -d`
