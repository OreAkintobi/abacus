import { useQuery } from '@apollo/client';
import { GET_ALL_JOBS } from '@config';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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

  const handleMore = () => console.log('Shown more');

  const renderItem = ({ item, index }: any) => (
    <Text key={index}>{item?.title}</Text>
  );

  const keyExtractor = (_item: any, index: number) => String(index);

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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color="black" size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Title" />
        <Appbar.Action icon="magnify" onPress={handleShowSearchBar} />
        <Appbar.Action icon="dots-vertical" onPress={handleMore} />
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
          data={data?.items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};
