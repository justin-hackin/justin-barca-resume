import { CMSPrivateInformation } from '../markdown/private';
import { cmsClient, renderToStaticMarkup } from './common';

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
    html: renderToStaticMarkup(data.content),
  }));
};
