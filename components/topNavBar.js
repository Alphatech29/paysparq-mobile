import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';

// Wrap components with NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const TopNavBar = () => {
  const buttons = [
    {
      title: 'Add Fund',
      icon: require('../assets/add-fund.png'),
      onPress: () => console.log('Add Fund pressed'),
    },
    {
      title: 'Send Money',
      icon: require('../assets/send-icon.png'),
      onPress: () => console.log('Send Money pressed'),
    },
    {
      title: 'Pay Bills',
      icon: require('../assets/paybills.png'),
      onPress: () => console.log('Pay Bills pressed'),
    },
    {
      title: 'Convert',
      icon: require('../assets/exchange.png'),
      onPress: () => console.log('Convert pressed'),
    },
  ];

  return (
    <StyledView className="flex-row justify-around items-center bg-[#FCEDD4] px-3 py-3 mt-3 rounded-lg">
      {buttons.map((btn, index) => (
        <StyledView key={index} className="items-center">
          <StyledTouchable
            onPress={btn.onPress}
            className="items-center bg-[#F66B04]/20 rounded-md px-2 py-2"
          >
            <Image source={btn.icon} className="w-6 h-5 mb-1" resizeMode="contain" />
          </StyledTouchable>
          <StyledText className="text-[#F66B04]/80 font-medium text-[12px] mt-1">{btn.title}</StyledText>
        </StyledView>
      ))}
    </StyledView>
  );
};

export default TopNavBar;
