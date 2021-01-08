const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Usuario',
    [
      {
        nome: 'Usuário Admin',
        email: 'usuario@admin.com.br',
        password_hash: bcrypt.hashSync('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: () => {},
};
