import { QueueContext } from "@/hooks/context";
import { Stack } from "expo-router/stack";
import { useState } from "react";
export type vv = {
  episode: number;
  season: number;
  thumbnail: string;
  url: string;
  trailer: string;
  isFree: boolean;
};

export default function Layout() {
  const [vv, setVv] = useState<vv | undefined>(undefined);

  return (
    <QueueContext.Provider
      value={{
        state: vv,
        setState: setVv,
      }}
    >
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="video"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="pay"
          options={{
            headerShown: true,
            title: "Pay",
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            headerShown: true,
            title: "About",
          }}
        />
        <Stack.Screen
          name="favorite"
          options={{
            headerShown: true,
            title: "Favorite",
          }}
        />
        <Stack.Screen
          name="privacy"
          options={{
            headerShown: true,
            title: "Privacy Policy",
          }}
        />
        <Stack.Screen
          name="request"
          options={{
            headerShown: true,
            title: "Request",
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: true,
            title: "Profile",
          }}
        />
      </Stack>
    </QueueContext.Provider>
  );
}
