import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { styled } from "nativewind";
import NetInfo from "@react-native-community/netinfo";
import CustomButton from "../../../components/customButton";
import InputField from "../../../components/inputField";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { registerUser } from "../../../utilities/auth";
import { withTimeout } from "../../../utilities/withTimeout";
import { retryRequest } from "../../../utilities/retryRequest";
import Toast from "../../../components/toast";
import LoadingSpinner from "../../../components/loadingSpinner";

const StyledView = styled(View);
const StyledText = styled(Text);

const { height } = Dimensions.get("window");

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info",
  });
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  const router = useRouter();

  const isFormInvalid =
    !fullName.trim() ||
    !email.trim() ||
    !phone.trim() ||
    !password.trim() ||
    loading;


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const showToast = (message, type = "info") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
  };

  const handleRegister = async () => {
    if (isFormInvalid) return;

    if (isOffline) {
      showToast(
        "You are offline. Please check your internet connection.",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      const result = await retryRequest(() =>
        withTimeout(
          registerUser(fullName, email, password, phone),
          12000
        )
      );

      if (result?.success) {
        showToast("Registration successful!", "success");
        setTimeout(() => router.push("/screens/auth/login"), 1000);
      } else {
        showToast(result?.message || "Registration failed", "error");
      }
    } catch (error) {
      if (error.message === "NETWORK_TIMEOUT") {
        setToast({
          visible: true,
          message: "Network error. Please try again.",
          type: "error",
          position: "top",
        });
      } else {
        setToast({
          visible: true,
          message: "Unable to connect. Please try again later.",
          type: "error",
          position: "top",
        });
      }

      setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#FFF7E9]"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: height * 0.05 }}
        className="px-6 py-8"
      >
        {/* Back */}
        <TouchableOpacity
          onPress={() => router.push("/index")}
          className="mb-4 mt-5"
        >
          <StyledText className="text-[#451805] text-base font-semibold">
            ← Back
          </StyledText>
        </TouchableOpacity>

        {/* Header */}
        <StyledView className="mb-8">
          <StyledText className="text-2xl font-bold text-[#451805]">
            Create An Account
          </StyledText>
          <StyledText className="text-xs text-[#451805]/70">
            Let's get you started with a new account.
          </StyledText>
        </StyledView>

        {/* Offline Banner */}
        {isOffline && (
          <StyledView className="bg-red-100 p-3 rounded-lg mb-4">
            <StyledText className="text-red-600 text-xs text-center font-medium">
              You are currently offline. Some actions may not work.
            </StyledText>
          </StyledView>
        )}

        {/* Inputs */}
        <StyledView className="space-y-4 relative mb-8">
          <InputField
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            autoCapitalize="words"
          />

          <InputField
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <InputField
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />

          <InputField
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#9F3E0D"
                />
              </TouchableOpacity>
            }
          />

          <InputField
            value={referralCode}
            onChangeText={setReferralCode}
            placeholder="Enter referral code"
            autoCapitalize="characters"
          />

          <StyledText className="text-[#451805]/70 text-xs mt-1 absolute -bottom-5">
            Referral code is not compulsory, please leave the box empty if you don't have one.
          </StyledText>
        </StyledView>

        {/* Terms */}
        <StyledView className="mt-6">
          <StyledText className="text-[#451805]/70 text-xs">
            By continuing, you agree to Paysparq's{" "}
            <StyledText className="text-[#F66B04]">Terms of Service</StyledText>{" "}
            and{" "}
            <StyledText className="text-[#F66B04]">Privacy Policy</StyledText>, and Privacy Policy. Please review these documents to understand your rights and obligations before using our services.
          </StyledText>
        </StyledView>

        {/* Actions */}
        <StyledView className="mt-6 space-y-4">
          <CustomButton
            title={loading ? "Registering..." : "Register"}
            onPress={handleRegister}
            disabled={isFormInvalid}
            textClassName="text-white text-base font-semibold text-center"
          />

          <TouchableOpacity onPress={() => router.push("/screens/auth/login")}>
            <StyledText className="text-[#451805] text-center font-semibold">
              Already have an account?{" "}
              <StyledText className="text-[#F66B04]">Login</StyledText>
            </StyledText>
          </TouchableOpacity>
        </StyledView>
      </ScrollView>

      {/* Toast */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
          position={toast.position || "bottom"}
        />
      )}

      {/* Loader */}
      <LoadingSpinner visible={loading} message="Registering..." />
    </KeyboardAvoidingView>
  );
}
