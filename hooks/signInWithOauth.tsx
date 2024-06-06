import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button, Pressable, Text, StyleSheet } from "react-native";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./useWarmUpBrowser";
import { useMutation } from "convex/react";
import { AntDesign } from "@expo/vector-icons";
import { api } from "@/convex/_generated/api";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const setUserData = useMutation(api.user.setUserData);

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }

      // Insert user data into the database
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <AntDesign name="google" size={20} color="red" />
      <Text style={styles.text}>Sign in with Google</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
    elevation: 3,
    backgroundColor: "white",
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    backgroundColor: "transparent",
  },
});

export default SignInWithOAuth;
