import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

// convex/boards.ts

// convex/boards.ts

export const inviteUser = mutation({
  args: {
    boardId: v.id("boards"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // 1. Cari user yang mau diajak berdasarkan email
    const userToInvite = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();

    if (!userToInvite) {
      throw new Error("User dengan email tersebut belum terdaftar di Collabo.");
    }

    // 2. Cek apakah user tersebut sudah terdaftar di board ini
    const existingMember = await ctx.db
      .query("board_members")
      .withIndex("by_board_and_user", (q) =>
        q.eq("boardId", args.boardId).eq("userId", userToInvite._id),
      )
      .unique();

    if (existingMember) {
      return "User ini sudah diundang sebelumnya.";
    }

    // 3. Masukkan ke tabel board_members dengan status 'approved'
    // Kita set 'approved' supaya temen kamu langsung bisa lihat board-nya di dashboard mereka
    await ctx.db.insert("board_members", {
      boardId: args.boardId,
      userId: userToInvite._id,
      status: "approved", // Sesuai skema: union "pending" | "approved"
    });

    return "Undangan berhasil dikirim!";
  },
});

// convex/boards.ts

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_externalId", (q) => q.eq("externalId", identity.subject))
      .unique();
    if (!user) return [];

    // 1. Board yang saya miliki (Owner)
    const myOwnedBoards = await ctx.db
      .query("boards")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", user._id))
      .collect();

    // 2. Board dimana saya adalah member dan statusnya 'approved'
    const memberships = await ctx.db
      .query("board_members")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("status"), "approved"))
      .collect();

    const sharedBoardIds = memberships.map((m) => m.boardId);

    // Ambil data board untuk setiap ID yang di-share
    const sharedBoards = await Promise.all(
      sharedBoardIds.map((id) => ctx.db.get(id)),
    );

    // Owner juga tersimpan sebagai member, jadi dedupe berdasarkan _id.
    const allBoards = [
      ...myOwnedBoards,
      ...sharedBoards.filter((b) => b !== null),
    ];
    const uniqueBoards = Array.from(
      new Map(allBoards.map((board) => [board._id, board])).values(),
    );

    return uniqueBoards.sort((a, b) => b._creationTime - a._creationTime);
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

// convex/boards.ts

export const joinBoard = mutation({
  args: { boardId: v.string() }, // Kita terima string dulu baru divalidasi
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // 1. Validasi apakah ID-nya valid format Convex
    const id = ctx.db.normalizeId("boards", args.boardId);
    if (!id) throw new Error("Format ID Board tidak valid");

    // 2. Cari user kita
    const user = await ctx.db
      .query("users")
      .withIndex("by_externalId", (q) => q.eq("externalId", identity.subject))
      .unique();
    if (!user) throw new Error("User tidak ditemukan");

    // 3. Cek apakah board-nya beneran ada
    const board = await ctx.db.get(id);
    if (!board) throw new Error("Board tidak ditemukan");

    // 4. Cek apakah user sudah jadi owner (gak perlu join board sendiri)
    if (board.ownerId === user._id) return id;

    // 5. Cek apakah sudah jadi member
    const existingMember = await ctx.db
      .query("board_members")
      .withIndex("by_board_and_user", (q) =>
        q.eq("boardId", id).eq("userId", user._id),
      )
      .unique();

    if (existingMember) {
      if (existingMember.status === "approved") return id;
      // Kalau pending, kita approve aja langsung biar cepet
      await ctx.db.patch(existingMember._id, { status: "approved" });
      return id;
    }

    // 6. Join sebagai member baru
    await ctx.db.insert("board_members", {
      boardId: id,
      userId: user._id,
      status: "approved",
    });

    return id;
  },
});

export const getById = query({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    // Ambil info user yang sedang login
    const user = await ctx.db
      .query("users")
      .withIndex("by_externalId", (q) => q.eq("externalId", identity.subject))
      .unique();
    if (!user) return null;

    const board = await ctx.db.get(args.id);
    if (!board) return null;

    // CEK AKSES: Apakah saya Owner?
    if (board.ownerId === user._id) return board;

    // CEK AKSES: Apakah saya Member dengan status approved?
    const membership = await ctx.db
      .query("board_members")
      .withIndex("by_board_and_user", (q) =>
        q.eq("boardId", args.id).eq("userId", user._id),
      )
      .unique();

    if (membership?.status === "approved") {
      return board;
    }

    // Jika tidak punya akses sama sekali
    return null;
  },
});
