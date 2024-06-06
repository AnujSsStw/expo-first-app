import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SignInWithOAuth from "@/hooks/signInWithOauth";
import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import { LinearGradient } from "expo-linear-gradient";
export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#222831", "#393E46", "#00ADB5"]}
      style={{
        padding: 16,
        height: "100%",
      }}
    >
      <Spinner visible={loading} />
      <ThemedText
        type="title"
        style={{
          marginTop: 20,
        }}
      >
        Sign In
      </ThemedText>

      <ThemedText type="default">
        or
        <Link href="/register">
          <ThemedText type="link"> Join Netflix</ThemedText>
        </Link>
      </ThemedText>

      <SignInWithOAuth />

      <View style={styles.dash}>
        <Text style={styles.or}>or</Text>
      </View>

      <TextInput
        autoCapitalize="none"
        placeholder="simon@galaxies.dev"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <Pressable style={styles.button} onPress={onSignInPress}>
        <Text style={styles.L}>Login</Text>
      </Pressable>

      <Link href="/password-reset" style={styles.buttonF}>
        <ThemedText type="link">Forgot password?</ThemedText>
      </Link>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  L: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  or: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  dash: {
    borderTopWidth: 1,
    borderTopColor: "#006769",
    marginVertical: 20,
  },
  link: {
    color: "#6c47ff",
    fontSize: 15,
  },
  container: {
    flex: 1,
    color: "white",
    // justifyContent: "center",
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#006769",
    borderRadius: 7,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  buttonF: {
    margin: 0,
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
    elevation: 3,
    backgroundColor: "#F3CA52",
    marginVertical: 20,
  },
});
