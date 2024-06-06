import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function About() {
  const [emailAddress, setEmailAddress] = useState("");
  const [request, setRequest] = useState("");
  const setRequestm = useMutation(api.user.setUserRequest);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 16,
      }}
    >
      <View style={{}}>
        <TextInput
          autoCapitalize="none"
          placeholder="simon@galaxies.dev"
          value={emailAddress}
          onChangeText={setEmailAddress}
          style={styles.inputField}
        />
        <TextInput
          style={[styles.inputField, { height: "auto" }]}
          placeholder="type something here"
          multiline={true}
          onChangeText={setRequest}
        />
        <Pressable
          style={styles.button}
          onPress={async () => {
            await setRequestm({ email: emailAddress, request: request });
            Alert.alert("Request sent");
            router.push("/");
          }}
        >
          <Text style={styles.L}>Send Request</Text>
        </Pressable>
      </View>
    </View>
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
});
