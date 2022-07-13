import { useQuery } from '@apollo/client';
import { GET_ALL_JOBS } from '@config';
import { colors } from '@theme';
import { I_Job } from '@types';
import { getMonthAndYear } from '@utils';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
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

  const [filter, setFilter] = useState([
    'Remote',
    'Relocate',
    'Internal',
    'External',
  ]);

  const currentHeight = useSharedValue(0);
  const currentOpacity = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return { height: currentHeight.value, opacity: currentOpacity.value };
  });

  const filterTabs = ['Remote', 'Relocate', 'Internal', 'External'];

  const onChangeSearch = (query: string) => setSearchQuery(query);
  const handleShowSearchBar = () => setSearchbarVisible(!searchbarVisible);

  const updateFilters = (tag: string) => {
    setFilter(prevState => {
      let newState = [...prevState];
      if (newState.includes(tag)) {
        newState = newState.filter((item: string) => item !== tag);
      } else {
        newState.push(tag);
      }
      return newState;
    });
  };

  const showFilteredJobs = useMemo(() => {
    // update displayed jobs based on filter
    return (data?.items ?? [])
      .filter(
        (job: I_Job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.companyName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .filter((job: I_Job) => {
        return filter.includes(job.relocate) && filter.includes(job.area);
      }) as I_Job[];
  }, [data?.items, filter, searchQuery]);

  const renderItem = ({ item, index }: any) => (
    <JobGroup key={index} data={item} />
  );
  const keyExtractor = (_item: any, index: number) => String(index);

  const jobs = useMemo(() => {
    const jobsList = showFilteredJobs.sort((a, b) => {
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

    return categories;
  }, [showFilteredJobs]);

  useEffect(() => {
    if (searchbarVisible) {
      currentHeight.value = withTiming(100, { duration: 500 });
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
            <ScrollView horizontal>
              {filterTabs.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    updateFilters(tab);
                  }}
                  style={[
                    styles.tab,
                    {
                      backgroundColor: filter.includes(tab)
                        ? colors.blue
                        : undefined,
                    },
                  ]}
                >
                  <Text style={styles.tabText}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
