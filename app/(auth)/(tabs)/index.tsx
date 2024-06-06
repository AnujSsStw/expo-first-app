import { CategoryView } from "@/components/Category";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { VideoScreen } from "@/components/Vidoe";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Spinner from "react-native-loading-spinner-overlay";

export default function HomeScreen() {
  const originalsVideoList = useQuery(api.video.getOriginalsVideos);
  const most_watedVideoList = useQuery(api.video.getMostWatchedVideos);
  const new_releaseVideoList = useQuery(api.video.getNewReleasesVideos);

  if (!originalsVideoList || !most_watedVideoList || !new_releaseVideoList) {
    return <Spinner visible={true} />;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<VideoScreen />}
      headerHeight={450}
      p={10}
      icon={true}
    >
      <CategoryView category="Originals" videosList={originalsVideoList} />
      <CategoryView category="New Releases" videosList={new_releaseVideoList} />
      <CategoryView category="Most Watched" videosList={most_watedVideoList} />
    </ParallaxScrollView>
  );
}
