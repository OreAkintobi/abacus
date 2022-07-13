import {StyleSheet} from 'react-native';
import {colors} from '../../theme';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 8,
    borderRadius: 2,
  },
  jobText: {
    fontSize: 8,
    color: colors.white,
  },
});

export default styles;
