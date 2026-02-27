import { useCallback, useState } from 'react';

import { useAuth } from '../../../Context/AuthContext';
import { HomeControllerViewModel } from '../../../Types/controllers';

export function useHomeController(): HomeControllerViewModel {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const handleLogout = useCallback(async (): Promise<void> => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  }, [logout]);

  return {
    user,
    isLoggingOut,
    handleLogout,
  };
}
