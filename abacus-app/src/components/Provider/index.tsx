import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { API_URL } from '@env';
import { StatusBar } from 'expo-status-bar';
import { PropsWithChildren } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export const WithProviders = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <StatusBar style="dark" />
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </PaperProvider>
    </ApolloProvider>
  );
};
