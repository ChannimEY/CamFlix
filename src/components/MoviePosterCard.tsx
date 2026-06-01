import React from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Movie, getPosterUrl } from "../api/services/movieService";

interface MoviePosterCardProps {
  movie: Movie;
  onPress: (movieId: number) => void;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const MoviePosterCard = ({
  movie,
  onPress,
  style,
  imageStyle,
}: MoviePosterCardProps) => {
  const posterUrl = getPosterUrl(movie.poster_path);

  if (!posterUrl) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={style}
      hitSlop={6}
      onPress={() => onPress(movie.id)}
    >
      <Image source={{ uri: posterUrl }} style={[styles.poster, imageStyle]} />

      <View style={styles.rating}>
        <Text style={styles.ratingText}>{movie.vote_average.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MoviePosterCard;

const styles = StyleSheet.create({
  poster: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },

  rating: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(17, 24, 39, 0.86)",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },

  ratingText: {
    color: "#FFC107",
    fontSize: 11,
    fontWeight: "700",
  },
});
