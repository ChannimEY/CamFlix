import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StaticParamList } from "@react-navigation/native";

import HomeStack from "./HomeStack";
import { BottomTab } from "../tabs/BottomTab";
import ProfileStack from "./ProfileStack";
import SearchStack from "./SearchStack";

export const RootStack = createNativeStackNavigator({
  screens: {
    Tab: {
      screen: BottomTab,
      options: { headerShown: false },
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;
type HomeStackParamList = StaticParamList<typeof HomeStack>;
type SearchStackParamList = StaticParamList<typeof SearchStack>;
type ProfileStackParamList = StaticParamList<typeof ProfileStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends RootStackParamList, HomeStackParamList, SearchStackParamList, ProfileStackParamList {}
  }
}
