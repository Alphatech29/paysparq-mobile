import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styled } from "nativewind";

const StyledTouchable = styled(TouchableOpacity);
const StyledText = styled(Text);

const CustomButton = ({
  title,
  onPress,
  disabled = false,
  bgColor = "#F66B04",
  textColor = "#FFFFFF",
  className = "",
  textClassName = "",
  borderColor = null,
  activeOpacity = 0.8,
}) => {
  return (
    <StyledTouchable
      disabled={disabled}
      onPress={onPress}
      activeOpacity={disabled ? 1 : activeOpacity}
      className={`py-4 px-6 rounded-xl ${className}`}
      style={{
        backgroundColor: disabled ? "rgba(246, 107, 4, 0.4)" : bgColor,
        borderWidth: borderColor ? 1 : 0,
        borderColor: borderColor || "transparent",
        opacity: disabled ? 0.8 : 1,
      }}
    >
      <StyledText
        className={textClassName}
        style={{ color: textColor }}
      >
        {title}
      </StyledText>
    </StyledTouchable>
  );
};

export default CustomButton;
