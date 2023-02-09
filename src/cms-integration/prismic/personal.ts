import { CMSPersonalInformation } from '../markdown/personal';
import { cmsClient, renderToStaticMarkup } from './common';

export const prismicGetPersonalInformation =
  async (): Promise<CMSPersonalInformation> => {
    const { data } = await cmsClient.getSingle('personal_information', {});
    return {
      attributes: {
        familyName: data.family_name,
        givenName: data.given_name,
        location: data.location,
      },
      html: renderToStaticMarkup(data.about_me_description),
    };
  };
