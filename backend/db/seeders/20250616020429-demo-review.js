'use strict';
const { Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        id: 1,
        spotId: 1,
        userId: 2,
        review: "Aurora Ridge exceeded all expectations! The cabin's modern amenities paired with the wilderness setting created the perfect balance. We saw the northern lights three nights in a row from the hot tub. Sarah was incredibly responsive and provided excellent local recommendations.",
        stars: 5,
      },
      {
        id: 2,
        spotId: 2,
        userId: 3,
        review: "The vineyard estate is absolutely stunning. The infinity pool overlooking the valley was our favorite spot for morning coffee. The wine cellar tour was a delightful surprise, and the kitchen had everything we needed for cooking with local ingredients.",
        stars: 5,
      },
      {
        id: 3,
        spotId: 3,
        userId: 1,
        review: "Perfect development environment in Atlanta's tech district. The workspace setup is incredibly productive with dual 4K monitors and ergonomic furniture. High-speed fiber internet made our team collaboration seamless throughout our coding sprint.",
        stars: 5,
      },
      {
        id: 4,
        spotId: 5,
        userId: 2,
        review: "The penthouse views of Nashville are unbeatable! We could hear live music drifting up from Broadway, and the rooftop terrace was perfect for evening drinks. The grand piano was a nice touch - my partner enjoyed playing while I cooked dinner.",
        stars: 5,
      },
      {
        id: 5,
        spotId: 7,
        userId: 3,
        review: "Warner Robins development facility exceeded expectations. The secure environment and military-grade infrastructure provided the perfect setting for our classified software project. TEMPEST-compliant workstations were exactly what we needed.",
        stars: 4,
      },
      {
        id: 6,
        spotId: 1,
        userId: 3,
        review: "Second time staying at Aurora Ridge and it's just as magical. The fireplace kept us cozy during a snowstorm, and we spent hours watching wildlife from the deck. The location is remote enough to feel secluded but close enough to Anchorage for supplies.",
        stars: 4,
      },
      {
        id: 7,
        spotId: 2,
        userId: 1,
        review: "Hillside Vineyard Estate is pure luxury. The master suite with valley views was incredibly romantic, and we loved the private wine tastings on the terrace. The chef's kitchen inspired us to try new recipes with local produce from nearby farms.",
        stars: 5,
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 5, 7] }
    }, {});
  }
};