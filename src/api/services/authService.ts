import * as SecureStore from 'expo-secure-store';
import type { AuthResponse, User } from '../models/auth';

// Get the base URL from environment variables
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://laravel-auth-api-opal.vercel.app/api';

// Helper function to store token securely
export const storeToken = async (token: string) => {
  await SecureStore.setItemAsync('token', token);
};

// Helper function to get token securely
export const getToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync('token');
};

// Helper function to remove token securely
export const removeToken = async () => {
  await SecureStore.deleteItemAsync('token');
};

// Helper function to get headers with auth token
const getHeaders = async (includeContentType = true): Promise<Record<string, string>> => {
  const token = await getToken();
  return {
    ...(includeContentType ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Handle API response
const handleResponse = async (response: Response): Promise<any> => {
  const text = await response.text();
  const data = text
    ? (() => {
        try {
          return JSON.parse(text);
        } catch {
          return { message: text };
        }
      })()
    : {};

  if (!response.ok) {
    const message =
      data.message ||
      Object.values(data.errors || {})
        .flat()
        .join('\n') ||
      `HTTP error! status: ${response.status}`;
    const error = new Error(message) as Error & { status?: number; data?: any };
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export type UserData = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export type ProfileData = {
  first_name?: string;
  last_name?: string;
  email?: string;
};

export type PasswordData = {
  current_password?: string;
  password?: string;
  password_confirmation?: string;
};

const unwrapUser = (response: any): User | null => {
  if (!response) return null;
  if (response.user) return response.user;
  if (response.data?.user) return response.data.user;
  if (response.data?.data?.user) return response.data.data.user;
  if (response.data?.email) return response.data;
  if (response.email) return response;
  return null;
};

const unwrapToken = (response: any): string | null => {
  return (
    response?.token ||
    response?.access_token ||
    response?.data?.token ||
    response?.data?.access_token ||
    response?.data?.data?.token ||
    response?.data?.data?.access_token ||
    null
  );
};

const normalizeAuthResponse = (response: AuthResponse) => ({
  ...response,
  token: unwrapToken(response),
  user: unwrapUser(response),
});

export const authService = {
  // Register a new user
  register: async (userData: UserData) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(userData),
    });
    const result = normalizeAuthResponse(await handleResponse(response));
    if (result.token) await storeToken(result.token);
    return result;
  },

  // Login user
  login: async (credentials: Credentials) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(credentials),
    });
    let result;
    try {
      result = normalizeAuthResponse(await handleResponse(response));
    } catch (error) {
      const apiError = error as Error & { data?: AuthResponse };
      const authResult = normalizeAuthResponse(apiError.data || {});
      if (authResult.token) {
        result = authResult;
      } else {
        throw error;
      }
    }
    if (result.token) await storeToken(result.token);
    return result;
  },

  // Send email verification
  sendEmailVerification: async () => {
    const response = await fetch(`${BASE_URL}/email/verify/send`, {
      method: 'POST',
      headers: await getHeaders(),
    });
    await handleResponse(response);
  },

  // Verify email with code
  verifyEmail: async (code: string) => {
    const response = await fetch(`${BASE_URL}/email/verify/check`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify({ code }),
    });
    await handleResponse(response);
  },

  // Logout user
  logout: async () => {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: await getHeaders(),
    });
    await handleResponse(response);
    await removeToken();
  },

  // Forgot password: send reset code
  forgotPasswordSendCode: async (email: string) => {
    const response = await fetch(`${BASE_URL}/forgot-password/send-code`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify({ email }),
    });
    await handleResponse(response);
  },

  // Forgot password: reset password with code
  forgotPasswordReset: async (data: { email: string; code: string; password: string; password_confirmation: string }) => {
    const response = await fetch(`${BASE_URL}/forgot-password/reset`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(data),
    });
    const result = normalizeAuthResponse(await handleResponse(response));
    if (result.token) await storeToken(result.token);
    return result;
  },

  // Get user profile
  getProfile: async () => {
    const response = await fetch(`${BASE_URL}/user`, {
      method: 'GET',
      headers: await getHeaders(),
    });
    const result = await handleResponse(response);
    return unwrapUser(result) || result;
  },

  // Update user profile
  updateProfile: async (profileData: ProfileData) => {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: await getHeaders(),
      body: JSON.stringify(profileData),
    });
    const result = await handleResponse(response);
    return unwrapUser(result) || authService.getProfile();
  },

  // Update user password
  updatePassword: async (passwordData: PasswordData) => {
    const response = await fetch(`${BASE_URL}/user/password`, {
      method: 'PUT',
      headers: await getHeaders(),
      body: JSON.stringify(passwordData),
    });
    return handleResponse(response);
  },

  // Update profile photo
  updateProfilePhoto: async (photoUri: string, fileName?: string | null, mimeType?: string | null) => {
    const formData = new FormData();
    const safeFileName = fileName || photoUri.split('/').pop() || 'profile-photo.jpg';
    const extension = safeFileName.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase();
    const safeMimeType = mimeType || (
      extension === 'png'
        ? 'image/png'
        : extension === 'webp'
          ? 'image/webp'
          : 'image/jpeg'
    );

    const imageFile = {
      uri: photoUri,
      name: safeFileName,
      type: safeMimeType,
    } as any;

    formData.append('image', imageFile);
    formData.append('photo', imageFile);
    formData.append('profile_photo', imageFile);

    const response = await fetch(`${BASE_URL}/user/profile-photo`, {
      method: 'POST',
      headers: {
        ...(await getHeaders(false)),
      },
      body: formData,
    });
    const result = await handleResponse(response);
    return unwrapUser(result) || authService.getProfile();
  },

  // Refresh user data
  refreshUser: async () => {
    return authService.getProfile();
  },

  // Unwrap user response to handle different API response formats
  unwrapUser,
  unwrapToken,
  normalizeAuthResponse,
};
