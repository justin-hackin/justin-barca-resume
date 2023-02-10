import { CMSPrivateInformation } from '../markdown/private';
import { cmsClient } from './common';
import { asHTML } from '@prismicio/helpers';

const stripParagraphHtmlSerializer = {
  paragraph: ({ children, key, type, node, text }) => `${children}`,
};

export const prismicGetPrivateInformation = async (): Promise<
  CMSPrivateInformation[]
> => {
  const document = await cmsClient.getByType('private_information', {
    orderings: { field: 'my.private_information.label' },
  });
  return document.results.map(({ id, data }) => ({
    slug: id,
    attributes: {
      label: data.label,
    },
    html: asHTML(data.content, null, stripParagraphHtmlSerializer),
  }));
};
