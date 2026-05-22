import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { searchMovies, Movie } from '../../services/movieService';
import MovieCard from '../../components/MovieCard';

const SearchScreen = ({ navigation }: { navigation?: any }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      const searchText = query.trim();

      if (!searchText) {
        setMovies([]);
        setError('');
        setHasSearched(false);
        setLoading(false);
        return;
      }

      if (searchText.length < 2) {
        setMovies([]);
        setError('Please type at least 2 characters');
        setHasSearched(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      const results = await searchMovies(searchText);
      setMovies(results);
      setHasSearched(true);
      setLoading(false);
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleMoviePress = (movieId: number) => {
    navigation?.navigate('Detail', { movieId });
  };

  const goToProfile = () => {
    const tabNavigation = navigation?.getParent?.();

    if (tabNavigation) {
      tabNavigation.navigate('ProfileTab', { screen: 'Profile' });
      return;
    }

    navigation?.navigate('ProfileTab', { screen: 'Profile' });
  };

  const renderMovie = ({ item }: { item: Movie }) => (
    <View style={styles.movieItem}>
      <MovieCard
        id={item.id}
        poster_path={item.poster_path}
        title={item.title || item.name}
        vote_average={item.vote_average}
        onPress={handleMoviePress}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>

        <TouchableOpacity style={styles.profileButton} onPress={goToProfile}>
          <Ionicons name="person-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search movies, TV shows..."
          placeholderTextColor="#777"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        <Ionicons name="search-outline" size={22} color="#777" />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F2242A" />
        </View>
      ) : error ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovie}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          ListEmptyComponent={
            hasSearched ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No results found</Text>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Search movies or TV shows</Text>
              </View>
            )
          }
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1E2B',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#2A2D3A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    backgroundColor: '#2A2D3A',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 20,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
  },
  movieItem: {
    width: '31%',
    marginBottom: 15,
    marginRight: '2%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#8E8E93',
    fontSize: 16,
  },
});
