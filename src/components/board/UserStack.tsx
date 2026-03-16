"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const UserStack = ({ boardId }: any) => {
  const activeUsers = useQuery(api.presence.getActiveUsers, { boardId });

  if (!activeUsers || activeUsers.length === 0) return null;

  return (
    <div className="flex items-center -space-x-2 overflow-hidden">
      {activeUsers.map((user, index) => (
        <div
          key={user._id}
          className="relative group"
          style={{ zIndex: activeUsers.length - index }}
        >
          {/* Bulatan Avatar */}
          <div className="h-9 w-9 rounded-full border-2 border-white bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-sm cursor-help overflow-hidden">
            {/* Pakai foto profil user jika ada, fallback ke inisial */}
            {user.userImage ? (
              <img
                src={user.userImage}
                alt={user.userName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="uppercase">{user.userName.charAt(0)}</span>
            )}
          </div>

          {/* Tooltip Nama (Muncul saat Hover) */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {user.userName}
          </div>
        </div>
      ))}

      {/* Jika user lebih dari 5, tampilkan angka sisanya */}
      {activeUsers.length > 5 && (
        <div className="h-9 w-9 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold z-0">
          +{activeUsers.length - 5}
        </div>
      )}
    </div>
  );
};
