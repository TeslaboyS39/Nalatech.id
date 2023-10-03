'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.hasMany(models.Contract, { foreignKey: 'ProjectId'})
      Project.belongsTo(models.ProjectOwner, { foreignKey: 'OwnerId' })
      Project.belongsToMany(models.User, {
        through: 'Contract',
        foreignKey:"ProjectId"
      })
    }
  }
  Project.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required'
        },
        notEmpty: {
          msg: "Title is required"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required'
        },
        notEmpty: {
          msg: "Description is required"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'hiring'
    },
    OwnerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};