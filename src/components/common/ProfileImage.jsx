import React from 'react';
import MalePic from '../../../MalePic';
import FemalePic from '../../../FemalePic';
import OtherPic from '../../../OtherPic';
import EmptyPic from '../../../EmptyPic';

// Maps a gender value to its avatar SVG, so the picture updates the moment gender changes
const GENDER_IMAGE_MAP = {
  male: MalePic,
  female: FemalePic,
  other: OtherPic,
};

// Renders the avatar matching the given gender, falling back to an empty placeholder
const ProfileImage = (props) => {
  const { gender, size = 96, className = '' } = props;
  const Image = GENDER_IMAGE_MAP[gender] || EmptyPic;

  return <Image size={size} className={className} />;
}

export default ProfileImage;
