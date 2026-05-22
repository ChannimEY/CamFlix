import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Movie } from "../../services/movieService";

interface AboutTabProps {
  movie: Movie;
}

const AboutTab = ({ movie }: AboutTabProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        {movie.overview || "No description available for this movie."}
      </Text>
    </View>
  );
};

export default AboutTab;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  description: {
    color: "#D1D5DB",
    lineHeight: 26,
    fontSize: 15,
  },
});
