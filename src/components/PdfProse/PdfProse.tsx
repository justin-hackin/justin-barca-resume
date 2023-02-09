import { PrismicRichText } from '../../cms-integration/prismic/common';
import { RichText } from 'prismic-reactjs';
import { HTMLSource } from '../../cms-integration/getCMSIntegration';
import { HtmlProps } from 'react-pdf-html/dist/Html';
import Html from 'react-pdf-html';

type HtmlProseProps = {
  children: HTMLSource;
} & Omit<HtmlProps, 'children'>;

// TODO: dedupe
const isPrismicRichText = (thing: any): thing is PrismicRichText => {
  return typeof thing !== 'string';
};

const PdfProse: React.FC<HtmlProseProps> = ({ children, ...htmlProps }) => {
  const isPrismic = isPrismicRichText(children);

  return isPrismic ? (
    <RichText render={children} />
  ) : (
    <Html {...htmlProps}>{children}</Html>
  );
};

export default PdfProse;
