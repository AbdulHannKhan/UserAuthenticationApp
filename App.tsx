import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { toastConfig } from './src/Config/toastConfig';
import { AuthProvider } from './src/Context/AuthContext';
import { useNetworkMonitor } from './src/Hooks/useNetworkMonitor';
import { AppNavigator } from './src/Navigation/AppNavigator';

function App(): React.JSX.Element {
  useNetworkMonitor();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
      <Toast config={toastConfig} visibilityTime={3000} topOffset={50} />
    </SafeAreaProvider>
  );
}

export default App;
