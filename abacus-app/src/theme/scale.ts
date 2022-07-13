import {
  heightPercentageToDP as hp2dp,
  widthPercentageToDP as wp2dp,
} from 'react-native-responsive-screen';

const GUIDELINE_BASE_WIDTH = 375;
const GUIDELINE_BASE_HEIGHT = 812;

/**
 * Width-Percentage
 * Converts width dimension to percentage
 * 375, 812 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const scaleWP = (dimension: number) => {
  return wp2dp((dimension / GUIDELINE_BASE_WIDTH) * 100);
};

/**
 * Height-Percentage
 * Converts width dimension to percentage
 * * 375, 812 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const scaleHP = (dimension: number) => {
  return hp2dp((dimension / GUIDELINE_BASE_HEIGHT) * 100);
};

export const scaleArray = ([top, right, bottom, left]: number[]) =>
  `${scaleHP(top)}px ${scaleWP(right)}px ${scaleHP(bottom)}px ${scaleWP(
    left,
  )}px`;

export const scaleVerticalHorizontal = ([vertical, horizontal]: number[]) =>
  `${scaleHP(vertical)}px ${scaleWP(horizontal)}px`;
