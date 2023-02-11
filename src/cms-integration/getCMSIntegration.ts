import { CMSAchievement, getAchievements } from './markdown/achievements';
import { CMSHobbies, getHobbies } from './markdown/hobbies';
import { CMSLink, getLinks } from './markdown/links';
import {
  CMSPersonalInformation,
  getPersonalInformation,
} from './markdown/personal';
import { CMSPrivateInformation } from './markdown/private';
import {
  CMSProfessionalExperience,
  getProfessionalExperiences,
} from './markdown/professional';
import { CMSSkillCategory, getSkillCategories } from './markdown/skills';
import { prismicGetAchievements } from './prismic/achievements';
import { prismicGetHobbies } from './prismic/hobbies';
import { prismicGetLinks } from './prismic/links';
import { prismicGetPersonalInformation } from './prismic/personal';
import { prismicGetProfessionalExperiences } from './prismic/professional';
import { prismicGetSkillCategories } from './prismic/skills';

type CMS = 'markdown' | 'prismic';

export interface CMSData {
  achievements: CMSAchievement[];
  hobbies: CMSHobbies;
  links: CMSLink[];
  personalInformation: CMSPersonalInformation;
  privateInformation?: CMSPrivateInformation[];
  professional: CMSProfessionalExperience[];
  skills: CMSSkillCategory[];
}
export const getCMSIntegration = async (
  cms: CMS = process.env.NEXT_PUBLIC_CMS_INTEGRATION as CMS,
): Promise<CMSData> => {
  const isMarkdown = cms === 'markdown';
  return {
    achievements: await (isMarkdown
      ? getAchievements
      : prismicGetAchievements)(),
    hobbies: await (isMarkdown ? getHobbies : prismicGetHobbies)(),
    links: await (isMarkdown ? getLinks : prismicGetLinks)(),
    personalInformation: await (isMarkdown
      ? getPersonalInformation
      : prismicGetPersonalInformation)(),
    professional: await (isMarkdown
      ? getProfessionalExperiences
      : prismicGetProfessionalExperiences)(),
    skills: await (isMarkdown
      ? getSkillCategories
      : prismicGetSkillCategories)(),
  };
};
