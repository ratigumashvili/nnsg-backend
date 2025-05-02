'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/export-coordinates/species',
      handler: 'export.species',
      config: {
        auth: false,
      },
    },
  ],
};
