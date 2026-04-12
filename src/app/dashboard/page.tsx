"use client";

import { UserButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import {
  Layout,
  Pencil,
  Plus,
  Trash2,
  Users,
  LogIn,
  StickyNote,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";

// ─── Palette constants matching landing page ───────────────────────────────
const CARD_ACCENTS = [
  { bg: "bg-blue-50",   icon: "text-blue-600",   hover: "group-hover:bg-blue-600"   },
  { bg: "bg-indigo-50", icon: "text-indigo-600",  hover: "group-hover:bg-indigo-600" },
  { bg: "bg-violet-50", icon: "text-violet-600",  hover: "group-hover:bg-violet-600" },
  { bg: "bg-cyan-50",   icon: "text-cyan-600",    hover: "group-hover:bg-cyan-600"   },
];

export default function DashboardPage() {
  const boards    = useQuery(api.board.get);
  const createBoard = useMutation(api.board.create);
  const updateBoard = useMutation(api.board.update);
  const removeBoard = useMutation(api.board.remove);
  const joinBoard   = useMutation(api.board.joinBoard);
  const router = useRouter();

  const uniqueBoards = boards
    ? Array.from(new Map(boards.map((b) => [b._id, b])).values())
    : [];

  const handleCreateBoard = async () => {
    const boardId = await createBoard({ title: "Untitled Board" });
    router.push(`/board/${boardId}`);
  };

  const handleJoinBoard = async () => {
    const id = prompt("Enter your teammate's Board ID:");
    if (!id) return;
    try {
      const boardId = await joinBoard({ boardId: id });
      router.push(`/board/${boardId}`);
    } catch (err: any) {
      alert("Failed to join: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans">

      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 flex items-center">
        <div className="max-w-7xl mx-auto px-8 w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200 transition-transform group-hover:scale-105">
              <Layout size={18} className="text-white" />
            </div>
            <span className="font-extrabold text-[18px] text-slate-900 tracking-tight"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              CollaboBoard
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-blue-700">
                {uniqueBoards.length} board{uniqueBoards.length !== 1 ? "s" : ""}
              </span>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      {/* ── MAIN ────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-8 py-12">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-3">
              <Sparkles size={12} className="text-blue-600" />
              <span className="text-xs font-bold text-blue-600 tracking-wide uppercase">
                My Workspace
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              My Boards
            </h1>
            <p className="text-slate-500 mt-1 text-[15px]">
              Manage and collaborate on your team's whiteboards.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Join board */}
            <button
              onClick={handleJoinBoard}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-[1.5px] border-slate-200 bg-white text-slate-700 text-sm font-semibold transition-all hover:border-blue-400 hover:text-blue-600 hover:shadow-sm hover:-translate-y-0.5 cursor-pointer"
            >
              <LogIn size={16} />
              Join Board
            </button>

            {/* New board */}
            <button
              onClick={handleCreateBoard}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:shadow-blue-300 hover:shadow-xl cursor-pointer"
            >
              <Plus size={17} />
              New Board
            </button>
          </div>
        </div>

        {/* ── BOARD GRID ────────────────────────────────────────────── */}

        {/* Loading skeletons */}
        {boards === undefined && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {boards !== undefined && uniqueBoards.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 rounded-3xl border-2 border-dashed border-slate-200 bg-white">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center mb-5 shadow-sm">
              <StickyNote size={28} className="text-indigo-500" />
            </div>
            <p className="text-slate-400 text-[15px] mb-4">
              You don't have any boards yet.
            </p>
            <button
              onClick={handleCreateBoard}
              className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-indigo-700 transition-colors cursor-pointer group"
            >
              Create your first board
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {/* Board cards */}
        {boards !== undefined && uniqueBoards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {/* ── New board card ── */}
            <button
              onClick={handleCreateBoard}
              className="h-48 group flex flex-col items-center justify-center gap-3
                         rounded-2xl border-2 border-dashed border-slate-200 bg-white
                         text-slate-400 transition-all cursor-pointer
                         hover:border-blue-400 hover:text-blue-600 hover:shadow-md hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-200">
                <Plus size={22} />
              </div>
              <span className="text-sm font-semibold">New Board</span>
            </button>

            {/* ── Board cards ── */}
            {uniqueBoards.map((board, idx) => {
              const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
              return (
                <div
                  key={board._id}
                  className="group relative bg-white rounded-2xl border border-slate-200
                             shadow-sm hover:shadow-xl hover:shadow-slate-200/60
                             hover:border-indigo-200 transition-all duration-300
                             hover:-translate-y-1.5 h-48 flex flex-col justify-between p-6 overflow-hidden"
                >
                  {/* Subtle gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/40 group-hover:to-indigo-50/60 transition-all duration-300 rounded-2xl pointer-events-none" />

                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const newTitle = prompt("New board name:", board.title);
                        if (newTitle) updateBoard({ id: board._id, title: newTitle });
                      }}
                      className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                      title="Rename"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (confirm("Delete this board?")) removeBoard({ id: board._id });
                      }}
                      className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-200 hover:shadow-sm transition-all cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <Link
                    href={`/board/${board._id}`}
                    className="flex-1 flex flex-col justify-between no-underline relative z-[1]"
                  >
                    {/* Icon */}
                    <div className={`w-11 h-11 ${accent.bg} rounded-xl flex items-center justify-center ${accent.icon} transition-all duration-300 ${accent.hover} group-hover:text-white group-hover:shadow-md`}>
                      <Layout size={20} />
                    </div>

                    {/* Bottom */}
                    <div>
                      <h3 className="font-bold text-slate-800 text-[16px] leading-snug group-hover:text-indigo-700 transition-colors line-clamp-1"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {board.title}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <Users size={12} className="text-slate-400" />
                        <span className="text-xs text-slate-400 font-medium">Collaborative board</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* ── STATS ROW (bottom) ────────────────────────────────────── */}
        {boards !== undefined && uniqueBoards.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <Layout size={18} className="text-blue-600" />, label: "Total Boards", value: uniqueBoards.length, bg: "bg-blue-50 border-blue-100" },
              { icon: <Users size={18} className="text-indigo-600" />, label: "Collaborators", value: "Live", bg: "bg-indigo-50 border-indigo-100" },
              { icon: <StickyNote size={18} className="text-violet-600" />, label: "Sticky Notes", value: "Unlimited", bg: "bg-violet-50 border-violet-100" },
            ].map((stat, i) => (
              <div key={i} className={`flex items-center gap-4 px-6 py-4 rounded-2xl border ${stat.bg} bg-white`}>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900"
                       style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}