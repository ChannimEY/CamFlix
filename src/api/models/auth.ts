export interface User {
  id: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  email: string;
  is_verify?: boolean;
  email_verified_at?: string | null;
  profile_photo?: string | null;
}

export interface AuthResponse {
  token?: string;
  access_token?: string;
  user?: User;
  data?: User | { user?: User; token?: string };
  message?: string;
  errors?: Record<string, string[]>;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyCodeRequest {
  code: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
  email: string;
}

export interface UpdatePasswordRequest {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateProfilePhotoRequest {
  profile_photo: string;
}
