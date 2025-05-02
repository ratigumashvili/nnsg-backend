'use strict';

/**
 * habitat router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::habitat.habitat');
