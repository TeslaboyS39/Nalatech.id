'use strict';
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let dataUsers = require('../data/users.json');
    let dataOwners = require('../data/owners.json');
    let dataProjects = require('../data/projects.json');
    let dataPosts = require('../data/posts.json');

    dataUsers.forEach(el => {
      el.password = hashPassword(el.password);
      el.createdAt = el.updatedAt = new Date();
    });

    dataOwners.forEach(el => {
      el.password = hashPassword(el.password);
      el.createdAt = el.updatedAt = new Date();
    });

    dataProjects.forEach(el => {
      el.createdAt = el.updatedAt = new Date();
    });

    dataPosts.forEach(el => {
      el.createdAt = el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Users", dataUsers, {});
    await queryInterface.bulkInsert("ProjectOwners", dataOwners, {});
    await queryInterface.bulkInsert("Projects", dataProjects, {});
    await queryInterface.bulkInsert("ForumPosts", dataPosts, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("ForumPosts", null, {});
    await queryInterface.bulkDelete("Projects", null, {});
    await queryInterface.bulkDelete("ProjectOwners", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  }
};
