# 1° - Caso não tenha o YARN instalado, gentileza instala-lo:
npm install --global yarn

# 2° - Executar o comando no teminal, dentro da pasta da aplicação
yarn compose ou docker-compose up --build -d




Comando do sequelize:
# Inicio
docker-compose up -d --build
# Criar model
yarn sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
# Criar migrate
yarn sequelize migration:generate --name
# Exec. migrate
yarn sequelize db:migrate
# Criar Seed
yarn sequelize db:seed:all
# Drop tabelas
yarn sequelize db:migrate:undo:all
# Login/Senha
admin@fastfeet.com
123456
