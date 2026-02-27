import NetInfo from '@react-native-community/netinfo';
import { useEffect, useRef } from 'react';
import Toast from 'react-native-toast-message';

const TOAST_ID = 'network-offline';

export function useNetworkMonitor(): void {
  const wasConnected = useRef(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const isConnected = state.isConnected && state.isInternetReachable !== false;

      if (!isConnected && wasConnected.current) {
        Toast.show({
          type: 'network',
          text1: 'No Internet Connection',
          text2: 'Please check your network settings',
          autoHide: false,
          position: 'top',
          props: { id: TOAST_ID },
        });
      }

      if (isConnected && !wasConnected.current) {
        Toast.hide();
        Toast.show({
          type: 'success',
          text1: 'Back Online',
          text2: 'Internet connection restored',
          visibilityTime: 2500,
        });
      }

      wasConnected.current = !!isConnected;
    });

    return unsubscribe;
  }, []);
}
