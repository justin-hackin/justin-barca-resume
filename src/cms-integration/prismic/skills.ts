import { CMSSkillCategory } from '../markdown/skills';
import { cmsClient } from './common';
import prismic from 'prismic-javascript';

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
    // NOTE: in new md setup, this is formatted text, but it is plaintext in my setup from previous version
    html: document.data.skills_list,
  }));
  return skills;
};
