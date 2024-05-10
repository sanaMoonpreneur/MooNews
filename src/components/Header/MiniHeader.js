import { View, Text } from "react-native";
import React from "react";

export default function MiniHeader({ label }) {
  return (
    <View className="px-4 my-4 justify-between flex-row items-center">
      <Text
        className="text-xl text-black dark:text-white "
        style={{
          fontFamily: "FranklinGothic",
        }}
      >
        {label}
      </Text>

      <Text
        className="text-base text-black dark:text-neutral-300 "
        style={{
          fontFamily: "FranklinGothic",
        }}
      >
        View all
      </Text>
    </View>
  );
}
