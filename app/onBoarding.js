import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import { styled } from "nativewind";
import { useRouter } from "expo-router";
import CustomButton from "../components/customButton";

const { width } = Dimensions.get("window");

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function Onboarding() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Welcome to Paysparq",
      desc: "Enjoy immediate access to your funds, seamless account management, and a world of financial opportunities right at your fingertips.",
      image: require("../assets/onboard1.png"),
    },
    {
      id: 2,
      title: "Fast and Reliable",
      desc: "Providing you with the best experience is our priority. Trading gift cards is our specialty.",
      image: require("../assets/onboard2.png"),
    },
    {
      id: 3,
      title: "Buy airtime for yourself and other",
      desc: "Buy airtime for anyone in Africa using your local currency, easily and conveniently.",
      image: require("../assets/onboard3.png"),
    },
  ];

  const loopSlides = [...slides, slides[0]];

  const scrollToIndex = (index, animated = true) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: index * width, animated });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      scrollToIndex(nextIndex);

      if (nextIndex === slides.length) {
        setTimeout(() => {
          scrollToIndex(0, false);
          setActiveIndex(0);
        }, 300);
      } else {
        setActiveIndex(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = (event) => {
    const position = Math.round(event.nativeEvent.contentOffset.x / width);
    if (position === slides.length) {
      setActiveIndex(0);
      scrollToIndex(0, false);
    } else {
      setActiveIndex(position);
    }
  };

  return (
    <StyledView className="flex-1 bg-[#FCEDD4] relative">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        onMomentumScrollEnd={handleScroll}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {loopSlides.map((item, index) => (
          <StyledView
            key={index}
            style={{ width }}
            className="justify-center px-6"
          >
            <StyledImage
              source={item.image}
              className="w-[40%] h-[40%] mb-5 self-center"
              resizeMode="contain"
            />

            <StyledText className="text-[40px] font-bold text-[#451805] mb-3">
              {item.title}
            </StyledText>

            <StyledText className="text-sm text-[#451805] mb-4">
              {item.desc}
            </StyledText>
          </StyledView>
        ))}
      </ScrollView>

      {/* Pagination */}
      <StyledView className="absolutely flex-row justify-start px-6 mb-6 bottom-32">
        {slides.map((_, i) => (
          <View
            key={i}
            className={`h-1 w-8 rounded-lg mx-1 ${
              activeIndex === i ? "bg-[#F66B04]" : "bg-[#F66B04]/25"
            }`}
          />
        ))}
      </StyledView>

      {/* Buttons */}
      <StyledView className="px-6 mb-12 flex-col space-y-4">

        <View>
          <CustomButton
            title="Sign In"
            onPress={() => router.push("/screens/auth/login")}
            bgColor="bg-paysparq"
            textColor="text-primary"
            borderColor="#F66B04"
            textClassName="text-primary text-base font-semibold text-center"
          />
        </View>
         <View>
          <CustomButton
            title="Sign Up"
            onPress={() => router.push("/screens/auth/register")}
            className="py-4 rounded-xl"
            textClassName="text-white text-base font-semibold text-center"
          />
        </View>
      </StyledView>
    </StyledView>
  );
}
