import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import EditProfileScreen from "../../screens/profile/EditProfileScreen";

const ProfileStack = createNativeStackNavigator({
  screens: {
    Profile: {
      screen: ProfileScreen,
      options: { headerShown: false },
    },
    EditProfile: {
      screen: EditProfileScreen,
      options: { headerShown: false },
    },
  },
});

export default ProfileStack;