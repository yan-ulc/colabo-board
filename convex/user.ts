import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const store = mutation({
  // KITA KOSONGKAN ARGS-NYA
  args: {}, 
  handler: async (ctx) => {
    // Ambil data user langsung dari Token Clerk yang sudah divalidasi Convex
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new Error("Unauthorized: Token Clerk tidak ditemukan");
    }

    // Cek apakah user sudah ada
    const user = await ctx.db
      .query("users")
      .withIndex("by_externalId", (q) => q.eq("externalId", identity.subject))
      .unique();

    if (user !== null) {
      // Update jika ada perubahan data di Clerk
      await ctx.db.patch(user._id, {
        name: identity.name ?? "Anonymous",
        image: identity.pictureUrl,
      });
      return user._id;
    }

    // Simpan user baru
    return await ctx.db.insert("users", {
      name: identity.name ?? "Anonymous",
      email: identity.email ?? "",
      externalId: identity.subject, // ID dari Clerk
      image: identity.pictureUrl,
    });
  },
});