import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const InputField = ({
  value,
  onChangeText,
  placeholder = "",
  secureTextEntry = false,
  error = "",
  className = "",
  rightIcon = null,
  keyboardType = "default",
  textContentType = "none",
  autoCapitalize = "none",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  let borderColor = "#9F3E0D";
  if (error) borderColor = "#FF3B30";
  else if (isFocused) borderColor = "#F66B04";

  return (
    <StyledView className={`mb-4 ${className}`}>
      <StyledView
        className="flex-row items-center border-full rounded-md py-4 px-2 bg-white/50"
        style={{ borderColor, borderWidth: 1 }}
      >
        <StyledTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          textContentType={textContentType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          className="flex-1 text-[#451805]"
          placeholderTextColor="rgba(159, 62, 13, 0.5)"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </StyledView>

      {error ? (
        <StyledText className="text-red-500 text-sm mt-1">{error}</StyledText>
      ) : null}
    </StyledView>
  );
};

export default InputField;
