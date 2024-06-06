import { Stack, router } from "expo-router";
import { Pressable, Text } from "react-native";

import { AntDesign } from "@expo/vector-icons";
export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        title: "Video",
      }}
    >
      <Stack.Screen
        name="play"
        options={{
          // headerShown: false,
          title: "Play",
        }}
      />
    </Stack>
  );
}
