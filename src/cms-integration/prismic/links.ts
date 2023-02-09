import { CMSLink } from '../markdown/links';
import prismic from 'prismic-javascript';
import { cmsClient } from './common';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';

const iconNameToIcon = {
  github: faGithub,
  twitter: faTwitter,
  linkedin: faLinkedin,
};

export const prismicGetLinks = async (): Promise<CMSLink[]> => {
  const document = await cmsClient.query(
    prismic.Predicates.at('document.type', 'link'),
    {
      orderings: '[my.link.title]',
    },
  );

  return document.results.map((document) => ({
    id: document.id,
    title: document.data.title,
    icon: iconNameToIcon[document.data.icon_name],
    href: document.data.href.url,
  }));
};
