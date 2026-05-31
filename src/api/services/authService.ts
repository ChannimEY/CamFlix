import {
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UpdatePasswordRequest,
  UpdateProfilePhotoRequest,
  UpdateProfileRequest,
  User,
  VerifyCodeRequest,
} from "../models/auth";

const BASE_URL = "http://laravel-auth-api-opal.vercel.app/api";

const jsonHeaders = (token?: string) => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const parseJson = async <T>(response: Response): Promise<T | null> => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const request = async <T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<T | null> => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...jsonHeaders(token),
      ...(options.headers ?? {}),
    },
  });

  return parseJson<T>(response);
};

export const getAuthToken = (response: AuthResponse | null) => {
  if (!response) return null;
  if (response.token) return response.token;
  if (response.access_token) return response.access_token;
  const data = response.data;
  if (data && "token" in data && typeof data.token === "string") {
    return data.token;
  }
  return null;
};

export const getAuthUser = (response: AuthResponse | null): User | null => {
  if (!response) return null;
  if (response.user) return response.user;
  const data = response.data;
  if (!data) return null;
  if ("user" in data && data.user) return data.user;
  if ("email" in data) return data as User;
  return null;
};

export const isUserVerified = (user: User | null) => {
  if (!user) return false;
  return user.is_verify === true || Boolean(user.email_verified_at);
};

export const registerUser = (data: RegisterRequest) =>
  request<AuthResponse>("/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const loginUser = (data: LoginRequest) =>
  request<AuthResponse>("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const logoutUser = (token: string) =>
  request<{ message?: string }>("/logout", { method: "POST" }, token);

export const sendVerifyEmail = (token: string) =>
  request<{ message?: string }>("/email/verify/send", { method: "POST" }, token);

export const verifyEmailCode = (data: VerifyCodeRequest, token: string) =>
  request<AuthResponse>("/email/verify/check", {
    method: "POST",
    body: JSON.stringify(data),
  }, token);

export const sendForgotPasswordCode = (data: ForgotPasswordRequest) =>
  request<{ message?: string; errors?: Record<string, string[]> }>(
    "/forgot-password/send-code",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );

export const resetPassword = (data: ResetPasswordRequest) =>
  request<{ message?: string; errors?: Record<string, string[]> }>(
    "/forgot-password/reset",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );

export const getUser = (token: string) =>
  request<User | { user?: User; data?: User }>("/user", { method: "GET" }, token);

export const updateProfile = (data: UpdateProfileRequest, token: string) =>
  request<User | { user?: User; data?: User }>("/user/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  }, token);

export const updatePassword = (data: UpdatePasswordRequest, token: string) =>
  request<{ message?: string; errors?: Record<string, string[]> }>(
    "/user/password",
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    token,
  );

export const updateProfilePhoto = (
  data: UpdateProfilePhotoRequest,
  token: string,
) =>
  request<{ message?: string; errors?: Record<string, string[]> }>(
    "/user/profile-photo",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token,
  );

export const unwrapUser = (response: User | { user?: User; data?: User } | null) => {
  if (!response) return null;
  if ("user" in response && response.user) return response.user;
  if ("data" in response && response.data) return response.data;
  if ("email" in response) return response as User;
  return null;
};

export const getUserData = (token: string) =>
  request<User | { user?: User; data?: User }>("/user", { method: "GET" }, token);

const refreshUserData = async (token: string): Promise<User | null> => {
  const response = await getUserData(token);
  return unwrapUser(response);
};
