import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import EditProfileScreen from "../../screens/profile/EditProfileScreen";
import LogoutScreen from "../../screens/profile/LogoutScreen";


const ProfileStack = createNativeStackNavigator({
  screens: {
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen,
    Logout: LogoutScreen,
  },
});

export default ProfileStack;
