import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeStack from "../stacks/HomeStack";
import SearchStack from "../stacks/SearchStack";
import ProfileStack from "../stacks/ProfileStack";

export const BottomTab = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,

    tabBarInactiveTintColor: "#888",
    tabBarActiveTintColor: "#E50914",

    tabBarStyle: {
      backgroundColor: "#121212",
      borderTopColor: "#222",
      height: 60,
      paddingBottom: 5,
      paddingTop: 5,
    },

    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "600",
    },
  },

  screens: {
    HomeTab: {
      screen: HomeStack,

      options: {
        tabBarLabel: "Home",

        tabBarIcon: ({ color, focused }) =>
          focused ? (
            <Entypo
              name="home"
              size={24}
              color={color}
            />
          ) : (
            <AntDesign
              name="home"
              size={24}
              color={color}
            />
          ),
      },
    },

    SearchTab: {
      screen: SearchStack,

      options: {
        tabBarLabel: "Search",

        tabBarIcon: ({ color, focused }) =>
          focused ? (
            <Ionicons
              name="search"
              size={24}
              color={color}
            />
          ) : (
            <Feather
              name="search"
              size={24}
              color={color}
            />
          ),
      },
    },

    ProfileTab: {
      screen: ProfileStack,

      options: {
        tabBarLabel: "Profile",

        tabBarIcon: ({ color, focused }) =>
          focused ? (
            <Ionicons
              name="person"
              size={24}
              color={color}
            />
          ) : (
            <Ionicons
              name="person-outline"
              size={24}
              color={color}
            />
          ),
      },
    },
  },
});