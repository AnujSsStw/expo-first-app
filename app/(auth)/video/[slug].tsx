import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { QueueContext } from "@/hooks/context";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useMutation, useQuery } from "convex/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function ChatsLayout() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [selectedSeason, setSelectedSeason] = useState(0);

  const currVideoDetails = useQuery(api.video.getVideo, {
    id: slug as Id<"videos">,
  });
  const router = useRouter();
  const context = useContext(QueueContext);
  const isUserFavorite = useQuery(api.user.getUserfavorite);
  const setFavorite = useMutation(api.user.setuserfavorite);
  if (!currVideoDetails) {
    return null;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={{ uri: currVideoDetails?.thumbnail }}
          style={styles.headerImage}
        />
      }
      p={15}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText type="title">Overview</ThemedText>
        <Pressable
          onPress={async () => {
            await setFavorite({ videoId: slug as Id<"videos"> });
          }}
        >
          {isUserFavorite?.filter((v) => v.id === slug).length ? (
            <FontAwesome name="star" size={24} color="gold" />
          ) : (
            <Feather name="star" size={24} color="white" />
          )}
        </Pressable>
      </View>
      <ThemedText type="default">{currVideoDetails?.description}</ThemedText>

      <Picker
        selectedValue={selectedSeason}
        onValueChange={(itemValue, itemIndex) => setSelectedSeason(itemValue)}
        style={{
          color: "white",
          backgroundColor: "rgb(5,2,13)",
        }}
      >
        {Array.from({ length: currVideoDetails?.seasons as number }).map(
          (_, index) => (
            <Picker.Item
              key={index}
              label={`Season ${index + 1}`}
              value={index}
            />
          )
        )}
      </Picker>
      <ScrollView horizontal={true}>
        {currVideoDetails?.video
          .filter((v) => v.season - 1 === selectedSeason)
          .map((video, index) => (
            <Pressable
              onPress={() => {
                context?.setState({
                  ...video,
                  isFree: currVideoDetails.isFree,
                });
                router.push(`/video/play`);
              }}
              key={index}
              style={styles.stepContainer}
            >
              <Image
                source={{ uri: video.thumbnail }}
                style={{ width: 200, height: 150 }}
              />
              <ThemedText type="defaultSemiBold">
                Episode {video.episode}
              </ThemedText>
            </Pressable>
          ))}
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    margin: 5,
  },
  headerImage: {
    width: "100%",
    height: 300,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
