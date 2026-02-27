import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AuthContextType, User } from '../Types/auth';

const AUTH_USER_KEY = '@auth_user';
const REGISTERED_USERS_KEY = '@registered_users';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type SafeUser = Omit<User, 'password'>;

const stripPassword = (value: User): SafeUser => ({
  name: value.name,
  email: value.email,
});

const getRegisteredUsers = async (): Promise<User[]> => {
  const stored = await AsyncStorage.getItem(REGISTERED_USERS_KEY);
  if (!stored) {
    return [];
  }
  return JSON.parse(stored) as User[];
};

const saveRegisteredUsers = async (users: User[]): Promise<void> => {
  await AsyncStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const hydrateAuthState = async (): Promise<void> => {
      try {
        const storedUser = await AsyncStorage.getItem(AUTH_USER_KEY);
        if (!storedUser) {
          return;
        }
        const parsedUser = JSON.parse(storedUser) as SafeUser;
        setUser(parsedUser);
      } finally {
        setIsLoading(false);
      }
    };

    hydrateAuthState().catch(() => {
      setIsLoading(false);
    });
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    const users = await getRegisteredUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const matchedUser = users.find(
      u => u.email === normalizedEmail && u.password === password,
    );

    if (!matchedUser) {
      throw new Error('Invalid credentials.');
    }

    const authUser = stripPassword(matchedUser);
    setUser(authUser);
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string): Promise<void> => {
      const users = await getRegisteredUsers();
      const normalizedEmail = email.trim().toLowerCase();

      const emailExists = users.some(u => u.email === normalizedEmail);
      if (emailExists) {
        throw new Error('Email already exists.');
      }

      const newUser: User = {
        name: name.trim(),
        email: normalizedEmail,
        password,
      };

      users.push(newUser);
      await saveRegisteredUsers(users);

      const authUser = stripPassword(newUser);
      setUser(authUser);
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
    },
    [],
  );

  const logout = useCallback(async (): Promise<void> => {
    setUser(null);
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({ user, isLoading, login, signup, logout }),
    [user, isLoading, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}
