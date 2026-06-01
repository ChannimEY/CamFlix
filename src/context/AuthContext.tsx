import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, getToken, removeToken, storeToken } from '../api/services/authService';
import type { User } from '../api/models/auth';

type AuthInitialRoute = 'Welcome' | 'Login';

interface AuthContextType {
  token: string | null;
  user: User | null;
  isVerified: boolean;
  isLoading: boolean;
  authInitialRoute: AuthInitialRoute;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  cancelVerification: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPasswordSendCode: (email: string) => Promise<void>;
  forgotPasswordReset: (email: string, code: string, password: string, passwordConfirmation: string) => Promise<void>;
  getProfile: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string, newPasswordConfirmation: string) => Promise<void>;
  updateProfilePhoto: (photoUri: string, fileName?: string | null, mimeType?: string | null) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authInitialRoute, setAuthInitialRoute] = useState<AuthInitialRoute>('Welcome');

  const isTruthyVerifiedValue = (value: unknown) =>
    value === true || value === 1 || value === '1' || value === 'true';

  const getIsVerified = (nextUser: User | null) =>
    Boolean(
      isTruthyVerifiedValue(nextUser?.is_verified) ||
        isTruthyVerifiedValue(nextUser?.is_verify) ||
        nextUser?.email_verified_at,
    );

  const setAuthUser = (nextUser: User | null) => {
    setUser(nextUser);
    setIsVerified(getIsVerified(nextUser));
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedToken = await getToken();
        if (storedToken) {
          setToken(storedToken);
          const profile = await authService.getProfile();
          setAuthUser(profile);
        }
      } catch (error) {
        console.error('Failed to load user', error);
        await removeToken();
        setToken(null);
        setAuthUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.login({ email, password });
      if (!response.token) {
        throw new Error('Please verify your email before logging in.');
      }
      setToken(response.token);
      const nextUser = response.user || (response.token ? await authService.getProfile() : null);
      setAuthUser(nextUser);
      setAuthInitialRoute('Welcome');
      await storeToken(response.token);
      if (nextUser && !getIsVerified(nextUser)) {
        await authService.sendEmailVerification().catch(() => undefined);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: password,
      });
      setToken(response.token);
      const nextUser = response.user || (response.token ? await authService.getProfile() : null);
      setAuthUser(nextUser);
      if (response.token) await storeToken(response.token);
      if (nextUser && !getIsVerified(nextUser)) {
        await authService.sendEmailVerification().catch(() => undefined);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailVerification = async () => {
    try {
      setIsLoading(true);
      await authService.sendEmailVerification();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (code: string) => {
    try {
      setIsLoading(true);
      await authService.verifyEmail(code);
      const profile = await authService.getProfile();
      setAuthUser(profile);
      setAuthInitialRoute('Welcome');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelVerification = async () => {
    setIsLoading(true);
    try {
      await removeToken();
      setToken(null);
      setAuthUser(null);
      setAuthInitialRoute('Login');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
    } finally {
      setToken(null);
      setAuthUser(null);
      setAuthInitialRoute('Welcome');
      await removeToken();
      setIsLoading(false);
    }
  };

  const forgotPasswordSendCode = async (email: string) => {
    await authService.forgotPasswordSendCode(email);
  };

  const forgotPasswordReset = async (email: string, code: string, password: string, passwordConfirmation: string) => {
    try {
      setIsLoading(true);
      const resetResponse = await authService.forgotPasswordReset({
        email,
        code,
        password,
        password_confirmation: passwordConfirmation,
      });

      const authResponse = resetResponse.token
        ? resetResponse
        : await authService.login({ email, password });

      if (!authResponse.token) {
        throw new Error('Password reset succeeded, but auto login failed.');
      }

      await storeToken(authResponse.token);
      setToken(authResponse.token);

      const nextUser = authResponse.user || await authService.getProfile();
      setAuthUser(nextUser);
      setAuthInitialRoute('Welcome');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      setIsLoading(true);
      const profile = await authService.getProfile();
      setAuthUser(profile);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      const profile = await authService.refreshUser();
      setAuthUser(profile);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true);
      const updatedUser = await authService.updateProfile(data);
      const nextUser = authService.unwrapUser(updatedUser) || updatedUser;
      setAuthUser(nextUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string, newPasswordConfirmation: string) => {
    try {
      setIsLoading(true);
      await authService.updatePassword({
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: newPasswordConfirmation,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfilePhoto = async (photoUri: string, fileName?: string | null, mimeType?: string | null) => {
    try {
      setIsLoading(true);
      const updatedUser = await authService.updateProfilePhoto(photoUri, fileName, mimeType);
      const nextUser = authService.unwrapUser(updatedUser) || updatedUser;
      setAuthUser(nextUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isVerified,
        isLoading,
        authInitialRoute,
        login,
        register,
        sendEmailVerification,
        verifyEmail,
        cancelVerification,
        logout,
        forgotPasswordSendCode,
        forgotPasswordReset,
        getProfile,
        updateProfile,
        updatePassword,
        updateProfilePhoto,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
