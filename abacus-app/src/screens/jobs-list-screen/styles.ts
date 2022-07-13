import { colors } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
  },
  categoryContainer: {
    backgroundColor: colors.black,
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  searchBar: { borderRadius: 0 },
});
