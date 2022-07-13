import { colors } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
  },
  errorText: {
    color: colors.red,
  },
  tab: {
    padding: 8,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  tabText: {
    color: colors.white,
  },
  categoryContainer: {
    backgroundColor: colors.black,
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  searchBar: { borderRadius: 0 },
});
