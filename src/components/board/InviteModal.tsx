"use client";

import { useState } from "react";
import { Copy, X, UserPlus, Check } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface InviteModalProps {
  boardId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const InviteModa = ({ boardId, isOpen, onClose }: InviteModalProps) => {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const invite = useMutation(api.board.inviteUser);

  if (!isOpen) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(boardId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await invite({ boardId: boardId as any, email });
      alert("Member berhasil ditambahkan!"); // Nanti bisa diganti Toast
      setEmail("");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-800">Invite Members</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Section 1: Share ID */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Share Board ID
            </label>
            <div className="flex gap-2">
              <div className="flex-1 bg-slate-100 px-4 py-3 rounded-xl font-mono text-sm text-slate-600 border border-slate-200 truncate">
                {boardId}
              </div>
              <button
                onClick={handleCopyId}
                className={`px-4 rounded-xl transition-all flex items-center justify-center gap-2 font-bold ${
                  copied ? "bg-green-500 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-medium">Atau via Email</span>
            </div>
          </div>

          {/* Section 2: Invite Email */}
          <form onSubmit={handleInvite} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="emailtemen@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <UserPlus size={18} />
              {loading ? "Sending..." : "Send Invitation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};