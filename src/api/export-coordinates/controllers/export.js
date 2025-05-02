'use strict';

const Papa = require('papaparse');

module.exports = {
  async species(ctx) {
    try {
      const species = await strapi.entityService.findMany('api::specie.specie', {
        fields: ['documentId', "name"],
        populate: {
          places: {
            fields: ['coordinates', 'title',],
          },
        },
        pagination: { pageSize: -1 },
      });

      const rows = []

      species.forEach((item) => {
        item.places.forEach((place) => {

          const [lat, lon] = place.coordinates
            ? place.coordinates.split(',').map((c) => c.trim())
            : [null, null];

          rows.push({
            name: item.name,
            placeName: place.title,
            latitude: lat,
            longitude: lon,
          });
        });
      });

      const csv = Papa.unparse(rows);

      ctx.set('Content-Disposition', 'attachment; filename=species-coordinates.csv');
      ctx.set('Content-Type', 'text/csv');
      ctx.body = csv;
    } catch (error) {
      console.error('CSV export error:', error);
      ctx.throw(500, 'Failed to export species coordinates as CSV');
    }
  },
};
