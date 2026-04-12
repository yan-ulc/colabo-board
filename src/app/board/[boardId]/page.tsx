"use client";

import { BoardCanvas } from "@/components/board/BoardCanvas";
import { CursorsPresence } from "@/components/board/CursorPresence";
import { InviteModa } from "@/components/board/InviteModal";
import { PropertiesPanel } from "@/components/board/PropertiesPanel";
import { StickyNote } from "@/components/board/StickyNote";
import { UserStack } from "@/components/board/UserStack";
import { useMutation, useQuery } from "convex/react";
import {
  ArrowLeft,
  Plus,
  UserPlus,
  Layout,
  Sparkles,
  MousePointer2,
  StickyNote as StickyNoteIcon,
  ChevronRight,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

// Color palette for new notes (cycles through)
const NOTE_COLORS = [
  "#FDE68A", // yellow
  "#FBD5E5", // pink
  "#D1FAE5", // green
  "#EDE9FE", // purple
  "#DBEAFE", // blue
  "#FEF3C7", // amber
];

export default function BoardPage() {
  const params = useParams();
  const boardId = params.boardId as Id<"boards">;

  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [noteCount, setNoteCount] = useState(0);
  const [isAddingNote, setIsAddingNote] = useState(false);

  const notes = useQuery(api.note.getByBoard, { boardId });
  const createNote = useMutation(api.note.create);
  const invite = useMutation(api.board.inviteUser);

  const uniqueNotes = notes
    ? Array.from(new Map(notes.map((note) => [note._id, note])).values())
    : notes;

  const handleAddNote = async () => {
    setIsAddingNote(true);
    const color = NOTE_COLORS[noteCount % NOTE_COLORS.length];
    await createNote({
      boardId,
      x: 120 + Math.random() * 200,
      y: 120 + Math.random() * 200,
      color,
    });
    setNoteCount((c) => c + 1);
    setTimeout(() => setIsAddingNote(false), 600);
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif", background: "#F9FAFB" }}>
      <InviteModa
        boardId={boardId}
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />

      {/* ── BOARD AREA ─────────────────────────────────────────────── */}
      <section
        className="relative h-full overflow-hidden transition-all duration-300"
        style={{ flex: isPanelOpen ? "4" : "1 0 100%" }}
      >
        {/* Dot-grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.55,
          }}
        />

        {/* Subtle gradient overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 10% 10%, rgba(37,99,235,0.04) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 90% 90%, rgba(79,70,229,0.04) 0%, transparent 70%)",
          }}
        />

        {/* ── TOP TOOLBAR ── */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-3 pointer-events-none">

          {/* Left group */}
          <div className="flex items-center gap-2.5 pointer-events-auto">
            {/* Back */}
            <Link
              href="/dashboard"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 shadow-sm hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              title="Back to dashboard"
            >
              <ArrowLeft size={16} />
            </Link>

            {/* Logo pill */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm"
            >
              <div className="w-5 h-5 rounded-[6px] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Layout size={11} className="text-white" />
              </div>
              <span
                className="text-sm font-bold text-slate-800"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                CollaboBoard
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-slate-200" />

            {/* Invite */}
            <button
              onClick={() => setIsInviteOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold shadow-sm hover:border-indigo-400 hover:text-indigo-600 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <UserPlus size={15} />
              <span className="hidden sm:inline">Invite</span>
            </button>

            {/* User avatars */}
            <UserStack boardId={boardId} />
          </div>

          {/* Center — Board status chip */}
          <div className="pointer-events-auto hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-500">Live · Real-time sync</span>
          </div>

          {/* Right group */}
          <div className="flex items-center gap-2.5 pointer-events-auto">
            {/* Note count badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <StickyNoteIcon size={13} className="text-slate-400" />
              <span className="text-xs font-semibold text-slate-500">
                {uniqueNotes?.length ?? 0} note{(uniqueNotes?.length ?? 0) !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Toggle panel */}
            <button
              onClick={() => setIsPanelOpen((v) => !v)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 shadow-sm hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition-all duration-200"
              title={isPanelOpen ? "Hide panel" : "Show panel"}
            >
              {isPanelOpen ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
            </button>
          </div>
        </div>

        {/* ── CANVAS ── */}
        <BoardCanvas onDeselect={() => setSelectedNoteId(null)}>
          <CursorsPresence boardId={boardId} />
          {uniqueNotes?.map((note) => (
            <StickyNote
              key={note._id}
              id={note._id}
              x={note.x}
              y={note.y}
              color={note.color}
              text={note.text}
              isSelected={selectedNoteId === note._id}
              onClick={() => setSelectedNoteId(note._id)}
            />
          ))}
        </BoardCanvas>

        {/* ── EMPTY STATE (when no notes) ── */}
        {uniqueNotes?.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-100 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <MousePointer2 size={26} className="text-indigo-400" />
              </div>
              <p
                className="text-slate-400 font-semibold text-[15px] mb-1"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Your canvas is empty
              </p>
              <p className="text-slate-400 text-sm">Click the button below to add your first note</p>
            </div>
          </div>
        )}

        {/* ── ADD NOTE FAB ── */}
        <button
          onClick={handleAddNote}
          disabled={isAddingNote}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-white font-bold text-sm shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95 disabled:opacity-70"
          style={{
            background: "linear-gradient(135deg, #2563EB, #4F46E5)",
            boxShadow: "0 8px 32px rgba(37,99,235,0.4)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          <span
            className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center transition-transform duration-300"
            style={{ transform: isAddingNote ? "rotate(45deg)" : "rotate(0deg)" }}
          >
            <Plus size={16} />
          </span>
          {isAddingNote ? "Adding…" : "Add Sticky Note"}
          {!isAddingNote && (
            <span className="hidden sm:flex items-center gap-1 ml-1 opacity-60 text-xs font-semibold">
              <Sparkles size={11} />
            </span>
          )}
        </button>

        {/* Keyboard shortcut hint */}
        <div className="absolute bottom-6 right-4 z-20 hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-sm border border-slate-200 shadow-sm pointer-events-none">
          <ChevronRight size={12} className="text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Click canvas to deselect</span>
        </div>
      </section>

      {/* ── RIGHT PANEL ─────────────────────────────────────────────── */}
      <aside
        className="h-full z-30 overflow-hidden flex flex-col border-l border-slate-200 transition-all duration-300"
        style={{
          width: isPanelOpen ? "300px" : "0px",
          minWidth: isPanelOpen ? "300px" : "0px",
          opacity: isPanelOpen ? 1 : 0,
          background: "#ffffff",
        }}
      >
        {/* Panel header */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <StickyNoteIcon size={13} className="text-white" />
            </div>
            <span
              className="text-sm font-bold text-slate-800"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Properties
            </span>
          </div>
          {selectedNoteId && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              Note selected
            </span>
          )}
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto">
          {!selectedNoteId ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center py-16">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
                <MousePointer2 size={20} className="text-slate-300" />
              </div>
              <p className="text-sm font-semibold text-slate-400 mb-1"
                 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                No note selected
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Click on a sticky note on the canvas to edit its properties here.
              </p>
            </div>
          ) : (
            <PropertiesPanel selectedId={selectedNoteId} />
          )}
        </div>

        {/* Panel footer */}
        <div className="flex-shrink-0 px-5 py-4 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={handleAddNote}
            disabled={isAddingNote}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #2563EB, #4F46E5)",
              color: "white",
              boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <Plus size={16} />
            {isAddingNote ? "Adding…" : "Add Note"}
          </button>
        </div>
      </aside>
    </div>
  );
}