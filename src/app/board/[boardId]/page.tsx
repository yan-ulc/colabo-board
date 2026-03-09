"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

import { BoardCanvas } from "@/components/board/BoardCanvas";
import { PropertiesPanel } from "@/components/board/PropertiesPanel";
import { StickyNote } from "@/components/board/StickyNote";

export default function BoardPage() {
  const params = useParams();
  const boardId = params.boardId as Id<"boards">;
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const notes = useQuery(api.note.getByBoard, { boardId });

  return (
    // Container utama: Harus FLEX dan HEIGHT FULL SCREEN
    <div className="flex w-screen h-screen overflow-hidden bg-white">
      {/* BAGIAN KIRI: BOARD (4/5) */}
      <section className="relative flex-[4] h-full border-r border-slate-200 overflow-hidden bg-slate-50">
        <BoardCanvas onDeselect={() => setSelectedNoteId(null)}>
          {notes?.map((note) => (
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
