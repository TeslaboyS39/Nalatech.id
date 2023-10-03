'use strict';
const { hashPassword } = require('../helpers/bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.ProjectOwner, {
        through: 'Transaction',
        foreignKey:"UserId"
      })
      User.belongsToMany(models.Project, {
        through: 'Contract',
        foreignKey:"UserId"
      })
      User.hasMany(models.ForumPost, { foreignKey: 'UserId'})
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Username must be unique"
      },
      validate: {
        notNull: {
          msg: 'Username is required'
        },
        notEmpty: {
          msg: "Username is required"
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
    role: {
      type: DataTypes.STRING,
      defaultValue: 'mitra'
    },
    profileUrl: DataTypes.STRING,
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
    status: {
      type: DataTypes.STRING,
      defaultValue: 'seeker'
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
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
  })

  return User;
};