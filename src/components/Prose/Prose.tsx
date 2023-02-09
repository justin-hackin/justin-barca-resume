import { PrismicRichText } from '../../cms-integration/prismic/common';
import { RichText } from 'prismic-reactjs';
import { HTMLSource } from '../../cms-integration/getCMSIntegration';
interface ProseProps {
  html: HTMLSource;
}

const baseClasses = 'prose prose-neutral dark:prose-invert max-w-none mt-2';

const anchorClasses =
  'prose-a:underline prose-a:decoration-accent-light-9 prose-a:decoration-solid prose-a:decoration-2 prose-a:underline-offset-2 hover:prose-a:decoration-inherit dark:prose-a:decoration-accent-dark-9';

const paragraphClasses = 'prose-p:mb-2 prose-p:mt-0 prose-p:leading-6';

const isPrismicRichText = (thing: any): thing is PrismicRichText => {
  return typeof thing !== 'string';
};

const Prose: React.FC<ProseProps> = ({ html }) => {
  const isPrismic = isPrismicRichText(html);

  return (
    <div
      className={`${baseClasses} ${anchorClasses} ${paragraphClasses}`}
      dangerouslySetInnerHTML={isPrismic ? null : { __html: html }}
    >
      {isPrismic ? <RichText render={html} /> : null}
    </div>
  );
};

export default Prose;
