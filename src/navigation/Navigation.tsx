import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RootStack from "./stacks/RootStack";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#121212",
  },
};

export const Navigation = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <RootStack />
    </NavigationContainer>
  );
};