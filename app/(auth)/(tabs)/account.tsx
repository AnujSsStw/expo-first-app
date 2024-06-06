import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Alert, Image, Pressable, Share, StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { api } from "@/convex/_generated/api";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { FontAwesome5 } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { router } from "expo-router";

export default function Account() {
  const { signOut } = useAuth();
  const { user, isLoaded } = useUser();
  const isPremium = useQuery(api.user.isUserPremium);
  if (!isLoaded) {
    return null;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <MaterialIcons
          name="account-circle"
          size={310}
          style={styles.headerImage}
        />
      }
    >
      {/* <ThemedText type="title">Account</ThemedText> */}
      <Pressable
        onPress={() => {
          router.push("/profile");
        }}
        style={{
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        {user?.hasImage ? (
          <Image
            source={{
              uri: user?.imageUrl,
            }}
            style={{ width: 70, height: 70, borderRadius: 100 }}
          />
        ) : (
          <AntDesign
            style={{
              backgroundColor: "#6c47ff",
              borderRadius: 100,
              borderWidth: 1,
              padding: 4,
            }}
            name="user"
            size={50}
            color="white"
          />
        )}
        <ThemedText
          type="title"
          style={isPremium ? { color: "gold" } : { color: "#FDFFE2" }}
        >
          {user?.firstName}
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          {user?.emailAddresses[0].emailAddress}
        </ThemedText>
      </Pressable>

      {/* <ThemedText type="title">Settings</ThemedText> */}
      <View style={[styles.box, { marginTop: 30 }]}>
        <Pressable
          onPress={() => {
            router.push("/favorite");
          }}
          style={styles.titleContainer}
        >
          <View style={styles.icon}>
            <AntDesign name="staro" size={50} color="black" />
          </View>
          <ThemedText type="defaultSemiBold">Favorites</ThemedText>
        </Pressable>

        <Pressable
          onPress={() => {
            router.push("/request");
          }}
          style={styles.titleContainer}
        >
          <View style={styles.icon}>
            <FontAwesome5 name="laptop-code" size={50} color="black" />
          </View>
          <ThemedText type="defaultSemiBold">Request</ThemedText>
        </Pressable>
      </View>

      <View style={styles.box}>
        <Pressable
          style={styles.titleContainer}
          onPress={() => {
            router.push("/subscription");
          }}
        >
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name="crown-outline"
              size={50}
              color="black"
            />
          </View>
          <ThemedText type="defaultSemiBold">Premium</ThemedText>
        </Pressable>

        <Pressable
          onPress={async () => {
            try {
              const result = await Share.share({
                message:
                  "Hey, Download this amazing app to get the best experience of watching movies and web series. https://play.google.com/store/apps/details?id=com.netflix.mediaclient&hl=en_IN&gl=US",
              });
              if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
            } catch (error: any) {
              // Alert.alert(error.message);
            }
          }}
          style={styles.titleContainer}
        >
          <View style={styles.icon}>
            <AntDesign name="sharealt" size={50} color="black" />
          </View>
          <ThemedText type="defaultSemiBold">Share</ThemedText>
        </Pressable>
      </View>

      <View style={styles.box}>
        <Pressable
          onPress={() => {
            router.push("/privacy");
          }}
          style={styles.titleContainer}
        >
          <View style={styles.icon}>
            <Ionicons name="lock-closed-outline" size={50} color="black" />
          </View>
          <ThemedText type="defaultSemiBold">Privecy</ThemedText>
        </Pressable>

        <Pressable
          onPress={() => {
            Alert.alert(
              "Sign out",
              "Want to Sign out?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Sign out",
                  onPress: async () => {
                    await signOut({ redirectUrl: "/" });
                  },
                },
              ],
              { userInterfaceStyle: "dark" }
            );
          }}
          style={styles.titleContainer}
        >
          <View style={styles.icon}>
            <FontAwesome name="sign-out" size={50} color="black" />
          </View>
          <ThemedText type="defaultSemiBold">Sign out</ThemedText>
        </Pressable>
      </View>

      <Pressable
        onPress={() => {
          router.push("/about");
        }}
        style={styles.titleContainer}
      >
        <View style={styles.icon}>
          <AntDesign name="exclamationcircleo" size={50} color="black" />
        </View>
        <ThemedText type="defaultSemiBold">About Us</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    gap: 80,
    width: "100%",
    justifyContent: "center",
  },
  icon: {
    backgroundColor: "gold",
    // width: 50,
    // height: 50,
    borderRadius: 10,
    padding: 10,
    marginRight: 8,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
});
