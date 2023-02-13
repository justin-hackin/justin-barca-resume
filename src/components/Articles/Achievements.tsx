import { faMortarBoard } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import AchievementItem from './AchievementItem';

export interface AchievementMarkdownAttributes {
  achievement: string;
  completionYear: number;
  institution: string;
}

export interface CMSAchievement {
  attributes: AchievementMarkdownAttributes;
  html: string;
  slug: string;
}

const Achievements: React.FC<{ achievements: CMSAchievement[] }> = ({
  achievements,
}) => {
  return (
    <article className="rounded-xl bg-neutral-light-3 py-12 dark:bg-neutral-dark-3">
      <div className="container">
        <div className="flex justify-center text-center">
          <SectionHeading icon={faMortarBoard} level={2} text="Achievements" />
        </div>

        {achievements.map((achievement) => (
          <AchievementItem key={achievement.slug} {...achievement} />
        ))}
      </div>
    </article>
  );
};

export default Achievements;
