# 🎬 CamFlix

<p align="center">
  <img src="./src/assets/Logo.png" alt="CamFlix Logo" width="180" />
</p>

<h3 align="center">🍿 Modern Movie Streaming Application</h3>

<p align="center">
  Built with ❤️ using React Native & Expo
</p>

---

## 📖 Overview

CamFlix is a modern movie streaming mobile application built with React Native and Expo. The app delivers a polished, dark-themed experience for browsing movies, searching trending content, viewing detailed movie information (overview, reviews, cast), and managing user profiles — all backed by real APIs.

The app integrates two external services:
- **TMDB (The Movie Database)** for fetching live movie data — now playing, upcoming, top rated, popular, search, credits, and reviews.
- **A custom Laravel authentication API** for user registration, login, email verification, password reset, and profile management.

---

## ✨ Features

### 🔐 Authentication
- **Welcome Screen** — Onboarding screen with brand logo, sign-up CTA, and social login options (Google, Apple, Facebook).
- **Login / Register** — Full forms with email validation, password eye-toggle, terms acceptance, and social login. Client-side field validation on all inputs.
- **Forgot Password** — Email-based password recovery flow.
- **Verify Code** — 6-digit OTP input with auto-validation and resend support.
- **New Password** — Password reset with code + new password + confirmation.

### 🏠 Home
- **Featured Banner** — Horizontal carousel of top 5 now-playing movies with large backdrop images and numeric badges.
- **Category Tabs** — Four filterable sections: *Now Playing*, *Upcoming*, *Top Rated*, and *Popular*. Each tab refetches its movie list.
- **Movie Grid** — Responsive 3-column grid displaying poster cards with live rating badges (amber, `X/10`).
- **Movie Detail** — Full movie view with backdrop + poster hero, title, year, runtime, genre, rating, then three tabs:
  - **About** — Full movie overview / description.
  - **Reviews** — Up to 5 author reviews with ratings out of 10 and truncated content on dark cards.
  - **Cast** — Up to 12 cast members with circular profile photos, actor names, and character roles.

### 🔍 Search
- **Debounced Search** — 500ms debounce on the search input for performance.
- **Minimum 2 Characters** — Search is only triggered when 2 or more characters are entered.
- **Empty States** — Friendly UI for initial state, too-short input, and no-results scenarios.
- **Results Grid** — 3-column `FlatList` with `MovieCard` components including poster, title, and rating badge.

### 👤 Profile
- **User Profile Hub** — Avatar (with initials fallback), display name, email, and a "Premium Member" badge.
- **Edit Profile** — Update first name, last name, and email. Change profile photo via `expo-image-picker` (media library permissions, 1:1 aspect ratio, quality 0.8).
- **Change Password** — Form with current password, new password, and confirm password, each with secure-text eye toggle.
- **Logout** — Confirmation modal before securely logging the user out.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| ⚛️ React Native 0.81.5 | Mobile App Development |
| 🚀 Expo SDK 54 | Development Platform |
| 🧭 React Navigation 7 | Navigation (native stack + bottom tabs) |
| 🎥 TMDB API v3 | Live movie & TV data |
| 🔐 Laravel Auth API | User authentication & profile management |
| 💾 expo-secure-store | Secure token persistence |
| 🖼️ expo-image-picker | Profile photo selection |
| 🔤 TypeScript 5.9 | Type safety |
| 🎨 @expo/vector-icons | UI icons (Ionicons, FontAwesome, AntDesign, Entypo, Feather) |

---

## 🏗️ Architecture

### Navigation Flow

```
App.tsx
└── AuthProvider (React Context — global auth state)
    └── AuthGate (loading spinner overlay)
        └── NavigationContainer (dark theme: #121212)
            └── RootStack (conditional auth routing)
                ├── [isLoading]       → Spinner
                ├── [no token]        → AuthStack
                │   ├── Welcome
                │   ├── Login
                │   ├── Register
                │   ├── ForgotPassword
                │   ├── NewPassword
                │   └── VerifyCode
                ├── [token + !verified] → VerifyCode
                └── [token + verified]  → BottomTab
                    ├── HomeTab → HomeStack (Home + MovieDetail)
                    ├── SearchTab → SearchStack (Search + MovieDetail)
                    └── ProfileTab → ProfileStack (Profile + EditProfile + ChangePassword)
```

### State Management
All global state is managed via **React Context API** (`AuthContext`). The context tracks `token`, `user`, `isVerified`, `isLoading`, and exposes methods for login, register, logout, email verification, forgot password, profile updates, and password changes. The token is persisted using `expo-secure-store`.

### API Layer
- **Movie Service** (`src/api/services/movieService.ts`) — Wraps TMDB endpoints with a generic `fetchFromTmdb<T>()` helper. Uses `expo-secure-store` API key resolution with env var fallback (`EXPO_PUBLIC_TMDB_API_KEY` or `TMDB_API_KEY`, with a hard-coded read-access-token fallback). Helper functions `getPosterUrl()`, `getBackdropUrl()`, and `getProfileUrl()` construct image URLs.
- **Auth Service** (`src/api/services/authService.ts`) — Wraps a custom Laravel backend at a configurable base URL (`EXPO_PUBLIC_API_URL`). Handles registration/login, email verification, password reset, profile updates, and photo uploads (multipart `FormData`). Auto-persists tokens on login, register, and reset.

---

## 📂 Project Structure

