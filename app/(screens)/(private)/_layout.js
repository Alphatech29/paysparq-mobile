import { Slot, Redirect } from 'expo-router';
import { useAuth } from '../../../context/authContext';
import BottomTab from '../../../components/bottomTab';
import { View } from 'react-native';

export default function PrivateLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <View className="flex-1 bg-white">
      {/* Render the current screen */}
      <View className="flex-1">
        <Slot />
      </View>
      {/* Global Bottom Tab for authenticated users */}
      <BottomTab />
    </View>
  );
}
