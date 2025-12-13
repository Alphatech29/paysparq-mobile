import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { styled } from "nativewind";
import { useRouter } from "expo-router";
import InputField from "../../../components/inputField";
import CustomButton from "../../../components/customButton";
import { Feather } from "@expo/vector-icons"; // 👈 Feather icons for eye

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 hidden by default
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateFields = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (!validateFields()) return;
    router.push("/home");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#FFF7E9]"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-6 py-8 flex-1 relative"
        >
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.push("/onBoarding")}
            className="mb-4 mt-5"
          >
            <StyledText className="text-[#451805] text-base font-semibold">
              ← Back
            </StyledText>
          </TouchableOpacity>

          {/* Header */}
          <StyledView className="mb-12">
            <StyledText className="text-lg font-bold text-[#451805]">
              Welcome Back
            </StyledText>
            <StyledText className="text-sm text-secondary/70 w-[70%]">
             Please enter email and password to login to your account
            </StyledText>
          </StyledView>

          {/* Form Inputs */}
          <StyledView className="space-y-5 mb-8">
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              error={errors.password}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#9F3E0D"
                  />
                </TouchableOpacity>
              }
            />
          </StyledView>

          {/* Forgot Password */}
          <TouchableOpacity
            className="mb-6 self-end absolute bottom-[450px]"
            onPress={() => router.push("/screens/auth/forgot-password")}
          >
            <StyledText className="text-primary font-semibold">
              Forgot Password?
            </StyledText>
          </TouchableOpacity>

          {/* Create Account */}
          <StyledView className="flex-row justify-center mt-7">
            <StyledText className="text-secondary/70 mr-1">
              Not yet a user?
            </StyledText>
            <TouchableOpacity
              onPress={() => router.push("/screens/auth/register")}
            >
              <StyledText className="text-primary font-semibold">
                Create Account
              </StyledText>
            </TouchableOpacity>
          </StyledView>
          {/* Buttons */}
          <StyledView className="space-y-4 mt-3">
            <CustomButton
              title="Sign In"
              onPress={handleLogin}
              className="bg-primary py-4 rounded-2xl shadow-md"
              textClassName="text-white text-base font-semibold text-center"
            />
          </StyledView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
