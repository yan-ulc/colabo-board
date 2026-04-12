"use client";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Trash2, Palette, Check } from "lucide-react";
import { useState } from "react";

const COLORS = [
  { hex: "#FDE68A", label: "Yellow"  },
  { hex: "#D1FAE5", label: "Mint"    },
  { hex: "#DBEAFE", label: "Blue"    },
  { hex: "#FBD5E5", label: "Pink"    },
  { hex: "#EDE9FE", label: "Lavender"},
  { hex: "#FEF3C7", label: "Amber"   },
  { hex: "#FCE7F3", label: "Rose"    },
  { hex: "#ECFDF5", label: "Green"   },
  { hex: "#ffffff", label: "White"   },
  { hex: "#F1F5F9", label: "Slate"   },
  { hex: "#FFF7ED", label: "Peach"   },
  { hex: "#F0FDF4", label: "Sage"    },
];

export const PropertiesPanel = ({ selectedId }: { selectedId: string | null }) => {
  const changeColor = useMutation(api.note.updateColor);
  const removeNote  = useMutation(api.note.remove);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleColorChange = async (hex: string) => {
    if (!selectedId) return;
    setActiveColor(hex);
    await changeColor({ id: selectedId as Id<"notes">, color: hex });
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);
    await removeNote({ id: selectedId as Id<"notes"> });
    setIsDeleting(false);
  };

  if (!selectedId) return null; // Parent handles the empty state

  return (
    <div className="flex flex-col gap-0 h-full overflow-y-auto">

      {/* ── COLOR SECTION ── */}
      <div className="px-5 py-5">
        {/* Section header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <Palette size={12} className="text-white" />
          </div>
          <span
            className="text-xs font-bold text-slate-700 uppercase tracking-widest"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Color
          </span>
        </div>

        {/* Color grid */}
        <div className="grid grid-cols-4 gap-2">
          {COLORS.map(({ hex, label }) => {
            const isActive = activeColor === hex;
            return (
              <button
                key={hex}
                title={label}
                onClick={() => handleColorChange(hex)}
                className="relative group aspect-square rounded-xl border-2 transition-all duration-200 hover:scale-110 hover:shadow-md active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: hex,
                  borderColor: isActive ? "#4F46E5" : "#E2E8F0",
                  boxShadow: isActive ? "0 0 0 3px rgba(79,70,229,0.2)" : undefined,
                }}
              >
                {/* Checkmark */}
                {isActive && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center shadow-sm">
                      <Check size={11} className="text-white" strokeWidth={3} />
                    </span>
                  </span>
                )}
                {/* Hover tooltip */}
                <span
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active color preview */}
        {activeColor && (
          <div className="mt-5 flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-100 bg-slate-50">
            <div
              className="w-7 h-7 rounded-lg border border-slate-200 shadow-sm flex-shrink-0"
              style={{ backgroundColor: activeColor }}
            />
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Selected</p>
              <p className="text-xs font-semibold text-slate-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {COLORS.find((c) => c.hex === activeColor)?.label ?? activeColor}
              </p>
            </div>
            <span className="ml-auto text-[10px] font-mono text-slate-400">{activeColor}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-slate-100" />

      {/* ── QUICK TIPS ── */}
      <div className="px-5 py-5">
        <p
          className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Tips
        </p>
        <div className="flex flex-col gap-2">
          {[
            { icon: "✏️", tip: "Double-click a note to edit text" },
            { icon: "🖱️", tip: "Drag notes to reposition them" },
            { icon: "🎨", tip: "Pick a color above to style your note" },
          ].map(({ icon, tip }) => (
            <div
              key={tip}
              className="flex items-start gap-2.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100"
            >
              <span className="text-sm flex-shrink-0 mt-px">{icon}</span>
              <p className="text-[12px] text-slate-500 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Divider */}
      <div className="mx-5 border-t border-slate-100" />

      {/* ── DELETE ── */}
      <div className="px-5 py-5">
        <p
          className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Danger Zone
        </p>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 cursor-pointer"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            background: isDeleting ? "#FEE2E2" : "linear-gradient(135deg, #FEF2F2, #FEE2E2)",
            color: "#DC2626",
            border: "1.5px solid #FECACA",
            boxShadow: "0 2px 8px rgba(220,38,38,0.08)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(220,38,38,0.18)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#FCA5A5";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(220,38,38,0.08)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#FECACA";
          }}
        >
          <Trash2 size={15} strokeWidth={2.5} />
          {isDeleting ? "Deleting…" : "Delete Note"}
        </button>
      </div>
    </div>
  );
};