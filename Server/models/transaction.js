'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: 'UserId' })
      Transaction.belongsTo(models.ProjectOwner, { foreignKey: 'OwnerId' })
      Transaction.belongsTo(models.Contract, { foreignKey: 'ContractId' })
    }
  }
  Transaction.init({
    ContractId: DataTypes.INTEGER,
    OwnerId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    paymentStatus: {
      type: DataTypes.STRING,
      defaultValue: 'waiting'
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};