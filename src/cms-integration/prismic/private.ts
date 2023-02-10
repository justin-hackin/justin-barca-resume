import { CMSPrivateInformation } from '../markdown/private';
import { cmsClient } from './common';
import { asHTML } from '@prismicio/helpers';
import {
  faEnvelopeSquare,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';

const stripParagraphHtmlSerializer = {
  paragraph: ({ children, key, type, node, text }) => `${children}`,
};

const iconNameToIcon = {
  'envelope-square': faEnvelopeSquare,
  'phone-alt': faPhoneAlt,
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
      icon: iconNameToIcon[data.icon_name],
    },
    html: asHTML(data.content, null, stripParagraphHtmlSerializer),
  }));
};
