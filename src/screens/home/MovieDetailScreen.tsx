import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import {
  CastMember,
  getBackdropUrl,
  getMovieCredits,
  getMovieDetails,
  getMovieReviews,
  getPosterUrl,
  Movie,
  MovieReview,
} from "../../api/services/movieService";
import AboutTab from "./AboutTab";
import CastTab from "./CastTab";
import ReviewTab from "./ReviewTab";
import { useNavigation, useRoute } from "@react-navigation/native";

type DetailTab = "about" | "reviews" | "cast";

const MovieDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const movieId = (route.params as any)?.movieId;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [reviews, setReviews] = useState<MovieReview[]>([]);
  const [activeTab, setActiveTab] = useState<DetailTab>("about");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!movieId) {
        setError("Movie not found.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [movieDetail, movieCast, movieReviews] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
          getMovieReviews(movieId),
        ]);

        setMovie(movieDetail);
        setCast(movieCast);
        setReviews(movieReviews);
      } catch (error) {
        console.error("Error loading movie detail:", error);
        setError("Unable to load movie detail.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  const renderTabContent = () => {
    if (!movie) {
      return null;
    }

    if (activeTab === "reviews") {
      return <ReviewTab reviews={reviews} />;
    }

    if (activeTab === "cast") {
      return <CastTab cast={cast} />;
    }

    return <AboutTab movie={movie} />;
  };

  const releaseYear = movie?.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const runtime = movie?.runtime ? `${movie.runtime} Minutes` : "N/A";
  const genre = movie?.genres?.[0]?.name || "Movie";
  const title = movie?.title || movie?.name || "Movie Detail";
  const backdropUrl = movie ? getBackdropUrl(movie.backdrop_path) : null;
  const posterUrl = movie ? getPosterUrl(movie.poster_path) : null;

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#F2242A" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error || "Movie not found."}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detail</Text>

        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.bannerContainer}>
        {backdropUrl ? (
          <Image source={{ uri: backdropUrl }} style={styles.banner} />
        ) : (
          <View style={[styles.banner, styles.imagePlaceholder]} />
        )}

        <View style={styles.movieInfo}>
          {posterUrl ? (
            <Image source={{ uri: posterUrl }} style={styles.poster} />
          ) : (
            <View style={[styles.poster, styles.imagePlaceholder]} />
          )}

          <View style={styles.detailSection}>
            <Text style={styles.movieTitle} numberOfLines={2}>
              {title}
            </Text>

            <View style={styles.row}>
              <View style={styles.infoItem}>
                <Ionicons name="calendar-outline" size={14} color="#8D93A5" />
                <Text style={styles.infoText}>{releaseYear}</Text>
              </View>

              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={14} color="#8D93A5" />
                <Text style={styles.infoText}>{runtime}</Text>
              </View>

              <View style={styles.infoItem}>
                <FontAwesome name="film" size={12} color="#8D93A5" />
                <Text style={styles.infoText}>{genre}</Text>
              </View>
            </View>
          </View>

          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#FFC107" />
            <Text style={styles.ratingText}>{movie.vote_average.toFixed(1)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={activeTab === "about" ? styles.activeTab : styles.tab}
          onPress={() => setActiveTab("about")}
        >
          <Text
            style={activeTab === "about" ? styles.activeText : styles.tabText}
          >
            About Movie
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={activeTab === "reviews" ? styles.activeTab : styles.tab}
          onPress={() => setActiveTab("reviews")}
        >
          <Text
            style={activeTab === "reviews" ? styles.activeText : styles.tabText}
          >
            Reviews
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={activeTab === "cast" ? styles.activeTab : styles.tab}
          onPress={() => setActiveTab("cast")}
        >
          <Text style={activeTab === "cast" ? styles.activeText : styles.tabText}>
            Cast
          </Text>
        </TouchableOpacity>
      </View>

      {renderTabContent()}
    </ScrollView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    paddingTop: 55,
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  bannerContainer: {
    paddingHorizontal: 20,
  },

  banner: {
    width: "100%",
    height: 240,
    borderRadius: 24,
    backgroundColor: "#1E293B",
  },

  imagePlaceholder: {
    backgroundColor: "#1E293B",
  },

  movieInfo: {
    flexDirection: "row",
    marginTop: -45,
    alignItems: "flex-end",
  },

  poster: {
    width: 95,
    height: 135,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: "#1F2937",
    backgroundColor: "#1E293B",
  },

  detailSection: {
    flex: 1,
    marginLeft: 14,
    paddingBottom: 10,
  },

  movieTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    maxWidth: 220,
  },

  row: {
    flexDirection: "row",
    marginTop: 15,
    flexWrap: "wrap",
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14,
    marginBottom: 6,
  },

  infoText: {
    color: "#8D93A5",
    marginLeft: 4,
    fontSize: 12,
  },

  rating: {
    backgroundColor: "#1E293B",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 70,
  },

  ratingText: {
    color: "#FFC107",
    marginLeft: 5,
    fontWeight: "700",
  },

  tabs: {
    flexDirection: "row",
    marginTop: 35,
    paddingHorizontal: 20,
    gap: 24,
  },

  tab: {
    paddingBottom: 8,
  },

  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#F2242A",
    paddingBottom: 8,
  },

  activeText: {
    color: "#fff",
    fontWeight: "700",
  },

  tabText: {
    color: "#9CA3AF",
  },

  errorText: {
    color: "#F2242A",
    fontSize: 16,
    textAlign: "center",
  },
});
