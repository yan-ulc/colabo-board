"use client";

import { BoardCanvas } from "@/components/board/BoardCanvas";
import { CursorsPresence } from "@/components/board/CursorPresence";
import { InviteModa } from "@/components/board/InviteModal";
import { PropertiesPanel } from "@/components/board/PropertiesPanel";
import { StickyNote } from "@/components/board/StickyNote";
import { UserStack } from "@/components/board/UserStack";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { ArrowLeftIcon, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export default function BoardPage() {
  const params = useParams();
  const boardId = params.boardId as Id<"boards">;
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const notes = useQuery(api.note.getByBoard, { boardId });
  const createNote = useMutation(api.note.create);
  const invite = useMutation(api.board.inviteUser);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const uniqueNotes = notes
    ? Array.from(new Map(notes.map((note) => [note._id, note])).values())
    : notes;

  const handleInvite = async () => {
    const email = prompt("Masukkan email temen kamu:");
    if (email) {
      try {
        await invite({ boardId, email });
        alert("Berhasil mengajak temen!");
      } catch (err) {
        alert("Gagal: " + err);
      }
    }
  };

  const handleAddNote = async () => {
    await createNote({
      boardId,
      x: 100,
      y: 100,
    });
  };

  return (
    // Container utama: Harus FLEX dan HEIGHT FULL SCREEN
    <div className="flex w-screen h-screen overflow-hidden bg-white">
      <InviteModa
        boardId={boardId}
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />

      {/* BAGIAN KIRI: BOARD (4/5) */}
      <section className="relative flex-[4] h-full border-r border-slate-200 overflow-hidden bg-slate-50">
        {/* Add Note Button */}
        <button
          onClick={handleAddNote}
          className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Note
        </button>
        <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
          <Button
            asChild
            className="bg-blue-600 text-white shadow-lg hover:bg-blue-700 rounded-lg "
            size="icon"
          >
            <Link href="/dashboard" >
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
          </Button>
          <Button
            onClick={() => setIsInviteOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Invite Member
          </Button>
          <UserStack boardId={boardId} />
        </div>

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
      </section>

      {/* BAGIAN KANAN: PANEL (1/5) */}
      <aside className="flex-[1] h-full min-w-[300px] bg-white z-50">
        <PropertiesPanel selectedId={selectedNoteId} />
      </aside>
    </div>
  );
}
