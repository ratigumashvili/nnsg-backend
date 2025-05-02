import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCustomDate extends Struct.ComponentSchema {
  collectionName: 'components_shared_custom_dates';
  info: {
    displayName: 'Custom date';
  };
  attributes: {
    day: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 31;
          min: 1;
        },
        number
      >;
    month: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 12;
          min: 1;
        },
        number
      >;
    year: Schema.Attribute.BigInteger;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.custom-date': SharedCustomDate;
    }
  }
}
