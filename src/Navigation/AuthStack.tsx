import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Login } from '../Screens/Auth/Login';
import { Signup } from '../Screens/Auth/Signup';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
