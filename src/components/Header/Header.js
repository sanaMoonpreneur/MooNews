import { Switch, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

export default function Header() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-row justify-between items-center mx-4 mt-4">
      <View className="">
        <Text
          className="text-2xl text-black dark:text-white font-extrabold uppercase"
          style={{
            fontFamily: "FranklinGothic",
          }}
        >
          DAILYNEWS
        </Text>
      </View>

      {/* Switch and Search Icon */}
      <View className="flex-row space-x-4 rounded-full justify-center items-center">
        <Switch value={colorScheme == "dark"} onChange={toggleColorScheme} />

        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          className=" dark:bg-black  rounded-full p-2"
        >
          <MagnifyingGlassIcon
            size={25}
            strokeWidth={2}
            color={colorScheme == "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
