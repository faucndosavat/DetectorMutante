module.exports = (sequelize, Sequelize) => {
  return sequelize.define("dna", {
      id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      secuencia: {
        type: Sequelize.STRING(1600),
        allowNull: false
      },
      esMutante: {
        type: Sequelize.BOOLEAN
      }
    });
  };