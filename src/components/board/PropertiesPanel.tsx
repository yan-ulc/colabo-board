"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

const COLORS = ["#fef08a", "#bbf7d0", "#bfdbfe", "#fbcfe8", "#ffffff", "#fed7aa"];

export const PropertiesPanel = ({ selectedId }: { selectedId: string | null }) => {
  // 1. Hook Mutation
  const changeColor = useMutation(api.note.updateColor);
  const removeNote = useMutation(api.note.remove);

  // 2. Jika ada note yang dipilih, kita bisa ambil detailnya (opsional untuk UI)
  if (!selectedId) {
    return (
      <div className="h-full bg-white border-l p-6 flex flex-col items-center justify-center text-slate-400">
        <p className="text-sm font-medium italic text-center">
          Klik salah satu note untuk memunculkan pengaturan
        </p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white border-l p-6 flex flex-col gap-8 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.05)]">
      <div>
        <h3 className="font-bold text-slate-900 text-sm mb-4 uppercase tracking-wider">Appearance</h3>
        <p className="text-xs text-slate-500 mb-3 font-semibold">Background Color</p>
        
        <div className="grid grid-cols-4 gap-3">
          {COLORS.map((c) => (
            <button
              key={c}
              style={{ backgroundColor: c }}
              onClick={() => changeColor({ id: selectedId as Id<"notes">, color: c })}
              className="w-10 h-10 rounded-lg border-2 border-slate-200 hover:border-indigo-500 hover:scale-110 transition-all shadow-sm active:scale-95"
            />
          ))}
        </div>
      </div>

      <hr className="border-slate-100" />

      <div>
        <p className="text-xs text-slate-500 mb-3 font-semibold">Actions</p>
        <button 
          onClick={() => removeNote({ id: selectedId as Id<"notes"> })}
          className="w-full bg-red-50 text-red-600 py-3 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2 border border-red-100"
        >
          Delete Note
        </button>
      </div>
    </div>
  );
};