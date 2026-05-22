import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
} from 'react-native';

interface MovieCardProps {
  id: number;
  poster_path: string | null;
  title?: string;
  name?: string;
  vote_average?: number;
  onPress?: (id: number) => void;
  style?: StyleProp<ViewStyle>;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  poster_path,
  title,
  name,
  vote_average,
  onPress,
  style,
}) => {
  const movieTitle = title || name || 'Untitled';
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : null;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      hitSlop={6}
      style={[styles.card, style]}
      onPress={() => onPress?.(id)}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.posterPlaceholder]}>
          <Text style={styles.posterPlaceholderText}>{movieTitle}</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {movieTitle}
        </Text>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>
            {(vote_average ?? 0).toFixed(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  poster: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  posterPlaceholder: {
    backgroundColor: '#1E2637',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  posterPlaceholderText: {
    color: '#9CA4B5',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  info: {
    marginTop: 6,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  rating: {
    backgroundColor: '#F2242A',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
