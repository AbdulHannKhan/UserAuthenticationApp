import { useCallback, useMemo, useState } from 'react';

import { useAuth } from '../../../Context/AuthContext';
import { HomeControllerViewModel } from '../../../Types/controllers';

export function useHomeController(): HomeControllerViewModel {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const userRows = useMemo(() => [
    { label: 'Name', value: user?.name ?? '-' },
    { label: 'Email', value: user?.email ?? '-' },
  ], [user?.name, user?.email]);

  const handleLogout = useCallback(async (): Promise<void> => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  }, [logout]);

  return {
    userRows,
    isLoggingOut,
    handleLogout,
  };
}
