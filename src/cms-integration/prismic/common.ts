import prismic from 'prismic-javascript';

const { CMS_ENDPOINT, CMS_KEY } = process.env;
const createClientOptions = (prismicAccessToken) => {
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  return {
    ...accessTokenOption,
  };
};

export const cmsClient = prismic.client(
  CMS_ENDPOINT,
  createClientOptions(CMS_KEY),
);
