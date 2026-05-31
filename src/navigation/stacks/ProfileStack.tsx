import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import EditProfileScreen from "../../screens/profile/EditProfileScreen";

const ProfileStack = createNativeStackNavigator({
  screens: {
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen,
  },
});

export default ProfileStack;