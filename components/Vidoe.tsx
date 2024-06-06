import { api } from "@/convex/_generated/api";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "convex/react";
import { ResizeMode, Video } from "expo-av";
import { router } from "expo-router";
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Pressable, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

export function VideoScreen() {
  const [status, setStatus] = useState<any>({} as any);
  const videos = useQuery(api.video.getFeatureVideos);
  const ref = useRef<any>();
  const [page, setPage] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef([] as RefObject<Video>[]);

  useEffect(() => {
    if (status.didJustFinish) {
      if (page === videos!.length - 1) {
        ref.current?.setPage(0);
      } else {
        ref.current?.setPage(page + 1);
      }
    }
  }, [status]);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      (async () => {
        if (videoRefs.current.length > 0) {
          for (const ref of videoRefs.current) {
            try {
              await ref.current?.playAsync();
            } catch (error) {
              console.log("in the slideshow video error", error);
            }
          }
        }
      })();

      return async () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log("unmounting");
        for (const ref of videoRefs.current) {
          await ref.current?.pauseAsync();
        }
      };
    }, [])
  );

  if (!videos) return;
  videoRefs.current = videos.map(
    (_, i) => videoRefs.current[i] ?? React.createRef()
  );

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <PagerView
        style={styles.container}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
        scrollEnabled={true}
        ref={ref}
      >
        {videos?.map((video, index) => (
          <View key={index} style={{ flex: 1 }}>
            <Pressable
              onPress={() => {
                // videoRefs.current[index]?.current?.unloadAsync();
                router.push(`/video/${video.video_id}`);
              }}
            >
              <Video
                ref={videoRefs.current[index]}
                style={styles.video}
                source={{
                  uri: video.url,
                }}
                resizeMode={ResizeMode.CONTAIN}
                isLooping={true}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                useNativeControls={false}
                isMuted={isMuted}
                shouldPlay={page === index ? true : false}
              />
            </Pressable>
            {!isMuted ? (
              <Feather
                style={styles.vol}
                name="volume-2"
                size={28}
                color="black"
                onPress={() => setIsMuted(!isMuted)}
              />
            ) : (
              <Feather
                style={styles.vol}
                name="volume-x"
                size={28}
                color="black"
                onPress={() => setIsMuted(!isMuted)}
              />
            )}
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  vol: {
    position: "absolute",
    bottom: 20,
    left: 10,
    zIndex: 100,
    color: "white",
  },
  video: {
    alignSelf: "center",
    width: 350,
    height: 600,
  },
  container: {
    flex: 1,
  },
});
