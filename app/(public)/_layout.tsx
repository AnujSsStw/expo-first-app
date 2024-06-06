import React from "react";
import { Stack } from "expo-router";
import { Image } from "react-native";

export const Icon = `https://ceaseless-lobster-627.convex.cloud/api/storage/ce2428af-83ad-4da9-8d4a-fc32fe04aa9a`;
const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#006769",
        },
        headerLeft: () => (
          <Image
            source={{ uri: Icon }}
            style={{
              width: 145,
              height: 40,
            }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          headerTitle: "",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="password-reset"
        options={{
          headerTitle: "",
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;
