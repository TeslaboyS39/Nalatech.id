'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ForumPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ForumPost.belongsTo(models.ProjectOwner, { foreignKey: 'OwnerId' })
      ForumPost.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  }
  ForumPost.init({
    UserId: DataTypes.INTEGER,
    OwnerId: DataTypes.INTEGER,
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Topic is required'
        },
        notEmpty: {
          msg: "Topic is required"
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Content is required'
        },
        notEmpty: {
          msg: "Content is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ForumPost',
  });
  return ForumPost;
};