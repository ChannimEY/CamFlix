import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import AuthGate from './src/navigation/AuthGate';

export default function App() {
  return (
    <AuthProvider>
      <AuthGate />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}