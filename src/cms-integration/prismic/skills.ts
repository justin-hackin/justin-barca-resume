import prismic from 'prismic-javascript';
import { CMSSkillCategory } from '../markdown/skills';
import { cmsClient, renderToStaticMarkup } from './common';

export const prismicGetSkillCategories = async (): Promise<
  CMSSkillCategory[]
> => {
  const document = await cmsClient.query(
    prismic.Predicates.at('document.type', 'skills'),
    {
      orderings: '[my.skills.level desc]',
    },
  );
  const skills = document.results.map((document) => ({
    attributes: { title: document.data.level_name },
    slug: document.id,
    html: renderToStaticMarkup(document.data.skills_list),
  }));
  return skills;
};
