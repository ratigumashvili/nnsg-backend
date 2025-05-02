'use strict';

/**
 * user-submission service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-submission.user-submission');
