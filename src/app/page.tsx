"use client";

import { useConvexAuth, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const storeUser = useMutation(api.user.store);
  const createBoard = useMutation(api.board.create);

  useEffect(() => {
    if (isAuthenticated) {
      storeUser({}); // Jalankan sinkronisasi saat login berhasil
    }
  }, [isAuthenticated, storeUser]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <main className="p-10">
      {!isAuthenticated ? (
        <SignInButton />
      ) : (
        <div className="space-y-4">
          <UserButton />
          <h1 className="text-2xl font-bold">Welcome to CollaboBoard</h1>
          <button 
            onClick={() => createBoard({ title: "My First Board" })}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create New Board
          </button>
        </div>
      )}
    </main>
  );
}