import { faIdCard, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { CMSPersonalInformation } from '../../cms-integration/markdown/personal';
import { CMSPrivateInformation } from '../../cms-integration/markdown/private';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
