import { cmsClient } from './common';
import { CMSHobbies } from '../markdown/hobbies';
import { asHTML } from '@prismicio/helpers';

export const prismicGetHobbies = async (): Promise<CMSHobbies> => {
  // TODO: remove duplicate call
  const { data } = await cmsClient.getSingle('personal_information', {});
  return {
    html: asHTML(data.hobbies_and_interests),
  };
};
