import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // Cari user ID internal Convex
    const user = await ctx.db
      .query("users")
      .withIndex("by_externalId", (q) => q.eq("externalId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found in database");

    // Buat Board Baru 
    const boardId = await ctx.db.insert("boards", {
      title: args.title,
      ownerId: user._id,
    });

    // Otomatis masukkan Owner ke tabel member sebagai "approved"
    await ctx.db.insert("board_members", {
      boardId,
      userId: user._id,
      status: "approved",
    });

    return boardId;
  },
});