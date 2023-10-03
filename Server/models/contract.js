'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contract.hasMany(models.Transaction, { foreignKey: 'ContractId'})
      Contract.belongsTo(models.Project, { foreignKey: 'ProjectId' })
      Contract.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  }
  Contract.init({
    ProjectId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'waiting'
    }
  }, {
    sequelize,
    modelName: 'Contract',
  });
  return Contract;
};