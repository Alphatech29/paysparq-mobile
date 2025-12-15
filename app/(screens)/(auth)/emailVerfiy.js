import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { styled } from "nativewind";
import { useRouter } from "expo-router";
import CustomButton from "../../../components/customButton";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

export default function EmailVerify() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleCodeChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    // Move focus to next input
    if (value && index < code.length - 1) {
      const nextInput = `input${index + 1}`;
      if (refs[nextInput]) refs[nextInput].focus();
    }
  };

  const handleSubmit = () => {
    const verificationCode = code.join("");
    console.log("Submitted code:", verificationCode);
    // Navigate after verification
    router.push("/screens/auth/reset-password");
  };

  const refs = {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#FFF7E9]"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-8 justify-center">
        {/* Header */}
        <StyledView className="mb-8">
          <StyledText className="text-2xl font-bold text-[#451805] mb-2">
            Verify Your Email
          </StyledText>
          <StyledText className="text-[#451805]/70 text-sm">
            Enter the 6-digit code sent to your email to continue.
          </StyledText>
        </StyledView>

        {/* OTP Input */}
        <StyledView className="flex-row justify-between mb-6">
          {code.map((item, index) => (
            <StyledTextInput
              key={index}
              ref={(input) => (refs[`input${index}`] = input)}
              value={item}
              onChangeText={(value) => handleCodeChange(value.replace(/[^0-9]/g, ""), index)}
              keyboardType="number-pad"
              maxLength={1}
              className="border border-[#9F3E0D] rounded-lg w-12 h-12 text-center text-[#451805] text-lg"
              placeholder="-"
              placeholderTextColor="rgba(159,62,13,0.5)"
            />
          ))}
        </StyledView>

        {/* Resend */}
        <StyledView className="flex-row justify-center mb-8">
          <StyledText className="text-[#451805]/70 text-sm">
            Didn't receive the code?{" "}
          </StyledText>
          <TouchableOpacity onPress={() => console.log("Resend code")}>
            <StyledText className="text-[#F66B04] font-semibold text-sm">
              Resend
            </StyledText>
          </TouchableOpacity>
        </StyledView>
        <StyledView className="flex-row justify-start mt-5">
          <StyledText className="text-[#451805]/70 text-start text-sm">
            If <StyledText className="text-primary">paysparq@gmail.com</StyledText> is incorrect, please go back and change it. Ensuring the correct email address is crucial for receiving important updates and notifications from our service.
          </StyledText>
        </StyledView>

        {/* Submit Button */}
        <CustomButton
          title="Verify Email"
          onPress={handleSubmit}
          bgColor="#F66B04"
          textColor="#FFFFFF"
          className="py-4 rounded-xl"
        />


      </ScrollView>
    </KeyboardAvoidingView>
  );
}
