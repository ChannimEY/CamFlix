import { createStaticNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { RootStack } from './src/navigation/stacks/RootStack';

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}
