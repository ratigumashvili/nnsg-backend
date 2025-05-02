'use strict';

/**
 * habitat service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::habitat.habitat');
