import { cmsClient } from './common';
import { CMSProfessionalExperience } from '../markdown/professional';
import { asHTML } from '@prismicio/helpers';

const dateFormatMonthYear = (dateStr: string): string =>
  new Date(dateStr).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

export const prismicGetProfessionalExperiences = async (): Promise<
  CMSProfessionalExperience[]
> => {
  const document = await cmsClient.getByType('professional_experience', {
    orderings: [
      { field: 'my.professional_experience.is_current', direction: 'desc' },
      { field: 'my.professional_experience.end_date', direction: 'desc' },
    ], //'[my.professional_experience.is_current desc, my.professional_experience.end_date desc]',
  });
  const experiences = document.results.map(({ data, id }) => ({
    slug: id,
    attributes: {
      organization: data.organization_name,
      endDate: data.is_current ? undefined : dateFormatMonthYear(data.end_date),
      startDate: dateFormatMonthYear(data.start_date),
      title: data.position_title,
    },
    html: asHTML(data.position_description),
  }));
  return experiences;
};
