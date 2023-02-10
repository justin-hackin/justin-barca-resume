import { CMSAchievement } from '../markdown/achievements';

import { cmsClient } from './common';
import { asHTML } from '@prismicio/helpers';

export const prismicGetAchievements = async (): Promise<CMSAchievement[]> => {
  const document = await cmsClient.getByType('educational_experience', {
    orderings: [
      {
        field: 'my.educational_experience.year',
        direction: 'desc',
      },
      {
        field: 'my.educational_experience.achievement_title',
      },
    ],
  });
  return document.results.map(({ id, data }) => ({
    slug: id,
    attributes: {
      achievement: data.achievement_title,
      completionYear: data.year,
      institution: data.organization_name,
    },
    html: asHTML(data.achievement_description),
  }));
};
