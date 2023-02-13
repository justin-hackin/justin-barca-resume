import {
  faIdCard,
  faMapMarkerAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface PersonalMarkdownAttributes {
  location: string;
  familyName: string;
  givenName: string;
  title?: string;
  twitterUsername?: string;
}

export interface CMSPersonalInformation {
  attributes: PersonalMarkdownAttributes;
  html: string;
}

export interface PrivateInformationMarkdownAttributes {
  label: string;
  icon: IconDefinition;
}

export interface CMSPrivateInformation {
  attributes: PrivateInformationMarkdownAttributes;
  html: string;
  slug: string;
}

interface ContactInformationProps {
  personalInformation: CMSPersonalInformation;
  privateInformation?: CMSPrivateInformation[];
}

export const ContactInformation: React.FC<ContactInformationProps> = ({
  personalInformation,
  privateInformation,
}) => {
  const contactInfo: CMSPrivateInformation[] = [
    {
      slug: 'location',
      attributes: {
        label: 'Location',
        icon: faMapMarkerAlt,
      },
      html: personalInformation.attributes.location,
    },
    ...(privateInformation || []),
  ];
  return (
    <article>
      <SectionHeading icon={faIdCard} level={3} text="Contact Information" />

      <ul className="mt-2">
        {/* private access required */}
        {contactInfo?.map((infoField) => (
          <li className="mt-3" key={infoField.attributes.label}>
            <FontAwesomeIcon
              className={'mr-2'}
              icon={infoField.attributes.icon}
            />
            <strong
              className={'mr-0.5'}
            >{`${infoField.attributes.label}: `}</strong>
            <span dangerouslySetInnerHTML={{ __html: infoField.html }} />
          </li>
        ))}
      </ul>
    </article>
  );
};
