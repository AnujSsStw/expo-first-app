import type { PropsWithChildren, ReactElement } from "react";
import { Image, StyleSheet, useColorScheme } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { StatusBar } from "expo-status-bar";
import { Icon } from "@/app/(public)/_layout";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  headerHeight?: number;
  p?: number;
  icon?: boolean;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  headerHeight,
  p = 32,
  icon = false,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
            { height: headerHeight ?? HEADER_HEIGHT, overflow: "hidden" },
          ]}
        >
          {headerImage}
          {icon && (
            <Image
              source={{
                uri: Icon,
              }}
              style={{
                width: 180,
                height: 50,
                position: "absolute",
                bottom: 4,
                right: 0,
                zIndex: 9999,
              }}
            />
          )}
        </Animated.View>
        <ThemedView style={[styles.content, { padding: p }]}>
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 450,
    overflow: "hidden",
    borderRadius: 12,
  },
  content: {
    flex: 1,
    gap: 16,
    overflow: "hidden",
  },
});
