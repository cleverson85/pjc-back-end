module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Album',
    'artistaId',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'Artista',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  ),

  down: (queryInterface) => queryInterface.removeColumn(
    'Album',
    'artistaId',
  ),
};
