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

CamFlix is a modern movie application developed with React Native.  
The app provides a smooth and responsive experience for browsing movies, searching trending content, viewing movie details, and managing user profiles.

---

## ✨ Features

### 🔐 Authentication
- Welcome Screen
- Login Screen
- Register Screen
- Forgot Password
- Verify Code
- Create New Password

### 🏠 Home
- Trending Movies
- Popular Movies
- Movie Overview
- Movie Detail Screen
- About Tab
- Reviews Tab
- Cast Tab

### 🔍 Search
- Search Movies
- Empty State UI
- Search Overview

### 👤 Profile
- User Profile
- Edit Profile
- Settings Screen
- Logout Screen

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| ⚛️ React Native | Mobile App Development |
| 🚀 Expo | Development Platform & Build Tools |
| 🧭 React Navigation | Navigation System |
| 🎥 TMDB API | Movie Data |

---

## 📂 Project Structure

```bash
CamFlix/
│
├── src/
│   ├── api/
│   │   ├── models/
│   │   └── services/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── navigation/
│   │   ├── stacks/
│   │   └── tabs/
│   └── screens/
│       ├── auth/
│       ├── home/
│       ├── profile/
│       └── search/
│
├── App.tsx
├── index.ts
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/ChannimEY/CamFlix.git
cd CamFlix
```

### 2️⃣ Install Dependencies

```bash
npm install
```

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

Or using the legacy format:

```env
TMDB_API_KEY=your_tmdb_api_key_here
```

Get your API key from [TMDB](https://www.themoviedb.org/settings/api).

### 4️⃣ Start Development Server

```bash
npm start
```

### 5️⃣ Run on Platform

| Platform | Command |
|----------|---------|
| 📱 Android | `npm run android` |
| 🍏 iOS | `npm run ios` |
| 🌐 Web | `npm run web` |

---

## 📸 Screens

| Screen | Description |
|--------|-------------|
| 🎬 Welcome | App entry with sign up and social login options |
| 🔐 Login | User authentication |
| 📝 Register | Create new account |
| 🔁 Forgot Password | Password recovery flow |
| ✅ Verify Code | Email verification |
| 🔐 New Password | Reset password screen |
| 🏠 Home | Browse trending and popular movies |
| 🔍 Search | Find movies by title |
| 👤 Profile | User profile management |
| ✏️ Edit Profile | Update user information |
| ⚙️ Settings | App settings |
| 🚪 Logout | Logout confirmation |
| 🎞️ Movie Detail | Movie information, cast, and reviews |

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