import { Images } from '@assets';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';

export const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const cacheImages = (images: (string | number)[]) => {
    return images.map(async image => {
      if (typeof image === 'string') {
        return await Image.prefetch(image);
      } else {
        return await Asset.fromModule(image).downloadAsync();
      }
    });
  };

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load images
        cacheImages([Images.AdaptiveIcon, Images.AppLogo, Images.Splash]);

        // Load fonts
        await Font.loadAsync({
          roboto: require('@assets/fonts/Roboto-Regular.ttf'),
          robotoBold: require('@assets/fonts/Roboto-Bold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
};
