'use strict';

const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        id: 1,
        ownerId: 1,
        address: '1234 Peachtree Street',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'United States',
        lat: 33.7490,
        lng: -84.3880,
        name: 'Atlanta Downtown Loft',
        description: 'Tech-forward development workspace in Atlanta\'s innovation district. Features: 1Gbps fiber internet, dual 4K monitors, Herman Miller Aeron chairs, height-adjustable standing desks, mechanical keyboards, and collaborative coding areas with 75" 4K displays for dev teams.',
        price: 185.00
      },
      {
        id: 2,
        ownerId: 2,
        address: '5678 Savannah River Road',
        city: 'Savannah',
        state: 'Georgia',
        country: 'United States',
        lat: 32.0835,
        lng: -81.0998,
        name: 'Historic Savannah Manor',
        description: 'Historic coding retreat in Savannah with vintage charm meets modern tech. Specs: 500Mbps symmetrical fiber, ergonomic workstations with lumbar support, blue light filtering monitors, dedicated server room with 24/7 cooling, backup power systems, and acoustic panels for focused coding.',
        price: 225.00
      },
      {
        id: 3,
        ownerId: 3,
        address: '9012 Augusta National Drive',
        city: 'Augusta',
        state: 'Georgia',
        country: 'United States',
        lat: 33.4735,
        lng: -82.0105,
        name: 'Augusta Golf Resort',
        description: 'Premium development lab near Augusta with enterprise-grade infrastructure. Equipment: 10Gbps enterprise fiber, multi-monitor setups (3x27" 1440p), ergonomic sit-stand workstations, mechanical keyboards with tactile switches, enterprise-grade servers, and climate-controlled environment for optimal performance.',
        price: 295.00
      },
      {
        id: 4,
        ownerId: 1,
        address: '3456 Columbus Square',
        city: 'Columbus',
        state: 'Georgia',
        country: 'United States',
        lat: 32.4609,
        lng: -84.9877,
        name: 'Columbus Riverfront Retreat',
        description: 'Riverside coding sanctuary in Columbus with natural inspiration for creative development. Features: 300Mbps fiber, ergonomic mesh chairs with adjustable armrests, 27" curved monitors, wireless charging stations, noise-canceling environment, and natural lighting with circadian rhythm LED supplements.',
        price: 165.00
      },
      {
        id: 5,
        ownerId: 2,
        address: '7890 Macon Heritage Lane',
        city: 'Macon',
        state: 'Georgia',
        country: 'United States',
        lat: 32.8407,
        lng: -83.6324,
        name: 'Macon Heritage House',
        description: 'Heritage tech hub in Macon blending traditional architecture with cutting-edge development tools. Specs: 400Mbps fiber, vintage-inspired ergonomic furniture, dual monitor arms with full articulation, mechanical keyboards with custom keycaps, legacy system testing equipment, and temperature-controlled server closet.',
        price: 145.00
      },
      {
        id: 6,
        ownerId: 3,
        address: '2468 Valdosta Park Avenue',
        city: 'Valdosta',
        state: 'Georgia',
        country: 'United States',
        lat: 30.8327,
        lng: -83.2785,
        name: 'Valdosta Park Cottage',
        description: 'Compact development studio in Valdosta with efficient workspace design. Equipment: 250Mbps fiber, space-saving ergonomic workstations, ultrawide 34" curved monitors, compact mechanical keyboards, mobile device testing lab with various iOS/Android devices, and optimized lighting for extended coding sessions.',
        price: 125.00
      },
      {
        id: 7,
        ownerId: 1,
        address: '1357 Warner Robins Boulevard',
        city: 'Warner Robins',
        state: 'Georgia',
        country: 'United States',
        lat: 32.6130,
        lng: -83.6240,
        name: 'Warner Robins Family Home',
        description: 'Secure development facility in Warner Robins with military-grade security protocols. Features: Isolated 1Gbps network, TEMPEST-compliant workstations, biometric access controls, Faraday cage testing room, ergonomic security-cleared furniture, encrypted storage systems, and 24/7 surveillance monitoring.',
         price: 135.00
       },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};