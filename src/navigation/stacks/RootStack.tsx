import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StaticParamList } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { View, ActivityIndicator } from "react-native";

import AuthStack from "./AuthStack";
import { BottomTab } from "../tabs/BottomTab";

const RootStack = createNativeStackNavigator({
  screens: {
    Auth: {
      screen: AuthStack,
      options: { headerShown: false },
    },
    Tab: {
      screen: BottomTab,
      options: { headerShown: false },
    },
  },
});

export { RootStack };

type RootStackParamList = StaticParamList<typeof RootStack>;
type AuthStackParamList = StaticParamList<typeof AuthStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList, AuthStackParamList {}
  }
}