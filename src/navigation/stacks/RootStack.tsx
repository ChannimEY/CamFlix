import React from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../../context/AuthContext";
import AuthStack from "./AuthStack";
import BottomTab from "../tabs/BottomTab";
import VerifyCodeScreen from "../../screens/auth/VerifyCodeScreen";

const RootStackNav = createNativeStackNavigator();

export default function RootStack() {
  const { token, isVerified, isLoading, authInitialRoute } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#121212", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#F2242A" />
      </View>
    );
  }

  if (!token) {
    return <AuthStack initialRouteName={authInitialRoute} />;
  }

  if (!isVerified) {
    return (
      <RootStackNav.Navigator>
        <RootStackNav.Screen name="VerifyCode" component={VerifyCodeScreen} options={{ headerShown: false }} />
      </RootStackNav.Navigator>
    );
  }

  return <BottomTab />;
}
