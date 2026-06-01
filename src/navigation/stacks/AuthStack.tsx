import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import WelcomeScreen from "../../screens/auth/WelcomeScreen";
import LoginScreen from "../../screens/auth/LoginScreen";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
import NewPasswordScreen from "../../screens/auth/NewPasswordScreen";
import VerifyCodeScreen from "../../screens/auth/VerifyCodeScreen";

const Stack = createNativeStackNavigator();

type AuthStackProps = {
  initialRouteName?: "Welcome" | "Login";
};

export default function AuthStack({ initialRouteName = "Welcome" }: AuthStackProps) {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
