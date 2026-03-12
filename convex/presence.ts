// import { v } from "convex/values";
// import { mutation, query } from "./_generated/server";

// export const update = mutation({
//   args: { boardId: v.id("boards"), x: v.number(), y: v.number() },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) return;

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_externalId", (q) => q.eq("externalId", identity.subject))
//       .unique();

//     if (!user) return;

//     // Cari apakah data presence user ini sudah ada di board ini
//     const existing = await ctx.db
//       .query("presence")
//       .withIndex("by_boardId", (q) => q.eq("boardId", args.boardId))
//       .filter((q) => q.eq(q.field("userId"), user._id))
//       .unique();

//     if (existing) {
//       await ctx.db.patch(existing._id, { 
//         x: args.x, 
//         y: args.y, 
//         updatedAt: Date.now() 
//       });
//     } else {
//       await ctx.db.insert("presence", {
//         boardId: args.boardId,
//         userId: user._id,
//         userName: user.name,
//         x: args.x,
//         y: args.y,
//         updatedAt: Date.now(),
//       });
//     }
//   },
// });

// export const list = query({
//   args: { boardId: v.id("boards") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) return [];

//     // Ambil kursor user lain (selain diri sendiri) yang aktif dalam 10 detik terakhir
//     const threshold = Date.now() - 10000;
//     return await ctx.db
//       .query("presence")
//       .withIndex("by_boardId", (q) => q.eq("boardId", args.boardId))
//       .filter((q) => q.gt(q.field("updatedAt"), threshold))
//       .collect();
//   },
// });