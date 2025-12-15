import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { useRouter } from "expo-router";

import DashboardHeader from "../../../components/dashboardHeader";
import BalanceCard from "../../../components/balanceCard";
import TopNavBar from "../../../components/topNavBar";
import FeatureCard from "../../../components/featureCard";

const StyledText = styled(Text);

export default function Dashboard() {
  const router = useRouter();

  const cardData = [
    {
      title: "Buy and sell gift cards.",
      description:
        "Easily buy and sell gift cards with us, offering a seamless and secure experience for all your gift card transactions.",
      buttonText: "Trade Now",
      backgroundColor: "#F66B040D",
      icon: require("../../../assets/gift-card.png"),
      onPress: () => console.log("Trade Now pressed"),
    },
    {
      title: "Trade cryptocurrencies.",
      description:
        "Effortlessly trade cryptocurrencies and unlock endless financial possibilities today.",
      buttonText: "Trade Now",
      backgroundColor: "#CCD2FF33",
      icon: require("../../../assets/btc.png"),
      onPress: () => console.log("Trade Now pressed"),
    },
    {
      title: "Airtime to Cash",
      description:
        "Easily convert airtime to cash with instant transactions, competitive rates, and secure, reliable service.",
      backgroundColor: "#C0FFFC33",
      icon: require("../../../assets/airtime-cash.png"),
      onPress: () => console.log("Airtime to Cash pressed"),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF9EC" }}>
      <DashboardHeader
        userName="Ceo Alphatech"
        onNotificationPress={() => console.log("Notifications pressed")}
        onProfilePress={() => console.log("Profile pressed")}
      />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <BalanceCard balance={12450} currencySymbol="$" currencyCode="USD" />

        <TopNavBar />

        {/* Feature Cards */}
        <View className="mt-4">
          {cardData.map((card, index) => (
          <View key={index} className={index !== 0 ? "mt-3" : ""}>
            <FeatureCard
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
              backgroundColor={card.backgroundColor}
              icon={card.icon}
              onTradeNow={card.onPress}
            />
          </View>
        ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
