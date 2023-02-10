import * as SplashScreen from 'expo-splash-screen';

import {useCallback, useEffect, useState} from 'react';

import Icons from '../src/utils/Icons';
import RootProvider from '../src/providers';
import { Slot } from 'expo-router';
import {View} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {useAssets} from 'expo-asset';
import {useFonts} from 'expo-font';
import StatusBarBrightness from 'dooboo-ui/components/StatusbarBrightness';

SplashScreen.preventAutoHideAsync();

function App(): React.ReactElement | null {
  const [fontsLoaded] = useFonts({
    IcoMoon: require('dooboo-ui/components/Icon/doobooui.ttf'),
  });

  const [assets] = useAssets(Icons);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async (): Promise<void> => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    if (assets && fontsLoaded) {
      SplashScreen.hideAsync();
    }

    prepare();
  }, [assets, fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{flex: 1, flexDirection: 'column'}}
      onLayout={onLayoutRootView}
    >
      <StatusBarBrightness />
      <Slot />
    </View>
  );
}

function ProviderWrapper(): React.ReactElement {
  return (
    <RootProvider>
      <App />
    </RootProvider>
  );
}

export default gestureHandlerRootHOC(ProviderWrapper);
