import { CMSAchievement } from '../markdown/achievements';
import prismic from 'prismic-javascript';

import { cmsClient, renderToStaticMarkup } from './common';

export const prismicGetAchievements = async (): Promise<CMSAchievement[]> => {
  const document = await cmsClient.query(
    prismic.Predicates.at('document.type', 'educational_experience'),
    {
      orderings:
        '[my.educational_experience.year desc, my.educational_experiencce.achievement_title]',
    },
  );
  return Promise.all(
    document.results.map(async ({ id, data }) => ({
      slug: id,
      attributes: {
        achievement: data.achievement_title,
        completionYear: data.year,
        institution: data.organization_name,
      },
      html: renderToStaticMarkup(data.achievement_description),
    })),
  );
};
