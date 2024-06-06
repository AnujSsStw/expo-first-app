import { Id } from "@/convex/_generated/dataModel";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, View } from "react-native";
import { ThemedText } from "./ThemedText";

export const CategoryView = ({
  category,
  videosList,
}: {
  category: string;
  videosList:
    | {
        id: Id<"videos">;
        thumbnail: string;
        isFree: boolean;
        category: string;
      }[]
    | undefined;
}) => {
  return (
    <View>
      <ThemedText type="title" style={{ marginTop: 10 }}>
        {category} <Entypo name="list" size={24} color="white" />
      </ThemedText>
      {videosList === undefined ? (
        <ThemedText type="defaultSemiBold" style={{ marginTop: 10 }}>
          Loading...
        </ThemedText>
      ) : (
        <ScrollView horizontal={true}>
          {videosList.map((step, index) => (
            <Pressable
              onPress={() => {
                // router.replace(`/video/${step.id}`);
                router.push(`/video/${step.id}`);
              }}
              key={index}
              style={{ margin: 8, gap: 8, marginBottom: 8 }}
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
        </ScrollView>
      )}
    </View>
  );
};
