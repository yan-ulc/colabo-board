import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 1. QUERY: Mengambil semua notes di satu board
export const getByBoard = query({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    // Kita gunakan index "by_boardId" yang sudah kita buat di schema.ts
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_boardId", (q) => q.eq("boardId", args.boardId))
      .collect();

    return notes;
  },
});

// 2. MUTATION: Membuat note baru
export const create = mutation({
  args: { 
    boardId: v.id("boards"),
    x: v.number(),
    y: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // Ambil user internal kita
    const user = await ctx.db
      .query("users")
      .withIndex("by_externalId", (q) => q.eq("externalId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    // Simpan note baru
    const noteId = await ctx.db.insert("notes", {
      boardId: args.boardId,
      text: "New Note",
      x: args.x,
      y: args.y,
      color: "#fef08a", // Kuning Sticky Note
      lastEditedBy: user._id,
    });

    return noteId;
  },
});

// convex/notes.ts
export const updatePosition = mutation({
  args: { id: v.id("notes"), x: v.number(), y: v.number() },
  handler: async (ctx, args) => {
    // Validasi opsional: Cek apakah user punya akses ke board ini
    await ctx.db.patch(args.id, { 
      x: args.x, 
      y: args.y 
    });
  },
});

export const remove = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // Di sini kamu bisa tambah check: apakah user ini punya akses ke board?
    // Tapi untuk sekarang, kita langsung hapus:
    await ctx.db.delete(args.id);
  },
}); 

// convex/notes.ts

// Fungsi untuk update teks
export const updateText = mutation({
  args: { id: v.id("notes"), text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { text: args.text });
  },
});

// Fungsi untuk ganti warna
export const updateColor = mutation({
  args: { id: v.id("notes"), color: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { color: args.color });
  },
});