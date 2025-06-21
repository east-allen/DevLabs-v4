'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'dev01@user.io',
        username: 'Dev01User01',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'Dev01',
        lastName: 'User01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'dev02@user.io',
        username: 'Dev02User02',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Dev02',
        lastName: 'User02',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'dev03@user.io',
        username: 'Dev03User03',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Dev03',
        lastName: 'User03',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Dev01User01', 'Dev02User02', 'Dev03User03'] }
    }, {});
  }
};