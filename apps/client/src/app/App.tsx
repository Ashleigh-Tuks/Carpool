/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
  HomePage,
  LoginPage,
  OnboardPage,
  SignUpPage,
  ForgotPasswordPage,
  ConfirmEmailPage,
  ResetPasswordPage,
} from '@carpool/client/pages';
import { Provider } from 'react-redux';
import { store } from '@carpool/client/store';
import { NativeBaseProvider } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { RootStore } from '@carpool/client/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home;
};

export type AuthStackParamList = {
  Onboard;
  Login;
  SignUp;
  ForgotPassword;
  ConfirmEmail;
  ResetPassword;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const navTheme = DefaultTheme;
navTheme.colors.background = '#fff';

const AppWrapper = () => {
  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  return (
    <NavigationContainer theme={navTheme}>
      {user && user.token !== '' ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen name="Home" component={HomePage} />
        </Tab.Navigator>
      ) : (
        <AuthStack.Navigator
          initialRouteName="Onboard"
          screenOptions={{
            headerShown: false,
          }}
        >
          <AuthStack.Screen name="Onboard" component={OnboardPage} />
          <AuthStack.Screen name="Login" component={LoginPage} />
          <AuthStack.Screen name="SignUp" component={SignUpPage} />
          <AuthStack.Screen
            name="ForgotPassword"
            component={ForgotPasswordPage}
          />
          <AuthStack.Screen name="ConfirmEmail" component={ConfirmEmailPage} />
          <AuthStack.Screen
            name="ResetPassword"
            component={ResetPasswordPage}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export const App = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
