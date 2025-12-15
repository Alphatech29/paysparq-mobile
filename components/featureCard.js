import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styled } from 'nativewind';

// Styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const FeatureCard = ({
  title,
  description,
  buttonText,
  onTradeNow,
  backgroundColor = '#F5EBDD',
  icon,
}) => {
  return (
    <StyledView className="rounded-xl overflow-hidden relative" style={{ backgroundColor }}>
      {/* Background Icon */}
      {icon ? (
        <StyledView className="absolute  -right-1 top-1 opacity-40">
          <Image
            source={icon}
            className="w-36 h-36"
            style={{ transform: [{ rotate: '0deg' }] }}
            resizeMode="contain"
          />
        </StyledView>
      ) : (
        <StyledView className="absolute -top-8 -right-8 opacity-40">
          <Feather
            name="gift"
            size={150}
            color="rgba(200, 200, 200, 0.5)"
            style={{ transform: [{ rotate: '15deg' }] }}
          />
        </StyledView>
      )}

      {/* Content */}
      <StyledView className="px-4 py-4">
        <StyledText className="text-[#331B00] font-bold text-base mb-2">
          {title}
        </StyledText>
        <StyledText className="text-[#331B00] text-[12px] leading-5 mb-5">
          {description}
        </StyledText>

        {/* Render button only if buttonText is provided */}
        {buttonText && (
          <StyledTouchable
            className="bg-[#F66B04]/90 rounded-lg py-1 px-2 self-start"
            onPress={onTradeNow}
            activeOpacity={0.7}
          >
            <StyledText className="text-white font-semibold text-xs">
              {buttonText}
            </StyledText>
          </StyledTouchable>
        )}
      </StyledView>
    </StyledView>
  );
};

export default FeatureCard;
