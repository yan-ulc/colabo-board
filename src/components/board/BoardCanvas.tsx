"use client";

import { ReactNode } from "react";

export const BoardCanvas = ({
  children,
  onDeselect,
}: {
  children: ReactNode;
  onDeselect?: () => void;
}) => {
  return (
    <div
      className="relative w-full h-full bg-[#f3f4f6] overflow-hidden group"
      onClick={onDeselect}
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[grid_black_1px_/_20px_20px] [mask-image:radial-gradient(ellipse_at_center,white_transparent)] opacity-5" />

      {/* Container untuk semua Notes */}
      <div className="relative w-full h-full p-10">{children}</div>
    </div>
  );
};
