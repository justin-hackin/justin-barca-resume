/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import React, { HTMLProps } from 'react';
import Html from 'react-pdf-html';
import { HtmlProps } from 'react-pdf-html/dist/Html';
import resumeConfig from '../../../config/resumeConfig';
import { CMSData } from '../../cms-integration';
import { getFullName } from '../../helpers/utils';
import accents from '../../tokens/accents';
import neutrals from '../../tokens/neutrals';
import { htmlRenderers } from './htmlRenderers';
import { BuildingColumns } from './Icons/BuildingColumns';
import { Calendar } from './Icons/Calendar';
import { CircleBriefcase } from './Icons/CircleBriefcase';
import { CircleCheck } from './Icons/CircleCheck';
import { CircleGraduationCap } from './Icons/CircleGraduationCap';
import { CircleIdCard } from './Icons/CircleIdCard';
import { CirclePaintbrush } from './Icons/CirclePaintbrush';
import { CircleUser } from './Icons/CircleUser';
import { Star } from './Icons/Star';

const CustomHtml = ({
  children,
  ...props
}: Omit<HTMLProps<any>, 'children'> & { children: string }) => {
  return (
    <Html {...props} renderers={htmlRenderers}>
      {children}
    </Html>
  );
};

const accentColor = accents[resumeConfig.accentColor].light;
const neutralColor = neutrals[resumeConfig.neutralColor].light;

const domain = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';
const fontPath = `${domain}/fonts`;

const hyphenationCallback = (word) => {
  // don't hyphenate
  return [word];
};

Font.registerHyphenationCallback(hyphenationCallback);

Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});

const fontSizes = {
  xl: 20,
  l: 18,
  m: 14,
  s: 13,
  xs: 12,
  xxs: 10,
};

const spacers = {
  1: '6px',
  2: '8px',
  3: '10px',
  4: '12px',
  5: '14px',
  6: '16px',
};

const styles = StyleSheet.create({
  page: {
    alignItems: 'stretch',
    backgroundColor: neutralColor[1],
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    fontSize: fontSizes.xxs,
    justifyContent: 'flex-start',
    lineHeight: 1.3,
  },
  sidebar: {
    alignSelf: 'stretch',
    backgroundColor: neutralColor[3],
    display: 'flex',
    color: neutralColor[12],
    flexBasis: '30%',
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 1,
  },
  sidebarContent: { padding: spacers[4] },
  header: {
    backgroundColor: accentColor[10],
    color: accentColor.contrast,
    padding: `${spacers[6]} ${spacers[4]}`,
    textAlign: 'center',
  },
  headerTitle: { fontSize: fontSizes.xl, fontWeight: 700 },
  headerSubtitle: { fontSize: fontSizes.m, fontWeight: 700 },
  main: {
    alignSelf: 'stretch',
    display: 'flex',
    flexBasis: '70%',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    padding: spacers[4],
  },
  section: { marginBottom: spacers[4] },
  sectionHeading: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: fontSizes.m,
    fontWeight: 700,
    gap: spacers[1],
  },
  sectionHeadingNonHTML: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: fontSizes.m,
    fontWeight: 700,
    gap: spacers[1],
    marginBottom: spacers[1],
  },
  sectionHeadingIcon: {
    height: fontSizes.m,
    marginRight: spacers[1],
    width: fontSizes.m,
  },
  sectionHeadingStars: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  sectionHeadingStar: {
    height: fontSizes.xxs,
    width: 'auto',
  },
  sectionParagraph: { fontWeight: 400, margin: 0 },
  sectionUl: { margin: 0 },
  itemHeading: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: fontSizes.s,
    fontWeight: 700,
    gap: spacers[1],
    marginBottom: spacers[1],
    marginTop: spacers[5],
  },
  itemSubheadingRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: spacers[1],
    marginBottom: spacers[1],
  },
  itemSubheading: {
    fontSize: fontSizes.xxs,
    fontStyle: 'italic',
  },
  experienceSubtitle: {
    fontWeight: 'bold',
  },
  experienceSubtitleRole: {
    textDecoration: 'underline',
  },
  bold: { fontWeight: 700 },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  flexRow: { alignItems: 'center', display: 'flex', flexDirection: 'row' },
  flexRowAlignStart: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
  },
  a: {
    color: accentColor[11],
    textDecoration: 'underline',
  },
});

const htmlProps: Omit<HtmlProps, 'children'> = {
  renderers: htmlRenderers,
  style: { fontSize: fontSizes.xxs },

  stylesheet: {
    a: styles.a,
    p: styles.sectionParagraph,
    ul: styles.sectionUl,
  },
};

