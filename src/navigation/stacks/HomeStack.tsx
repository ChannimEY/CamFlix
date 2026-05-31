import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/home/HomeScreen";
import MovieDetailScreen from "../../screens/home/MovieDetailScreen";


const HomeStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: { headerShown: false },
    },
    Detail: {
      screen: MovieDetailScreen,
        options: { headerShown: false },
      
    },
  },
});

export default HomeStack;
