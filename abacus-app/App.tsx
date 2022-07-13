import { WithProviders } from '@components';
import { AppRoutes } from '@routes';
import { useCachedResources } from '@utils';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <WithProviders>
      <AppRoutes />
    </WithProviders>
  );
}
