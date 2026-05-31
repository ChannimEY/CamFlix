import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../../screens/auth/WelcomeScreen";
import LoginScreen from "../../screens/auth/LoginScreen";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
import NewPasswordScreen from "../../screens/auth/NewPasswordScreen";
import VerifyCodeScreen from "../../screens/auth/VerifyCodeScreen";

const AuthStack = createNativeStackNavigator({
  screens: {
    Welcome: {
      screen: WelcomeScreen,
      options: { headerShown: false },
    },
    Login: {
      screen: LoginScreen,
      options: { headerShown: false },
    },
    Register: {
      screen: RegisterScreen,
      options: { headerShown: false },
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      options: { headerShown: false },
    },
    NewPassword: NewPasswordScreen,
    VerifyCode: VerifyCodeScreen,
  },
});

export default AuthStack;