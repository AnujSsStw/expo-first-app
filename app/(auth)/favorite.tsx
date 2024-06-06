import { api } from "@/convex/_generated/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function Favorite() {
  const userfavorite = useQuery(api.user.getUserfavorite);
  if (!userfavorite) {
    return null;
  }

  return (
    <ScrollView>
      <View
        style={[
          userfavorite.length < 3
            ? {}
            : {
                justifyContent: "center",
              },
          { flexDirection: "row", flexWrap: "wrap" },
        ]}
      >
        {userfavorite.map((step, index) => (
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
    </ScrollView>
  );
}
