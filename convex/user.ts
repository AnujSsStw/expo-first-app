import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const setUserRequest = mutation({
  args: {
    email: v.string(),
    request: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    const userid = await ctx.db
      .query("user")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", user?.subject as string))
      .unique();
    if (!userid) {
      console.log("User not found");
      return;
    }

    await ctx.db.insert("user_request", {
      email: args.email,
      request: args.request,
      user_id: userid?._id,
    });
  },
});

export const getUserfavorite = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      console.log("User not found");
      return;
    }

    const userData = await ctx.db
      .query("user")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", user.subject))
      .unique();
    const res = [];
    for (const id of userData?.favorite ?? []) {
      const video = await ctx.db
        .query("videos")
        .filter((q) => q.eq(q.field("_id"), id))
        .unique();
      res.push({
        id: video?._id,
        thumbnail: video?.thumbnail,
        isFree: video?.isFree,
      });
    }

    return res ?? [];
  },
});

export const setuserfavorite = mutation({
  args: {
    videoId: v.id("videos"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      console.log("User not found");
      return;
    }

    const userData = await ctx.db
      .query("user")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", user.subject))
      .unique();

    if (!userData) {
      await ctx.db.insert("user", {
        clerkId: user.subject,
        name: user.name ? user.name : "Ye",
        email: user.email as string,
        favorite: [args.videoId],
        isPremium: false,
      });
      return;
    }

    if (userData.favorite.includes(args.videoId)) {
      await ctx.db.patch(userData._id as Id<"user">, {
        favorite: userData.favorite.filter((id) => id !== args.videoId),
      });
      return;
    }

    await ctx.db.patch(userData._id as Id<"user">, {
      favorite: [...userData.favorite, args.videoId],
    });
  },
});

export const setUserData = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.insert("user", {
      clerkId: user.subject,
      name: args.name,
      email: args.email,
      isPremium: false,
      favorite: [],
    });
  },
});

export const isUserPremium = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      console.log("User not found");
      return;
    }

    // console.log("User", user);

    const userData = await ctx.db
      .query("user")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", user.subject))
      .unique();

    return userData?.isPremium ?? false;
  },
});
