import { CMSSkillCategory } from '../markdown/skills';
import { cmsClient, renderToStaticMarkup } from './common';

export const prismicGetSkillCategories = async (): Promise<
  CMSSkillCategory[]
> => {
  const document = await cmsClient.getByType('skills', {
    orderings: { field: 'my.skills.level', direction: 'desc' },
  });
  return document.results.map((document) => ({
    attributes: { title: document.data.level_name },
    slug: document.id,
    html: renderToStaticMarkup(document.data.skills_list),
  }));
};
