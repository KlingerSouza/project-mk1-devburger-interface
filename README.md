# Meu Projeto - devburger

## Descrição
Este projeto é um sistema web full stack desenvolvido com React, Node.js e MongoDB. Ele permite ter a experiência de um site completamente funcional!

## Tecnologias Utilizadas
- **Frontend**: React, Styled Components
- **Backend**: Node.js, Express
- **Banco de Dados**: MongoDB
- **Containerização**: Docker
- **Deploy**: AWS (S3, EC2/ECS, RDS/DocumentDB, CloudFront)

## Como Rodar o Projeto
### 1. Clonar o Repositório
```sh
git clone https://github.com/KlingerSouza/devburger
cd devburger
```

### 2. Configurar as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis:
```plaintext
MONGO_URI= # URL do MongoDB
JWT_SECRET= # Chave secreta para autenticação
PORT=5000
```

### 3. Instalar as Dependências
```sh
npm install  # ou yarn
```

### 4. Rodar o Backend
```sh
npm run dev  # ou yarn dev
```

### 5. Rodar o Frontend
```sh
cd frontend
npm install
npm start  # ou yarn start
```

## Deploy na AWS
O projeto está configurado para ser implantado na AWS utilizando:
- **Frontend**: AWS S3 + CloudFront
- **Backend**: AWS EC2 ou ECS (Fargate) + MongoDB Atlas
- **CI/CD**: GitHub Actions + AWS CodeDeploy

### 1. Configurar AWS CLI
Certifique-se de que sua AWS CLI está configurada:
```sh
aws configure
```

### 2. Criar a Imagem Docker e Subir para AWS ECR
```sh
docker build -t meu-projeto .
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com

docker tag meu-projeto:latest <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/meu-projeto:latest

docker push <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/meu-projeto:latest
```

### 3. Criar a Instância EC2 ou Serviço ECS
Acesse o **AWS Console**, vá até **ECS** ou **EC2** e configure seu ambiente conforme necessário.

### 4. Configurar CI/CD com GitHub Actions
Adicione um workflow para automação do deploy.

## Contribuição
Sinta-se à vontade para abrir issues ou fazer pull requests.

## Licença
Este projeto está sob a licença MIT.
