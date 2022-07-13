import { useQuery } from '@apollo/client';
import { GET_ALL_JOBS } from '@config';
import { FlatList, Text, View } from 'react-native';

import { styles } from './styles';

export const JobGroup = () => {
  const { data } = useQuery(GET_ALL_JOBS);

  const renderItem = ({ item, index }: any) => (
    <Text key={index}>{item?.title}</Text>
  );

  const keyExtractor = (_item: any, index: number) => String(index);

  return (
    <>
      <View style={styles.categoryContainer}>
        <FlatList
          data={data?.items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};
