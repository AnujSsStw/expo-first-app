import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View, ViewBase } from "react-native";
import { create } from "react-test-renderer";

export default function App() {
  const { isSignedIn, isLoaded, user } = useUser();
  const isUserPremium = useQuery(api.user.isUserPremium);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20, flex: 1 };
  if (!isSignedIn || !isLoaded) {
    return null;
  }

  async function handlePayment(duration: number, price: number) {
    // load a image of qr code
    // showModal();
    router.push(`/pay?duration=${duration}&price=${price}`);
    // Alert.alert("Buy Now", `Pay ${price} for ${duration} months`, [
    //   {
    //     text: "Cancel",
    //     onPress: () => console.log("Cancel Pressed"),
    //     style: "cancel",
    //   },
    //   {
    //     text: "OK",
    //     onPress: () => {
    //       console.log("OK Pressed");
    //     },
    //   },
    // ]);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <MaterialCommunityIcons
          name="crown"
          size={310}
          style={[isUserPremium ? { color: "gold" } : { color: "black" }]}
        />
      }
      p={16}
    >
      <ThemedText type="defaultSemiBold">
        User Name: {user.firstName}
      </ThemedText>
      <ThemedText type="defaultSemiBold">
        Email: {user.emailAddresses[0].emailAddress}
      </ThemedText>
      <ThemedText type="defaultSemiBold">
        Active Plan: {isUserPremium ? "Premium" : "Free"}
      </ThemedText>
      <ThemedText type="defaultSemiBold">
        Expire Date: {isUserPremium ? "date" : "00-00-0000"}
      </ThemedText>

      {!isUserPremium && (
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginVertical: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Pick a membership that fits you
          </Text>
          {plans.map((item, index) => (
            <ThemedView
              key={index}
              style={{
                marginVertical: 10,
                backgroundColor: "rgb(35, 34, 41)",
                borderRadius: 20,
                padding: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  gap: 10,
                  paddingTop: 10,
                  paddingHorizontal: 10,
                  alignItems: "center",
                }}
              >
                {item.icon}
                <ThemedText type="subtitle">{item.title}</ThemedText>
              </View>
              <View
                style={{
                  flex: 1,
                  gap: 3,
                  paddingTop: 10,
                  paddingHorizontal: 10,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: "gray",
                  }}
                >
                  Monthly
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  {item.price}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: "white",
                  }}
                >
                  {item.subtitle}
                </Text>
              </View>
              <View
                style={{
                  width: "93%",
                  marginHorizontal: "auto",
                  borderTopWidth: 1,
                  borderTopColor: "white",
                  marginTop: 10,
                }}
              >
                <Pressable
                  style={{
                    padding: 10,
                    borderRadius: 130,
                    backgroundColor: "gold",
                    margin: 10,
                  }}
                  onPress={() => {
                    handlePayment(item.duration, item.number_price);
                  }}
                >
                  <Text style={{ color: "black", textAlign: "center" }}>
                    Buy Now
                  </Text>
                </Pressable>
              </View>
            </ThemedView>
          ))}

          <ThemedText
            style={{
              textAlign: "center",
              fontSize: 20,
              marginVertical: 20,
              fontWeight: "bold",
            }}
          >
            Why Upgrade to Premium?
          </ThemedText>
          {list.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
                gap: 10,
              }}
            >
              <AntDesign name="checkcircleo" size={24} color="gold" />
              <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
            </View>
          ))}
        </View>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  icon: {
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: "#AF47D2",
    padding: 8,
  },
});
const plans = [
  {
    subtitle: "1 Month Plan",
    price: "₹149/month",
    duration: 1,
    title: "Basic",
    icon: (
      <AntDesign style={styles.icon} name="staro" size={30} color="black" />
    ),
    number_price: 149,
  },
  {
    subtitle: "Silver 3 Month Plan",
    price: "₹199/month",
    duration: 3,
    icon: (
      <AntDesign style={styles.icon} name="staro" size={30} color="black" />
    ),
    title: "Silver",
    number_price: 199,
  },
  {
    subtitle: "Platinum 1 Yesr Plan + 1 Month Free",
    price: "₹299/month",
    duration: 13,
    icon: (
      <MaterialCommunityIcons
        style={styles.icon}
        name="crown-outline"
        size={30}
        color="black"
      />
    ),
    title: "Platinum",
    number_price: 299,
  },
];
const list = [
  {
    title: "Ad-free videos",
    description: "Enjoy ad-free videos.",
  },
  {
    title: "Unlimited Streaming",
    description: "Unlimited streaming of all the videos.",
  },
  {
    title: "New Web Series Realease Every Week",
    description: "Watch new web series every week.",
  },
  {
    title: "Full access to all the Premium content",
    description: "Watch all the premium content.",
  },
];