const hobbiesHtmlProps = {
  ...htmlProps,
  stylesheet: {
    ...htmlProps.stylesheet,
    h4: { marginBottom: -10 },
    h6: { marginBottom: 0 },
  },
};

const PDF: React.FC<CMSData> = (props) => {
  const {
    achievements,
    hobbies,
    personalInformation,
    privateInformation,
    professional,
    skills,
  } = props;
  const fullName = getFullName(personalInformation);
  const year = new Date().getFullYear();
  let minPresenceAhead = 100;
  return (
    // @ts-ignore
    <Document author={fullName} title={`Resume for ${fullName}, ${year}`}>
      {/* @ts-ignore */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{fullName}</Text>
            <Text style={styles.headerSubtitle}>
              {personalInformation.attributes.title}
            </Text>
          </View>
          <View style={styles.sidebarContent}>
            <View style={styles.section}>
              <View style={styles.sectionHeadingNonHTML}>
                <CircleUser size={fontSizes.m} />
                <Text>About Me</Text>
              </View>
              <CustomHtml {...htmlProps}>{personalInformation.html}</CustomHtml>
            </View>
            <View style={styles.section}>
              <View style={styles.sectionHeadingNonHTML}>
                <CircleIdCard size={fontSizes.m} />
                <Text>Contact Information</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.bold}>Location:</Text>
                <Text>&nbsp;{personalInformation.attributes.location}</Text>
              </View>
              {privateInformation?.map((privateField) => (
                <View key={privateField.slug} style={styles.flexRowAlignStart}>
                  <Text style={styles.bold}>
                    {privateField.attributes.label}:&nbsp;
                  </Text>
                  <CustomHtml {...htmlProps}>{privateField.html}</CustomHtml>
                </View>
              ))}
            </View>
            <View style={styles.section}>
              <View style={styles.sectionHeading}>
                <CircleCheck size={fontSizes.m} />
                <Text>Skills &amp; Expertise</Text>
              </View>
              {skills.map((skill, skillIndex) => (
                <View key={skill.slug}>
                  <View style={styles.itemHeading}>
                    <View style={styles.sectionHeadingStars}>
                      {Array.from(Array(skills.length - skillIndex)).map(
                        (star, starIndex) => (
                          <Star key={starIndex} size={fontSizes.xxs} />
                        ),
                      )}
                    </View>
                    <Text style={styles.bold}>{skill.attributes.title}</Text>
                  </View>
                  <CustomHtml {...htmlProps}>{skill.html}</CustomHtml>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.section}>
            <View style={styles.sectionHeading}>
              <CircleBriefcase size={fontSizes.m} />
              <Text>Professional Experience</Text>
            </View>
            {professional.map((professionalExperience) => (
              <View
                style={styles.experienceSubtitle}
                key={professionalExperience.slug}
              >
                <View
                  style={styles.itemHeading}
                  minPresenceAhead={minPresenceAhead}
                >
                  <Text style={styles.experienceSubtitleRole}>
                    {professionalExperience.attributes.title}
                  </Text>
                  <Text>
                    at {professionalExperience.attributes.organization}
                  </Text>
                </View>
                <View style={styles.itemSubheadingRow}>
                  <Calendar size={fontSizes.xxs} />
                  <Text style={styles.itemSubheading}>
                    {professionalExperience.attributes.startDate}—
                    {professionalExperience.attributes.endDate
                      ? professionalExperience.attributes.endDate
                      : 'Current'}
                  </Text>
                </View>
                <CustomHtml {...htmlProps}>
                  {professionalExperience.html}
                </CustomHtml>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <View
              style={styles.sectionHeading}
              minPresenceAhead={minPresenceAhead}
            >
              <CircleGraduationCap size={fontSizes.m} />
              <Text>Achievements</Text>
            </View>
            {achievements.map((achievement) => (
              <View key={achievement.slug}>
                <View
                  style={styles.itemHeading}
                  minPresenceAhead={minPresenceAhead}
                >
                  <Text style={styles.bold}>
                    {achievement.attributes.achievement}
                  </Text>
                </View>
                <View style={styles.itemSubheadingRow}>
                  <BuildingColumns size={fontSizes.xxs} />
                  <Text style={styles.itemSubheading}>
                    {achievement.attributes.institution}
                  </Text>
                </View>
                <CustomHtml {...htmlProps}>{achievement.html}</CustomHtml>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <View
              style={styles.sectionHeading}
              minPresenceAhead={minPresenceAhead}
            >
              <CirclePaintbrush size={fontSizes.m} />
              <Text>Hobbies &amp; Interests</Text>
            </View>
            <CustomHtml {...hobbiesHtmlProps}>{hobbies.html}</CustomHtml>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDF;
