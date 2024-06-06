import { useUser } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Profile() {
  const { user, isLoaded } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName as string);
  if (!isLoaded) {
    return null;
  }

  const onSaveUser = async () => {
    try {
      await user?.update({ firstName: firstName as string });
      console.log("User updated");
      router.back();
    } catch (error) {
      console.log("Error updating user", error);
    }
  };

  return (
    <LinearGradient
      colors={["#F2CD5C", "#F2921D", "#FFBF78", "#FF7D29"]}
      style={{
        height: "100%",
        flex: 1,
        justifyContent: "center",
        padding: 16,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        {user?.hasImage ? (
          <Image
            source={{
              uri: user?.imageUrl,
            }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
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
            size={100}
            color="white"
          />
        )}
        <Text
          style={{
            fontSize: 16,
            color: "white",
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          {user?.emailAddresses[0].emailAddress}
        </Text>
      </View>

      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        style={styles.inputField}
      />
      <Pressable style={styles.button} onPress={onSaveUser}>
        <Text style={styles.L}>Update userName</Text>
      </Pressable>
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
