import { View } from 'react-native';
import { Text } from 'react-native-paper';

import styles from './styles';

interface BottomItemProps {
  title: string;
  isExpired?: boolean;
}

export const BottomTab = ({ title, isExpired = false }: BottomItemProps) => {
  const containerStyle = isExpired
    ? [styles.container, { backgroundColor: 'red' }]
    : styles.container;

  return (
    <View style={containerStyle}>
      <Text style={styles.jobText}>{title}</Text>
    </View>
  );
};
