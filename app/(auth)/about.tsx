import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, ScrollView, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Icon } from "../(public)/_layout";

export default function About() {
  return (
    <ScrollView>
      <ThemedView style={{ padding: 16 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Image
            source={{ uri: Icon }}
            style={{
              width: 200,
              height: 50,
            }}
          />
        </View>
        <ThemedText type="subtitle">
          Buckle Up for Silliness with SillyTV!
        </ThemedText>
        <ThemedText
          style={{
            marginVertical: 10,
          }}
        >
          Welcome to SillyTV, your one-stop shop for laughter, giggles, and the
          occasional snort-induced beverage expulsion (we've all been there).
          Dive into a treasure trove of shows and movies guaranteed to tickle
          your funny bone, from classic comedies to quirky indie gems.
        </ThemedText>
        <ThemedText type="subtitle">
          Why Choose SillyTV? Here's Why You'll Be Saying "Tee Hee" All the Way:
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          <Entypo name="dot-single" size={24} color="white" /> No Buffering
          Blues: Stream seamlessly without interruptions so you can fully focus
          on the hilarity.
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          <Entypo name="dot-single" size={24} color="white" /> Smile-inducing
          Recommendations: Our clever app learns your sense of humor and
          suggests shows and movies you're sure to love, keeping the laughter
          coming.
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          <Entypo name="dot-single" size={24} color="white" /> Can't-Miss
          Originals (if applicable): We produce exclusive, laugh-out-loud
          content you won't find anywhere else. Get ready for side-splitting
          discoveries!
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          <Entypo name="dot-single" size={24} color="white" /> High-Def
          Silliness (if applicable): Experience your favorite comedies in
          stunning clarity with crisp HD or even 4K resolution for an immersive
          viewing experience.
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}
