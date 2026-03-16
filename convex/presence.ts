import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const update = mutation({
  args: { boardId: v.id("boards"), x: v.number(), y: v.number() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return;

    const user = await ctx.db
      .query("users")
      .withIndex("by_externalId", (q) => q.eq("externalId", identity.subject))
      .unique();

    if (!user) return;

    // Cari apakah data presence user ini sudah ada di board ini
    const existing = await ctx.db
      .query("presence")
      .withIndex("by_boardId", (q) => q.eq("boardId", args.boardId))
      .filter((q) => q.eq(q.field("userId"), user._id))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        x: args.x,
        y: args.y,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("presence", {
        boardId: args.boardId,
        userId: user._id,
        userName: user.name,
        x: args.x,
        y: args.y,
        updatedAt: Date.now(),
      });
    }
  },
});

// convex/presence.ts

export const list = query({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    // Cari tahu siapa saya (untuk filtering)
    const me = await ctx.db
      .query("users")
      .withIndex("by_externalId", (q) => q.eq("externalId", identity.subject))
      .unique();

    const threshold = Date.now() - 10000; // 10 detik terakhir

    const presences = await ctx.db
      .query("presence")
      .withIndex("by_boardId", (q) => q.eq("boardId", args.boardId))
      .filter((q) => q.gt(q.field("updatedAt"), threshold))
      .collect();

    // FILTER: Kembalikan kursor SEMUA ORANG kecuali kursor SAYA SENDIRI
    return presences.filter((p) => p.userId !== me?._id);
  },
});

export const getActiveUsers = query({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    const threshold = Date.now() - 1000*60*3; // Aktif dalam 3 menit terakhir

    const active = await ctx.db
      .query("presence")
      .withIndex("by_boardId", (q) => q.eq("boardId", args.boardId))
      .filter((q) => q.gt(q.field("updatedAt"), threshold))
      .collect();

    const activeWithProfiles = await Promise.all(
      active.map(async (presence) => {
        const user = await ctx.db.get(presence.userId);
        return {
          ...presence,
          userName: user?.name ?? presence.userName,
          userImage: user?.image,
        };
      }),
    );

    return activeWithProfiles;
  },
});
