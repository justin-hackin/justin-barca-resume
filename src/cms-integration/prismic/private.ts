import { CMSPrivateInformation } from '../markdown/private';
import { cmsClient, renderToStaticMarkup } from './common';
import prismic from 'prismic-javascript';

export const prismicGetPrivateInformation = async (): Promise<
  CMSPrivateInformation[]
> => {
  const document = await cmsClient.query(
    prismic.Predicates.at('document.type', 'private_information'),
    {
      orderings: '[my.private_information.label]',
    },
  );
  return Promise.all(
    document.results.map(async ({ id, data }) => ({
      slug: id,
      attributes: {
        label: data.label,
      },
      html: renderToStaticMarkup(data.content),
    })),
  );
};