```
CamFlix/
│
├── App.tsx                       # Root: AuthProvider → AuthGate → StatusBar
├── index.ts                      # App entry point
├── package.json                  # Dependencies & scripts
├── app.json                      # Expo configuration
├── tsconfig.json                 # TypeScript configuration
│
├── src/
│   ├── api/
│   │   ├── models/
│   │   │   └── auth.ts           # User, AuthResponse, request DTOs
│   │   └── services/
│   │       ├── movieService.ts   # TMDB API client (fetch)
│   │       └── authService.ts    # Laravel API client + SecureStore token handling
│   │
│   ├── assets/
│   │   ├── Logo.png              # Welcome screen logo
│   │   └── google.png            # Google social login icon
│   │
│   ├── components/
│   │   ├── MoviePosterCard.tsx   # Home grid poster with rating overlay
│   │   ├── MovieCard.tsx         # Search result card (poster + title + rating)
│   │   └── TextInput.tsx         # Reusable styled input with secure toggle
│   │
│   ├── context/
│   │   └── AuthContext.tsx       # Global auth state + methods
│   │
│   ├── hooks/                    # Reserved for custom hooks (currently unused)
│   │
│   ├── navigation/
│   │   ├── Navigation.tsx        # NavigationContainer with dark theme
│   │   ├── AuthGate.tsx          # Auth loading → navigation transition
│   │   ├── tabs/
│   │   │   └── BottomTab.tsx     # 3-tab bottom navigator (Home, Search, Profile)
│   │   └── stacks/
│   │       ├── RootStack.tsx     # Conditional root routing
│   │       ├── AuthStack.tsx     # Auth flow screens
│   │       ├── HomeStack.tsx     # Home + MovieDetail
│   │       ├── SearchStack.tsx   # Search + MovieDetail
│   │       └── ProfileStack.tsx  # Profile + EditProfile + ChangePassword
│   │
│   └── screens/
│       ├── home/
│       │   ├── HomeScreen.tsx         # Featured banner + category tabs + movie grid
│       │   ├── MovieDetailScreen.tsx  # Backdrop hero + tabs (About / Reviews / Cast)
│       │   ├── AboutTab.tsx           # Movie overview
│       │   ├── CastTab.tsx            # Cast grid with photos & roles
│       │   └── ReviewTab.tsx          # Review cards with ratings
│       │
│       ├── auth/
│       │   ├── WelcomeScreen.tsx      # Branding, Sign Up, social login
│       │   ├── LoginScreen.tsx        # Email + password login
│       │   ├── RegisterScreen.tsx     # Full registration form
│       │   ├── ForgotPasswordScreen.tsx # Email for password reset
│       │   ├── VerifyCodeScreen.tsx   # 6-digit OTP input
│       │   └── NewPasswordScreen.tsx  # OTP + new password reset
│       │
│       ├── profile/
│       │   ├── ProfileScreen.tsx      # Profile hub with menus & logout modal
│       │   ├── EditProfileScreen.tsx  # Edit names, email, and photo
│       │   ├── ChangePasswordScreen.tsx # Current / new / confirm password
│       │   └── LogoutScreen.tsx       # Standalone logout confirmation (orphan screen)
│       │
│       └── search/
│           └── SearchScreen.tsx       # Debounced search with empty states
```

---

## ⚙️ Installation

### Prerequisites
- Node.js (LTS recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) / Android Studio Emulator / physical device via Expo Go

### 1️⃣ Clone Repository

```bash
git clone https://github.com/ChannimEY/CamFlix.git
cd CamFlix
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
# TMDB API Key (v3 read-access-token or api_key v4)
EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key

# Custom Laravel Auth API base URL
EXPO_PUBLIC_API_URL=http://your-laravel-api.com/api
```

Alternatively, use `TMDB_API_KEY` (checked after `EXPO_PUBLIC_TMDB_API_KEY`). If neither env var is set, the app falls back to a built-in TMDB read-access token.

### 4️⃣ Start the Development Server

```bash
npx expo start
```

Then press:
- `a` to open on Android emulator
- `i` to open on iOS simulator
- Scan the QR code with Expo Go on a physical device

---

## 🔑 APIs

### TMDB (The Movie Database)
- Used for all movie metadata: search, popular, now playing, upcoming, top rated, movie details, credits, and reviews.
- Responses are fetched with `language=en-US`.
- Images loaded from `https://image.tmdb.org/t/p/w500` (posters) and `https://image.tmdb.org/t/p/w780` (backdrops).
- No authentication is required from the user — all requests are server-to-server via the app's API key.

### Laravel Auth API
- Custom backend handling user lifecycle endpoints: register, login, email verification, password recovery, profile update, password change, logout, and profile photo upload.
- JWT tokens are stored securely with `expo-secure-store`.
- Profile photos are uploaded as multipart `FormData`.

---

## 📸 Screens & Flow

| Screen | Purpose |
|--------|---------|
| **Welcome** | App entry with logo, sign-up CTA, and social login |
| **Login** | Email + password with validation, forgot-password link |
| **Register** | Full sign-up form (first/last name, email, password, confirm) |
| **Verify Code** | 6-digit OTP entry with resend support |
| **New Password** | OTP + new password for reset flow |
| **Forgot Password** | Email entry to trigger reset code |
| **Home** | Featured banner + category tabs + movie grid |
| **Movie Detail** | Backdrop hero, info, About / Reviews / Cast tabs |
| **Search** | Debounced search with empty states |
| **Profile** | Avatar, menus, and logout confirmation |
| **Edit Profile** | Name, email, and photo update |
| **Change Password** | Current / new / confirm password form |

---

## 👩‍💻 Developers

<table>
<tr>
<td align="center">
<img src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png" width="100" />
<br />
<b>Ey Channim</b>
<br />
Developer  👩‍💻
</td>
<td align="center">
<img src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png" width="100" />
<br />
<b>Srong MeyMey</b>
<br />
Developer  👩‍💻
</td>
</tr>
</table>

---

## 💙 Support

If you like this project, give it a ⭐ on GitHub!

---

<p align="center">
  Made with ❤️ by CamFlix Team
</p>