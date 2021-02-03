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
