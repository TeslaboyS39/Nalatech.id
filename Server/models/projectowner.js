'use strict';
const { hashPassword } = require('../helpers/bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectOwner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProjectOwner.belongsToMany(models.User, {
        through: 'Transaction',
        foreignKey:"OwnerId"
      })
      ProjectOwner.hasMany(models.Project, { foreignKey: 'OwnerId'})
      ProjectOwner.hasMany(models.ForumPost, { foreignKey: 'OwnerId'})
    }
  }
  ProjectOwner.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Name must be unique"
      },
      validate: {
        notNull: {
          msg: 'Name is required'
        },
        notEmpty: {
          msg: "Name is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique"
      },
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: { 
          msg: "Invalid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: "Password is required"
        },
        len: {
          args: [5],
          msg: "Password must be at least 5 characters long"
        }
      }
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Contact number must be unique"
      },
      validate: {
        notNull: {
          msg: 'Contact number is required'
        },
        notEmpty: {
          msg: "Contact number is required"
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
    website: DataTypes.STRING,
    photoUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProjectOwner',
  });
  ProjectOwner.beforeCreate((projectOwner) => {
    projectOwner.password = hashPassword(projectOwner.password)
  })

  return ProjectOwner;
};