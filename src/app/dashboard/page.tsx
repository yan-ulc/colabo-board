"use client";

import { UserButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { Layout, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { Pencil , Trash } from "lucide-react";

export default function DashboardPage() {
  const boards = useQuery(api.board.get);
  const createBoard = useMutation(api.board.create);
  const updateBoard = useMutation(api.board.update);
  const removeBoard = useMutation(api.board.remove);
  const router = useRouter();

  const handleCreateBoard = async () => {
    const boardId = await createBoard({ title: "Untitled Board" });
    router.push(`/board/${boardId}`);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* NAVBAR */}
      <nav className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <Layout size={28} />
          <span>CollaboBoard</span>
        </div>
        <UserButton afterSignOutUrl="/" />
      </nav>

      <main className="max-w-7xl mx-auto p-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Boards</h1>
            <p className="text-slate-500">Manage your collaborative workspaces</p>
          </div>
          <button 
            onClick={handleCreateBoard}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200"
          >
            <Plus size={20} />
            New Board
          </button>
        </div>

        {/* BOARD GRID */}
        {boards === undefined ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : boards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 mb-4">You don't have any boards yet.</p>
            <button onClick={handleCreateBoard} className="text-indigo-600 font-bold hover:underline">
              Create your first board
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {boards.map((board) => (
              <div key={board._id} className="group relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all h-48 flex flex-col justify-between">
                
                {/* Tombol Aksi (Hapus/Rename) */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => {
                      e.preventDefault(); // Biar gak masuk ke halaman board
                      const newTitle = prompt("Nama baru board:");
                      if (newTitle) updateBoard({ id: board._id, title: newTitle });
                    }}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
                  >
                    <Pencil size={16}/>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      if (confirm("Yakin hapus board ini?")) removeBoard({ id: board._id });
                    }}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                  >
                    <Trash size={16} />
                  </button>
                </div>

                <Link href={`/board/${board._id}`} className="flex-1 flex flex-col justify-between">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Layout size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                    {board.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}