import { Alert, Image, Text, View } from "react-native";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as Clipboard from "expo-clipboard";

export default function Pay() {
  const local = useLocalSearchParams<{
    duration: string;
    price: string;
  }>();
  console.log(local);

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        padding: 20,
      }}
    >
      <ThemedText
        type="subtitle"
        style={{
          textAlign: "center",
        }}
      >
        Pay {local.price} at this Qr code or{" "}
        <ThemedText
          type="subtitle"
          style={{
            textDecorationLine: "underline",
          }}
          onPress={async () => {
            await Clipboard.setStringAsync("paytmqr12c6jn0jmo@paytm");
            Alert.alert("UPI id copied to clipboard");
          }}
        >
          upi id
        </ThemedText>{" "}
        for your {local.duration} months plan
      </ThemedText>
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_CONVEX_URL}/api/storage/4c24db81-7851-46fd-9c12-3157f96f28b7`,
        }}
        style={{ width: 200, height: 200 }}
      />
      <ThemedText
        style={{
          textAlign: "center",
        }}
        type="defaultSemiBold"
      >
        After payment, send the proof of payment to our email at{" "}
        <ThemedText
          type="link"
          onPress={async () => {
            await Clipboard.setStringAsync("headlesss154@gmail.com");
            Alert.alert("Email copied to clipboard");
          }}
        >
          headlesss154@gmail.com
        </ThemedText>{" "}
        with you registerd mail and we will activate your account within 24
        hours
      </ThemedText>
    </ThemedView>
  );
}
