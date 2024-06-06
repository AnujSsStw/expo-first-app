import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useSingleFlight from "@/hooks/useSingleFlight";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { router } from "expo-router";
import { useState } from "react";

export default function TabTwoScreen() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    {
      id: Id<"videos">;
      thumbnail: string;
      isFree: boolean;
    }[]
  >([]);
  const search = useSingleFlight(useMutation(api.video.searchVideos));

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Feather
          style={{
            color: "#808080",
            bottom: -50,
            left: -25,
            position: "absolute",
            zIndex: -1,
          }}
          name="search"
          size={310}
          color="white"
        />
      }
      p={4}
    >
      <View style={styles.titleContainer}>
        <TextInput
          autoCapitalize="none"
          placeholder="Search"
          value={query}
          onChangeText={(text) => setQuery(text)}
          style={{
            fontSize: 16,
            backgroundColor: "#fff",
            width: "95%",
            height: 50,
            borderWidth: 1,
            borderColor: "#6c47ff",
            borderRadius: 100,
            padding: 10,
          }}
          onKeyPress={(e) => {
            search({ query }).then((res) => {
              setSearchResults(res);
            });
          }}
        />
      </View>

      <View
        style={[
          searchResults.length < 3
            ? {}
            : {
                justifyContent: "center",
              },
          { flexDirection: "row", flexWrap: "wrap" },
        ]}
      >
        {searchResults.map((step, index) => (
          <Pressable
            onPress={() => {
              // router.replace(`/video/${step.id}`);
              router.push(`/video/${step.id}`);
            }}
            key={index}
            style={{
              width: 100,
              height: 150,
              margin: 8,
              gap: 8,
              marginBottom: 8,
            }}
          >
            <Image
              source={{ uri: step.thumbnail }}
              style={{ width: 100, height: 150 }}
            />
            {step.isFree ? null : (
              <MaterialCommunityIcons
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  borderRadius: 10,
                  padding: 5,
                }}
                name="crown"
                size={20}
                color="gold"
              />
            )}
          </Pressable>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
});
