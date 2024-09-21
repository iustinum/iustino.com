import type { Schema, Attribute } from '@strapi/strapi';

export interface PrimitivesTextBlock extends Schema.Component {
  collectionName: 'components_primitives_text_blocks';
  info: {
    displayName: 'Text Block';
    description: '';
  };
  attributes: {
    content: Attribute.RichText;
  };
}

export interface PrimitivesImage extends Schema.Component {
  collectionName: 'components_primitives_images';
  info: {
    displayName: 'Image';
    description: '';
  };
  attributes: {
    content: Attribute.Media<'images'>;
    caption: Attribute.String;
  };
}

export interface PrimitivesCode extends Schema.Component {
  collectionName: 'components_primitives_codes';
  info: {
    displayName: 'Code';
    description: '';
  };
  attributes: {
    content: Attribute.RichText;
  };
}

export interface CompositesImageGrid extends Schema.Component {
  collectionName: 'components_composites_image_grids';
  info: {
    displayName: 'Image Grid';
    description: '';
  };
  attributes: {
    images: Attribute.Component<'primitives.image', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'primitives.text-block': PrimitivesTextBlock;
      'primitives.image': PrimitivesImage;
      'primitives.code': PrimitivesCode;
      'composites.image-grid': CompositesImageGrid;
    }
  }
}
