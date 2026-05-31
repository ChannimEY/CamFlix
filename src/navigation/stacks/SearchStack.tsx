import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../../screens/search/SearchScreen";
import MovieDetailScreen from "../../screens/home/MovieDetailScreen";


const SearchStack = createNativeStackNavigator({
  screens: {
    Search: {
      screen: SearchScreen,
      options: { headerShown: false },
    },
    Detail: {
      screen: MovieDetailScreen,
    },
  },
});

export default SearchStack;
