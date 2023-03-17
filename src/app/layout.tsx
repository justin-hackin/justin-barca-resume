import { Albert_Sans } from 'next/font/google';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import resumeConfig from '../../config/resumeConfig';
import { getCMSIntegration } from '../cms-integration';
import { getFullName } from '../helpers/utils';
import accents from '../tokens/accents';

// ICONS CONFIG
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

// STYLES
import '@fortawesome/fontawesome-svg-core/styles.css';
import { headers } from 'next/headers';
import './globals.css';

const albert = Albert_Sans({
  variable: '--font-albert',
  subsets: ['latin'],
});

const vercelURL = process.env.NEXT_PUBLIC_VERCEL_URL;
const dev = process.env.NODE_ENV === 'development';
const protocol = dev ? 'http' : 'https';

export const generateMetadata = async (): Promise<Metadata> => {
  const host = headers().get('host');
  const baseURL = `${protocol}://${vercelURL || host}`;
  const data = await getCMSIntegration();
  const fullName = getFullName(data.personalInformation);
  const siteName = `${fullName} Professional Résumé`;
  const title = `Résumé | ${fullName} | ${data.personalInformation.attributes.location}`;
  const description = `Professional résumé for ${fullName}.`;
  const ogImage = `${baseURL}/api/og?name=${encodeURIComponent(
    fullName,
  )}&theme=${resumeConfig.ogImageTheme}`;
  const images = {
    url: ogImage,
    height: 630,
    width: 1200,
  };

  return {
    applicationName: siteName,
    authors: { name: fullName },
    creator: fullName,
    description,
    generator: 'Next.js',
    keywords: ['resume', fullName, 'next.js', 'pdf'],
    openGraph: {
      type: 'profile',
      firstName: data.personalInformation.attributes.givenName,
      lastName: data.personalInformation.attributes.familyName,
      title,
      description,
      siteName,
      url: baseURL,
      images,
    },
    themeColor: accents[resumeConfig.accentColor].light[9],
    title,
    twitter: {
      site: siteName,
      creator: fullName,
      description,
      title,
      images,
    },
    viewport: 'width=device-width, initial-scale=1',
  };
};

// @ts-expect-error Server Component
const RootLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  return (
    <html lang="en" className={albert.variable}>
      <body className="selection:text-fuchsia-900 bg-neutral-light-1 text-neutral-light-12 selection:bg-accent-light-transparent dark:bg-neutral-dark-1 dark:text-neutral-dark-12 dark:selection:bg-accent-dark-transparent">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
