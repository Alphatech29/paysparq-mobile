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
  Dimensions,
} from "react-native";
import { styled } from "nativewind";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

import InputField from "../../../components/inputField";
import CustomButton from "../../../components/customButton";
import Toast from "../../../components/toast";
import LoadingSpinner from "../../../components/loadingSpinner";
import { withTimeout } from "../../../utilities/withTimeout";
import { retryRequest } from "../../../utilities/retryRequest";
import { loginUser } from "../../../utilities/auth";
import { useAuth } from "../../../context/authContext";

const StyledView = styled(View);
const StyledText = styled(Text);
const { height } = Dimensions.get("window");

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info",
    position: "top",
  });
  const [loading, setLoading] = useState(false);

  const showToast = (message, type = "info", position = "top") => {
    setToast({ visible: true, message, type, position });
    setTimeout(
      () => setToast((prev) => ({ ...prev, visible: false })),
      3000
    );
  };

  const isFormInvalid = !email.trim() || !password.trim() || loading;

  const handleLogin = async () => {
    if (isFormInvalid) return;

    setLoading(true);

    try {
      const result = await retryRequest(() =>
        withTimeout(loginUser(email, password), 12000)
      );

      if (result?.success) {
        await login({
          accessToken: result.tokens.accessToken,
          refreshToken: result.tokens.refreshToken,
        });

        showToast("Login successful!", "success", "bottom");
      } else {
        showToast(result?.message || "Login failed", "error", "bottom");
      }
    } catch (error) {
      const message =
        error.message === "NETWORK_TIMEOUT"
          ? "Network error. Please try again."
          : error.message || "Unable to connect. Please try again later.";

      showToast(message, "error", "top");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#FFF7E9]"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: height * 0.05,
          }}
          className="px-6 py-8 relative"
        >
          <TouchableOpacity
            onPress={() => router.push("/index")}
            className="mb-4 mt-5"
          >
            <StyledText className="text-[#451805] text-base font-semibold">
              ← Back
            </StyledText>
          </TouchableOpacity>

          <StyledView className="mb-12">
            <StyledText className="text-2xl font-bold text-[#451805]">
              Welcome Back
            </StyledText>
            <StyledText className="text-sm text-secondary/70 w-[70%]">
              Please enter your email and password to login to your account.
            </StyledText>
          </StyledView>

          <StyledView className="space-y-5 mb-8">
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
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

          <StyledView className="space-y-4 mt-3">
            <CustomButton
              title={loading ? "Signing In..." : "Sign In"}
              onPress={handleLogin}
              disabled={isFormInvalid}
              textClassName="text-white text-base font-semibold text-center"
            />
          </StyledView>
        </ScrollView>
      </TouchableWithoutFeedback>

      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast((prev) => ({ ...prev, visible: false }))
          }
          position={toast.position}
        />
      )}

      <LoadingSpinner visible={loading} message="Signing in..." />
    </KeyboardAvoidingView>
  );
}
