import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    isPremium: v.boolean(),
    favorite: v.array(v.id("videos")),
  }).index("by_clerkId", ["clerkId"]),
  user_request: defineTable({
    user_id: v.id("user"),
    email: v.string(),
    request: v.string(),
  }),
  videos: defineTable({
    title: v.string(),
    video: v.array(
      v.object({
        episode: v.number(),
        season: v.number(),
        thumbnail: v.string(),
        url: v.string(),
        trailer: v.string(),
      })
    ),
    thumbnail: v.string(),
    isFree: v.boolean(),
    description: v.string(),
    seasons: v.number(),
    category: v.string(),
  }).searchIndex("search_title", {
    searchField: "title",
  }),
  featureVideos: defineTable({
    url: v.string(),
    video_id: v.id("videos"),
  }),
});
