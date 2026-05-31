import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getPosterUrl,
  getTopRatedMovies,
  getUpcomingMovies,
  Movie,
} from "../../api/services/movieService";
import MoviePosterCard from "../../components/MoviePosterCard";
import { useNavigation } from "@react-navigation/native";

type MovieCategory = "nowPlaying" | "upcoming" | "topRated" | "popular";

const movieTabs: { label: string; value: MovieCategory }[] = [
  { label: "Now playing", value: "nowPlaying" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Top rated", value: "topRated" },
  { label: "Popular", value: "popular" },
];

const movieFetchers: Record<MovieCategory, () => Promise<Movie[]>> = {
  nowPlaying: getNowPlayingMovies,
  upcoming: getUpcomingMovies,
  topRated: getTopRatedMovies,
  popular: getPopularMovies,
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeCategory, setActiveCategory] =
    useState<MovieCategory>("nowPlaying");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleMoviePress = (movieId: number) => {
    (navigation as any).navigate("Detail", { movieId });
  };

  const fetchMoviesByCategory = async (category: MovieCategory) => {
    try {
      setLoading(true);
      setError("");

      const [nowPlaying, categoryMovies] = await Promise.all([
        getNowPlayingMovies(),
        movieFetchers[category](),
      ]);

      setFeaturedMovies(
        nowPlaying.filter((movie) => movie.poster_path).slice(0, 5),
      );
      setMovies(categoryMovies.filter((movie) => movie.poster_path));
    } catch (error) {
      console.error("Error fetching home movies:", error);
      setError("Unable to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesByCategory(activeCategory);
  }, [activeCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>What do you want to watch?</Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#777"
            style={styles.input}
          />

          <Ionicons name="search-outline" size={22} color="#777" />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bannerContainer}
        >
          {featuredMovies.map((movie, index) => {
            const posterUrl = getPosterUrl(movie.poster_path);

            return posterUrl ? (
              <TouchableOpacity
                key={movie.id}
                activeOpacity={0.85}
                style={styles.featuredWrapper}
                hitSlop={6}
                onPress={() => handleMoviePress(movie.id)}
              >
                <Text style={styles.number}>{index + 1}</Text>

                <Image
                  source={{ uri: posterUrl }}
                  style={styles.featuredImage}
                />
              </TouchableOpacity>
            ) : null;
          })}
        </ScrollView>

        <View style={styles.tabs}>
          {movieTabs.map((tab) => {
            const isActive = activeCategory === tab.value;

            return (
              <TouchableOpacity
                key={tab.value}
                style={styles.tabItem}
                onPress={() => setActiveCategory(tab.value)}
              >
                <Text style={[styles.tabText, isActive && styles.activeTab]}>
                  {tab.label}
                </Text>

                {isActive ? <View style={styles.activeLine} /> : null}
              </TouchableOpacity>
            );
          })}
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#F2242A" />
          </View>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View style={styles.grid}>
            {movies.map((movie) => {
              return (
                <MoviePosterCard
                  key={movie.id}
                  movie={movie}
                  onPress={handleMoviePress}
                  style={styles.movieImage}
                />
              );
            })}
          </View>
        )}
      </ScrollView>

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1E2B",
    paddingTop: 20,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginHorizontal: 20,
    marginBottom: 20,
  },

  searchContainer: {
    backgroundColor: "#2A2D3A",
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    marginBottom: 25,
  },

  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },

  bannerContainer: {
    paddingLeft: 20,
    marginBottom: 30,
  },

  featuredWrapper: {
    marginRight: 25,
    position: "relative",
  },

  featuredImage: {
    width: 150,
    height: 220,
    borderRadius: 22,
  },

  number: {
    position: "absolute",
    bottom: -25,
    left: -10,
    fontSize: 90,
    fontWeight: "bold",
    color: "#1B1E2B",
    textShadowColor: "#F2242A",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    zIndex: 10,
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
  },

  tabItem: {
    alignItems: "center",
  },

  tabText: {
    color: "#8E8E93",
    fontSize: 15,
    fontWeight: "500",
  },

  activeTab: {
    color: "#fff",
    fontWeight: "700",
  },

  activeLine: {
    marginTop: 6,
    width: 45,
    height: 3,
    backgroundColor: "#F2242A",
    borderRadius: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  loadingContainer: {
    paddingVertical: 40,
  },

  errorText: {
    color: "#F2242A",
    fontSize: 15,
    marginHorizontal: 20,
    marginBottom: 120,
    textAlign: "center",
  },

  movieImage: {
    width: "31%",
    height: 160,
    borderRadius: 18,
    marginBottom: 15,
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#222533",
    borderTopWidth: 1,
    borderTopColor: "#333",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 10,
  },

  navItem: {
    alignItems: "center",
  },

  navText: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
  },

  activeNavText: {
    color: "#F2242A",
    fontSize: 12,
    marginTop: 4,
  },
});
