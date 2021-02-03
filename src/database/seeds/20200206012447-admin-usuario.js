const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Usuario',
    [
      {
        nome: 'Usuário Admin',
        email: 'usuario@admin.com.br',
        passwordHash: bcrypt.hashSync('123456', 8),
        refreshToken: ' ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: () => {},
};
