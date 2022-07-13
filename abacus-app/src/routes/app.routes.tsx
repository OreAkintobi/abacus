// @ts-nocheck
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { JobsListScreen } from '@screens';

import { TAppRoutesStackParamList } from './types';

const Stack = createNativeStackNavigator<TAppRoutesStackParamList>();

export const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Award">
        <Stack.Screen
          component={JobsListScreen}
          name="Award"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
