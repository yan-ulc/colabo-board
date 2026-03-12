import { v } from "convex/values";
import { mutation, query} from "./_generated/server";

export const create= mutation({
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

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    // 1. Cari user internal kita
    const user = await ctx.db
      .query("users")
      .withIndex("by_externalId", (q) => q.eq("externalId", identity.subject))
      .unique();

    if (!user) return [];

    // 2. Ambil semua board dimana user ini adalah Owner
    const boards = await ctx.db
      .query("boards")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", user._id))
      .collect();

    // Tips: Kedepannya kita bisa tambah logic buat ambil board 
    // dimana user ini adalah "member" di tabel board_members
    
    return boards;
  },
});

// convex/boards.ts


// Fungsi Rename
export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { title: args.title });
  },
});

// Fungsi Hapus
export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    // 1. Hapus Board-nya
    await ctx.db.delete(args.id);
    
    // 2. (Opsional tapi Pro) Hapus semua notes yang ada di board ini agar database bersih
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_boardId", (q) => q.eq("boardId", args.id))
      .collect();
    
    for (const note of notes) {
      await ctx.db.delete(note._id);
    }
  },
});