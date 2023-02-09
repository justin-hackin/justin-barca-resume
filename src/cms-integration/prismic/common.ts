import prismic, { getEndpoint } from '@prismicio/client';
import { asHTML } from '@prismicio/helpers';

const { CMS_REPO_NAME, CMS_ACCESS_TOKEN } = process.env;
export const cmsClient = prismic.createClient(getEndpoint(CMS_REPO_NAME), {
  accessToken: CMS_ACCESS_TOKEN,
});
export const renderToStaticMarkup = function (thing) {
  return asHTML(thing);
};
