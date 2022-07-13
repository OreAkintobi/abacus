import { useQuery } from '@apollo/client';
import { GET_ALL_JOBS } from '@config';
import { colors } from '@theme';
import { I_Job } from '@types';
import { getMonthAndYear } from '@utils';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import { Text } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { JobGroup } from './JobGroup';
import { styles } from './styles';

export const JobsListScreen = () => {
  const { data, loading, error } = useQuery(GET_ALL_JOBS);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchbarVisible, setSearchbarVisible] = useState(false);

  const currentHeight = useSharedValue(0);
  const currentOpacity = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return { height: currentHeight.value, opacity: currentOpacity.value };
  });

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const handleShowSearchBar = () => setSearchbarVisible(!searchbarVisible);

  const renderItem = ({ item, index }: any) => (
    <JobGroup key={index} data={item} />
  );

  const keyExtractor = (_item: any, index: number) => String(index);

  const filteredJobs = useMemo(() => {
    const jobs = (data?.items ?? []).filter(
      (job: I_Job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return jobs as I_Job[];
  }, [data?.items, searchQuery]);

  const jobs = useMemo(() => {
    // create copy of data?.items and sort by date
    const jobsList = filteredJobs.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    });

    const categories: { [key: string]: I_Job[] } = {};

    // sort jobsList into categories by date
    jobsList.forEach(jobListItem => {
      const key = `${getMonthAndYear(jobListItem.createdAt)}`;

      if (!categories[key]) {
        categories[key] = [];
      }

      categories[key].push(jobListItem);
    });

    // if (searchQuery.length > 0) {
    //   return data?.jobs?.filter((job: any) => {
    //     return job.title.toLowerCase().includes(searchQuery.toLowerCase());
    //   });
    // }
    // return data?.jobs;

    // console.log('CATSS =>', categories);
    return categories;
  }, [filteredJobs]);

  useEffect(() => {
    if (searchbarVisible) {
      currentHeight.value = withTiming(60, { duration: 500 });
      currentOpacity.value = withTiming(1, { duration: 900 });
    } else {
      currentOpacity.value = withTiming(0, { duration: 200 });
      currentHeight.value = withTiming(0, { duration: 700 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchbarVisible]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          animating={true}
          color={colors.lightGray}
          size="large"
        />
      ) : error ? (
        <Text style={styles.errorText}>{error?.message}</Text>
      ) : (
        <>
          <Appbar.Header>
            <Appbar.Content title="Title" />
            <Appbar.Action icon="magnify" onPress={handleShowSearchBar} />
          </Appbar.Header>

          <Animated.View style={style}>
            <Searchbar
              onChangeText={onChangeSearch}
              placeholder="Search"
              style={styles.searchBar}
              value={searchQuery}
            />
          </Animated.View>

          <View style={styles.categoryContainer}>
            <FlatList
              data={Object.values(jobs)}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}
    </View>
  );
};
