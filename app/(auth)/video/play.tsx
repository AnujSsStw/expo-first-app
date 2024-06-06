import React, { useContext, useRef, useState } from "react";
import { View, StyleSheet, Button, Pressable } from "react-native";
import { Video, ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { QueueContext } from "@/hooks/context";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ThemedText } from "@/components/ThemedText";
import { Link, router, useFocusEffect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

export default function App() {
  const video = useRef<Video>(null);
  // const [status, setStatus] = useState({} as any);
  const context = useContext(QueueContext);
  const isUserPremium = useQuery(api.user.isUserPremium);

  useFocusEffect(
    React.useCallback(() => {
      return async () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log("unmounting");
        await video.current?.unloadAsync();
      };
    }, [])
  );

  // if (!context?.state) {
  //   return <Spinner visible={true} />;
  // }

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri:
            context?.state?.isFree || isUserPremium
              ? (context?.state?.url as string)
              : (context?.state?.trailer as string),
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onLoadStart={async () => {
          try {
            await ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.LANDSCAPE
            );
            await video.current?.playAsync();
          } catch (error) {
            console.log("before loading: ", error);
          }
        }}
        onLoad={async () => {
          await video.current?.presentFullscreenPlayer();
        }}
        onFullscreenUpdate={async (status) => {
          try {
            if (status.fullscreenUpdate === 3) {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
              );
              await video.current?.pauseAsync();
            }

            if (status.fullscreenUpdate === 0) {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE
              );
            }
          } catch (error) {
            console.log("heer", error);
          }
        }}
      />
      {!isUserPremium && !context?.state?.isFree && (
        <Link
          href={`/subscription`}
          style={{
            textAlign: "center",
            margin: 10,
            borderRadius: 20,
            padding: 10,
            borderColor: "white",
            borderWidth: 1,
          }}
        >
          <ThemedText type="defaultSemiBold">
            Buy premium to watch full video{" "}
            <MaterialCommunityIcons
              name="crown-outline"
              size={24}
              color="white"
            />
          </ThemedText>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },
});
