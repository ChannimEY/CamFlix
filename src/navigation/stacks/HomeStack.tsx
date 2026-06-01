import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../../screens/home/HomeScreen";
import MovieDetailScreen from "../../screens/home/MovieDetailScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={MovieDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
