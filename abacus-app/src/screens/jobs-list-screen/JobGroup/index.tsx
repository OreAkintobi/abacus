import { JobItem } from '@components';
import { I_Job } from '@types';
import { getMonthAndYear, numberOfColumns } from '@utils';
import { FlatList } from 'react-native';
import { Text } from 'react-native-paper';

import { styles } from './styles';

interface IJobGroupProps {
  [key: string]: I_Job[];
}

export const JobGroup = ({ data }: IJobGroupProps) => {
  const renderItem = ({ item, index }: any) => (
    <JobItem key={index} job={item} />
  );

  const key = `${getMonthAndYear(data[0].createdAt)}`;

  const keyExtractor = (_item: any, index: number) => String(index);

  const renderHeader = <Text style={styles.headerText}>{key}</Text>;

  return (
    <FlatList
      data={Object.values(data)}
      keyExtractor={keyExtractor}
      ListHeaderComponent={renderHeader}
      numColumns={numberOfColumns}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};
