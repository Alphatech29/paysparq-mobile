import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const BottomTab = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { id: 'home', label: 'Home', icon: 'home', route: '/dasboard' },
    { id: 'search', label: 'Search', icon: 'search', route: '/search' },
    { id: 'add', label: 'Add', icon: 'add-circle-outline', route: '/add' },
    { id: 'favorites', label: 'Favorites', icon: 'favorite-border', route: '/favorites' },
    { id: 'profile', label: 'Profile', icon: 'person-outline', route: '/profile' },
  ];

  return (
    <View className="flex-row justify-between items-center bg-[#FCEDD4] h-24 px-6 pb-7 shadow-inne ">
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => router.push(tab.route)}
            className="flex-1 items-center"
          >
            <MaterialIcons
              name={tab.icon}
              size={24}
              color={isActive ? '#F66B04' : '#F66B04/30'}
            />
            <Text className={`text-xs mt-1 ${isActive ? 'text-primary' : 'text-[#F66B04]/30'}`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTab;
