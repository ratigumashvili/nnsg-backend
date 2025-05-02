'use strict';

/**
 * kingdom service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::kingdom.kingdom');
