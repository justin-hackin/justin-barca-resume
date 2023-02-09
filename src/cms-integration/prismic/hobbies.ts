import { cmsClient } from './common';
import { CMSHobbies } from '../markdown/hobbies';

export const prismicGetHobbies = async (): Promise<CMSHobbies> => {
  // TODO: remove duplicate call
  const { data } = await cmsClient.getSingle('personal_information', {});
  return {
    html: data.hobbies_and_interests,
  };
};
