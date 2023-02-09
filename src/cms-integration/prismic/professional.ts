import { cmsClient, renderToStaticMarkup } from './common';
import { CMSProfessionalExperience } from '../markdown/professional';
import prismic from 'prismic-javascript';

const dateFormatMonthYear = (dateStr: string): string =>
  new Date(dateStr).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

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
      organization: data.organization_name,
      endDate: data.is_current ? undefined : dateFormatMonthYear(data.end_date),
      startDate: dateFormatMonthYear(data.start_date),
      title: data.position_title,
    },
    html: renderToStaticMarkup(data.position_description),
  }));
  return experiences;
};
