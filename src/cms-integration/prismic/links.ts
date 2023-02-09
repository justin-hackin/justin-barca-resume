import { CMSLink } from '../markdown/links';
import prismic from 'prismic-javascript';
import { cmsClient } from './common';

export const prismicGetLinks = async (): Promise<CMSLink[]> => {
  const document = await cmsClient.query(
    prismic.Predicates.at('document.type', 'link'),
    {
      orderings: '[my.link.title]',
    },
  );

  return document.results.map((document) => ({
    id: document.id,
    title: document.data.title,
    iconName: document.data.icon_name,
    href: document.data.href,
  }));
};
