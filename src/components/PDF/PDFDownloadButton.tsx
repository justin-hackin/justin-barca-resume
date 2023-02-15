'use client';
import { faFilePdf, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import ButtonLink from '../Button/ButtonLink';

interface PDFDownloadButtonProps {
  secret?: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ secret }) => {
  const [loading, setLoading] = useState(false);
  return (
    <ButtonLink
      href={secret ? `/api/pdf?secret=${secret}` : '/api/pdf'}
      size="lg"
      className="relative"
      onClick={() => {
        setLoading(true);
      }}
    >
      {loading && (
        <span className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
          <FontAwesomeIcon icon={faSpinner} spin />
        </span>
      )}
      <span className={loading ? 'invisible' : ''}>
        <FontAwesomeIcon className="mr-2" icon={faFilePdf} size="lg" />
        View or Download PDF
      </span>
    </ButtonLink>
  );
};

export default PDFDownloadButton;
