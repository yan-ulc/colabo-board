"use client";

import { useMutation } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../convex/_generated/api";

export const StickyNote = ({
  id,
  x,
  y,
  color,
  text,
  isSelected,
  onClick,
}: any) => {
  const updatePosition = useMutation(api.note.updatePosition);

  // Posisi lokal untuk visual 60fps
  const [position, setPosition] = useState({ x, y });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const lastSavedPosition = useRef({ x, y });

  // SINKRONISASI: Hanya update dari database jika kita TIDAK sedang menyeret
  // DAN posisi dari props berbeda dari yang baru kita simpan (hindari flicker)
  useEffect(() => {
    if (!isDragging) {
      // Hanya sync jika props benar-benar berubah dari posisi terakhir yang kita simpan
      if (
        x !== lastSavedPosition.current.x ||
        y !== lastSavedPosition.current.y
      ) {
        setPosition({ x, y });
        lastSavedPosition.current = { x, y };
      }
    }
  }, [x, y, isDragging]);

  const changeText = useMutation(api.note.updateText);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;

      // Update instan di layar
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        // Simpan posisi terakhir
        const finalX = position.x;
        const finalY = position.y;

        // Set dragging ke false LANGSUNG untuk instant feedback
        setIsDragging(false);

        // Kirim ke database di background (no await needed)
        updatePosition({ id, x: finalX, y: finalY });
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, position, id, updatePosition]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={(e) => e.stopPropagation()}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: color,
        position: "absolute",
      }}
      className={`
        w-48 h-48 p-4 shadow-lg flex flex-col transition-shadow rounded-lg
        ${isDragging ? "cursor-grabbing shadow-2xl z-50 scale-105 transition-none" : "cursor-grab z-10"}
        ${isSelected ? "ring-4 ring-blue-50" : ""}
      `}
    >
      <textarea
        className="w-full h-full bg-transparent border-none resize-none focus:outline-none text-slate-800 font-medium placeholder:text-slate-400"
        defaultValue={text}
        onBlur={(e) => {
          // Hanya simpan jika teksnya beneran berubah
          if (e.target.value !== text) {
            changeText({ id, text: e.target.value });
          }
        }}
        onMouseDown={(e) => {
          // Pilih note ini dulu
          onClick();
          // Baru stop propagation supaya gak trigger drag
          e.stopPropagation();
        }}
      />
    </div>
  );
};
