import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SearchScreen from "../../screens/search/SearchScreen";
import MovieDetailScreen from "../../screens/home/MovieDetailScreen";

const Stack = createNativeStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={MovieDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
