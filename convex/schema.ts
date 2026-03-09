import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    externalId: v.string(), 
    image: v.optional(v.string()),
  }).index("by_externalId", ["externalId"]),

  boards: defineTable({
    title: v.string(),
    ownerId: v.id("users"),
  }).index("by_ownerId", ["ownerId"]),

  board_members: defineTable({
    boardId: v.id("boards"),
    userId: v.id("users"),
    status: v.union(v.literal("pending"), v.literal("approved")),
  }).index("by_boardId", ["boardId"])
    .index("by_userId", ["userId"])
    .index("by_board_and_user", ["boardId", "userId"]),

  notes: defineTable({
    boardId: v.id("boards"),
    text: v.string(),
    x: v.number(),
    y: v.number(),
    color: v.string(),
    lastEditedBy: v.id("users"),
  }).index("by_boardId", ["boardId"]),
});