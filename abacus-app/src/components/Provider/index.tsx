import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { API_URL } from '@env';
import { fonts } from '@theme';
import { StatusBar } from 'expo-status-bar';
import { PropsWithChildren } from 'react';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

const fontConfig = {
  web: {
    regular: {
      fontFamily: fonts.roboto,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: fonts.roboto,
      fontWeight: 'normal',
    },
    light: {
      fontFamily: fonts.roboto,
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: fonts.roboto,
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: fonts.roboto,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: fonts.roboto,
      fontWeight: 'normal',
    },
    light: {
      fontFamily: fonts.roboto,
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: fonts.roboto,
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: fonts.roboto,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: fonts.roboto,
      fontWeight: 'normal',
    },
    light: {
      fontFamily: fonts.roboto,
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: fonts.roboto,
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig as any),
};

export const WithProviders = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <StatusBar style="dark" />
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </PaperProvider>
    </ApolloProvider>
  );
};
