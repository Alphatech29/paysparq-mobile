import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import CustomButton from "../../components/customButton";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Dashboard() {
  return (
    <StyledView className="flex-1 bg-[#FCEDD4] px-6 pt-12">
      <StyledText className="text-3xl font-bold text-[#451805] mb-6">Welcome Back!</StyledText>

      <ScrollView className="flex-1 space-y-6">
        <StyledView className="bg-white p-4 rounded-xl shadow-lg">
          <StyledText className="text-[#451805] font-semibold text-lg mb-2">Account Balance</StyledText>
          <StyledText className="text-2xl font-bold text-[#F66B04]">$12,450</StyledText>
        </StyledView>

        <StyledView className="bg-white p-4 rounded-xl shadow-lg">
          <StyledText className="text-[#451805] font-semibold text-lg mb-2">Recent Transactions</StyledText>
          <StyledView className="space-y-2">
            <StyledText className="text-[#451805]">- $50: Grocery</StyledText>
            <StyledText className="text-[#451805]">- $120: Electricity</StyledText>
            <StyledText className="text-[#451805]">+ $500: Salary</StyledText>
          </StyledView>
        </StyledView>

        <CustomButton
          title="Send Money"
          onPress={() => console.log("Send Money pressed")}
          className="bg-[#F66B04] py-4 rounded-xl"
          textClassName="text-white text-base font-semibold text-center"
        />

        <CustomButton
          title="Request Money"
          onPress={() => console.log("Request Money pressed")}
          className="bg-[#451805] py-4 rounded-xl"
          textClassName="text-white text-base font-semibold text-center"
        />
      </ScrollView>
    </StyledView>
  );
}
