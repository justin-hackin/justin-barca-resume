import { cmsClient } from './common';
import { asHTML } from '@prismicio/helpers';

export interface CMSHobbies {
  html: string;
}

export const getHobbies = async (): Promise<CMSHobbies> => {
  const { data } = await cmsClient.getSingle('personal_information', {});
  return {
    html: asHTML(data.hobbies_and_interests) || '',
  };
};
