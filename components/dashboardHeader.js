import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledImage = styled(Image);

const DashboardHeader = ({
  userName = 'User',
  onNotificationPress,
  onSupportPress,
  onProfilePress,
}) => {
  return (
    <SafeAreaView>
      <StyledView className="flex-row items-center justify-between px-4 py-3  bg-[#FFF9EC]">

        {/* Left: Greeting + Avatar */}
        <StyledView className="flex-row items-center gap-x-2">
          <StyledTouchable onPress={onProfilePress}>
            <StyledImage
              source={{ uri: 'https://i.pravatar.cc/300' }}
              className="w-10 h-10 rounded-full"
            />
          </StyledTouchable>
          <StyledView>
            <StyledText className="text-[11px] text-[#451805] font-semibold">
              Welcome back!
            </StyledText>
            <StyledText className="text-[15px] font-bold text-[#451805]">
              {userName}
            </StyledText>
          </StyledView>
        </StyledView>

        {/* Right: Notifications */}
        <StyledView className="flex-row items-center gap-x-3">
          <StyledTouchable onPress={onNotificationPress}>
            <Ionicons name="notifications" size={24} color="#451805" />
          </StyledTouchable>
          <StyledTouchable onPress={onSupportPress}>
            <Ionicons name="chatbubble" size={24} color="#451805" />
          </StyledTouchable>
        </StyledView>
      </StyledView>
    </SafeAreaView>
  );
};

export default DashboardHeader;
