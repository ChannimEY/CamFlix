import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/home/HomeScreen";
import MovieDetailScreen from "../../screens/home/MovieDetailScreen";


const HomeStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Detail: MovieDetailScreen,
  },
});

export default HomeStack;
