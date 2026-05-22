declare const process:
  | {
      env?: {
        EXPO_PUBLIC_TMDB_API_KEY?: string;
        TMDB_API_KEY?: string;
      };
    }
  | undefined;

const env = typeof process !== 'undefined' ? process.env : undefined;
const API_KEY =
  env?.EXPO_PUBLIC_TMDB_API_KEY ||
  env?.TMDB_API_KEY ||
  '0b839c9f62ad99b17ac6e47340e294fc';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w780';

export interface Movie {
  id: number;
  title: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  genres?: Genre[];
  runtime?: number;
  popularity: number;
  media_type?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieReview {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details?: {
    rating?: number | null;
    avatar_path?: string | null;
  };
}

interface MoviesResponse {
  results?: Movie[];
}

interface CreditsResponse {
  cast?: CastMember[];
}

interface ReviewsResponse {
  results?: MovieReview[];
}

const buildUrl = (endpoint: string, params: Record<string, string | boolean> = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);

  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('language', 'en-US');

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  return url.toString();
};

const fetchFromTmdb = async <T,>(
  endpoint: string,
  params?: Record<string, string | boolean>,
): Promise<T> => {
  const response = await fetch(buildUrl(endpoint, params));

  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }

  return response.json();
};

export const getPosterUrl = (posterPath: string | null): string | null => {
  return posterPath ? `${IMAGE_BASE_URL}${posterPath}` : null;
};

export const getBackdropUrl = (backdropPath: string | null): string | null => {
  return backdropPath ? `${BACKDROP_BASE_URL}${backdropPath}` : null;
};

export const getProfileUrl = (profilePath: string | null): string | null => {
  return profilePath ? `${IMAGE_BASE_URL}${profilePath}` : null;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) return [];

  try {
    const data = await fetchFromTmdb<MoviesResponse>('/search/movie', {
      query,
      include_adult: false,
    });

    return data.results || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const data = await fetchFromTmdb<MoviesResponse>('/movie/popular');

    return data.results || [];
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    const data = await fetchFromTmdb<MoviesResponse>('/movie/now_playing');

    return data.results || [];
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    return [];
  }
};

export const getUpcomingMovies = async (): Promise<Movie[]> => {
  try {
    const data = await fetchFromTmdb<MoviesResponse>('/movie/upcoming');

    return data.results || [];
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const data = await fetchFromTmdb<MoviesResponse>('/movie/top_rated');

    return data.results || [];
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
};

export const getMovieDetails = async (movieId: number): Promise<Movie> => {
  try {
    return await fetchFromTmdb<Movie>(`/movie/${movieId}`);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getMovieCredits = async (movieId: number): Promise<CastMember[]> => {
  try {
    const data = await fetchFromTmdb<CreditsResponse>(`/movie/${movieId}/credits`);

    return data.cast || [];
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    return [];
  }
};

export const getMovieReviews = async (movieId: number): Promise<MovieReview[]> => {
  try {
    const data = await fetchFromTmdb<ReviewsResponse>(`/movie/${movieId}/reviews`);

    return data.results || [];
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    return [];
  }
};
