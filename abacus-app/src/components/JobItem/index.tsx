import { Images } from '@assets';
import { I_Job } from '@types';
import {
  getCountry,
  getJobPostingTimeFromNow,
  getRelocationStatus,
  tileSize,
} from '@utils';
import { memo } from 'react';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';

import { BottomTab } from '../BottomTab';

import styles from './styles';

interface JobItemProps {
  job: I_Job;
}

const JobItem = ({ job }: JobItemProps) => {
  return (
    <View style={[styles.touchableContainer, { width: tileSize }]}>
      <View key={job?.id} style={styles.jobItemContainer}>
        <View style={styles.jobImage}>
          <Image
            resizeMode="contain"
            source={Images.CompanyLogo}
            style={styles.imageStyle}
          />
        </View>

        <View style={styles.jobContentView}>
          <View style={styles.dataContainer}>
            <Text numberOfLines={1} style={styles.jobTitleText}>
              {job?.title}
            </Text>
          </View>
          <View style={styles.dataContainer}></View>
          <View style={styles.dataContainer}>
            <Text numberOfLines={1} style={styles.jobText}>
              {job?.companyName}
            </Text>
          </View>
          <View style={styles.dataContainer}>
            <Text numberOfLines={1} style={styles.jobText}>
              {job?.currency} {job?.salaryFrom} - {job?.salaryTo}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.bottomTabsContainer}>
          <BottomTab title={job?.area} />
          {getCountry(job?.flagCode) && (
            <BottomTab title={getCountry(job?.flagCode) || ''} />
          )}
          <BottomTab title={getRelocationStatus(job?.relocate)} />
        </View>

        <View style={styles.timeText}>
          <Text numberOfLines={1} style={[styles.jobText, styles.textCenter]}>
            {getJobPostingTimeFromNow(job?.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(JobItem);
