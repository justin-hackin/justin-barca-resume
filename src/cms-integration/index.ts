import { CMSHobbies, getHobbies } from './hobbies';
import { CMSLink, prismicGetLinks } from './links';
import { prismicGetPersonalInformation } from './personal';
import {
  CMSProfessionalExperience,
  prismicGetProfessionalExperiences,
} from './professional';
import { CMSSkillCategory, prismicGetSkillCategories } from './skills';
import {
  CMSPersonalInformation,
  CMSPrivateInformation,
} from '../components/Articles/ContactInformation';
import { CMSAchievement, getAchievements } from './achievements';

export interface CMSData {
  achievements: CMSAchievement[];
  hobbies: CMSHobbies;
  links: CMSLink[];
  personalInformation: CMSPersonalInformation;
  privateInformation?: CMSPrivateInformation[];
  professional: CMSProfessionalExperience[];
  skills: CMSSkillCategory[];
}
export const getCMSIntegration = async (): Promise<CMSData> => {
  return {
    achievements: await getAchievements(),
    hobbies: await getHobbies(),
    links: await prismicGetLinks(),
    personalInformation: await prismicGetPersonalInformation(),
    professional: await prismicGetProfessionalExperiences(),
    skills: await prismicGetSkillCategories(),
  };
};
