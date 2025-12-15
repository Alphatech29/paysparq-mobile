import { Slot, Redirect } from 'expo-router';
import { useAuth } from '../../../context/authContext';

export default function AuthLayout() {
  const { isAuthenticated, loading } = useAuth();

  // Wait until auth state is restored
  if (loading) {
    return null;
  }

  // If user is already logged in, send to dashboard
  if (isAuthenticated) {
    return <Redirect href="/dashboard" />;
  }

  // Otherwise allow login & register screens
  return <Slot />;
}
