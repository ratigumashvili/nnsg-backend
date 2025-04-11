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

export interface SharedLegalDocs extends Struct.ComponentSchema {
  collectionName: 'components_shared_legal_docs';
  info: {
    displayName: 'Legal docs';
  };
  attributes: {
    date: Schema.Attribute.Component<'shared.custom-date', false>;
    description: Schema.Attribute.Text;
    docType: Schema.Attribute.String;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.custom-date': SharedCustomDate;
      'shared.legal-docs': SharedLegalDocs;
    }
  }
}
