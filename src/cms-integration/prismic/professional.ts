import { cmsClient } from './common';
import { CMSProfessionalExperience } from '../markdown/professional';
import prismic from 'prismic-javascript';

export const prismicGetProfessionalExperiences = async (): Promise<
  CMSProfessionalExperience[]
> => {
  const document = await cmsClient.query(
    prismic.Predicates.at('document.type', 'professional_experience'),
    {
      orderings:
        '[my.professional_experience.is_current desc, my.professional_experience.end_date desc]',
    },
  );
  const experiences = document.results.map(({ data, id }) => ({
    slug: id,
    attributes: {
      organization: data.organization,
      endDate: data.is_current ? undefined : data.end_data,
      startDate: data.start_date,
      title: data.postition_title,
    },
    html: data.positionDescription,
  }));
  return experiences;
};
