import { countries } from '@assets';
import { I_Job } from '@types';
import moment from 'moment';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web' || width > 480;

export const numberOfColumns = isWeb ? 3 : 1;
export const tileSize = width / numberOfColumns - 16;

export * from './hooks';

export const getRelocationStatus = (relocateStatus: string) =>
  relocateStatus === 'RemoteRelocate'
    ? 'Remote, then Relocate'
    : relocateStatus;

export const getCountry = (flagCode: string) =>
  flagCode
    ? countries.filter(item => item.code === flagCode)[0]?.name
    : undefined;

export const getSalary = (job: I_Job) => {
  const num = new Intl.NumberFormat('en-GB', {
    maximumSignificantDigits: 2,
  }).format(job?.salaryFrom);
  const num2 = new Intl.NumberFormat('en-GB', {
    maximumSignificantDigits: 2,
  }).format(job?.salaryTo);

  return `${job?.currency} ${num} - ${num2}`;
};

export const getJobPostingTimeFromNow = (date: string) => {
  return moment(date).fromNow();
};

export const getMonthAndYear = (date: string) => {
  return moment(date).format('MMMM YYYY');
};
