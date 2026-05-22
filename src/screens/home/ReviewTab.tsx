import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MovieReview } from "../../services/movieService";

interface ReviewTabProps {
  reviews: MovieReview[];
}

const ReviewTab = ({ reviews }: ReviewTabProps) => {
  if (reviews.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No reviews yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {reviews.slice(0, 5).map((review) => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.author}>{review.author}</Text>

            {review.author_details?.rating ? (
              <Text style={styles.rating}>{review.author_details.rating}/10</Text>
            ) : null}
          </View>

          <Text style={styles.content} numberOfLines={6}>
            {review.content}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ReviewTab;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 14,
  },

  reviewCard: {
    backgroundColor: "#1E293B",
    borderRadius: 14,
    padding: 14,
  },

  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  author: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
    marginRight: 12,
  },

  rating: {
    color: "#FFC107",
    fontWeight: "700",
  },

  content: {
    color: "#D1D5DB",
    fontSize: 14,
    lineHeight: 22,
  },

  emptyContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
    alignItems: "center",
  },

  emptyText: {
    color: "#9CA3AF",
    fontSize: 15,
  },
});
