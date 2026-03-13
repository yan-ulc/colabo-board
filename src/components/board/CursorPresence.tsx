"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect } from "react";
import { MousePointer2 } from "lucide-react";

export const CursorsPresence = ({ boardId }: any) => {
  const updatePresence = useMutation(api.presence.update);
  const others = useQuery(api.presence.list, { boardId });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Kita kirim koordinat mouse relatif terhadap canvas
      updatePresence({
        boardId,
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [boardId, updatePresence]);

  if (!others) return null;

  return (
    <>
      {others.map((p) => (
        <div
          key={p._id}
          className="pointer-events-none absolute z-[100] transition-transform duration-75"
          style={{
            left: p.x,
            top: p.y,
            transform: `translate(-5px, -5px)`, // Biar ujung kursor pas di titik koordinat
          }}
        >
          <MousePointer2 className="h-5 w-5 fill-indigo-500 text-indigo-500" />
          <div className="ml-3 rounded-md bg-indigo-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
            {p.userName}
          </div>
        </div>
      ))}
    </>
  );
};