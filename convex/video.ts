import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getVideo = query({
  args: {
    id: v.id("videos"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("videos")
      .withIndex("by_id", (q) => q.eq("_id", args.id))
      .unique();
  },
});

export const getOriginalsVideos = query({
  handler: async (ctx) => {
    const data = await ctx.db
      .query("videos")
      .filter((q) => q.eq(q.field("category"), "Originals"))
      .collect();

    return data.map((video) => ({
      id: video._id,
      thumbnail: video.thumbnail,
      isFree: video.isFree,
      category: video.category,
    }));
  },
});
export const getNewReleasesVideos = query({
  handler: async (ctx) => {
    const data = await ctx.db
      .query("videos")
      .filter((q) => q.eq(q.field("category"), "New_Releases"))
      .collect();

    return data.map((video) => ({
      id: video._id,
      thumbnail: video.thumbnail,
      isFree: video.isFree,
      category: video.category,
    }));
  },
});
export const getMostWatchedVideos = query({
  handler: async (ctx) => {
    const data = await ctx.db
      .query("videos")
      .filter((q) => q.eq(q.field("category"), "Most_Watched"))
      .collect();

    return data.map((video) => ({
      id: video._id,
      thumbnail: video.thumbnail,
      isFree: video.isFree,
      category: video.category,
    }));
  },
});

export const searchVideos = mutation({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("videos")
      .withSearchIndex("search_title", (q) => q.search("title", args.query))
      .take(10);

    return data.map((video) => ({
      id: video._id,
      thumbnail: video.thumbnail,
      isFree: video.isFree,
    }));
  },
});

export const getFeatureVideos = query({
  handler: async (ctx) => {
    const data = await ctx.db.query("featureVideos").order("asc").take(5);

    return data;
  },
});
