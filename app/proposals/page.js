'use client';
import { useState } from "react";
import Header from "@/components/header";

export default function Home() {
  const [user, setUser] = useState();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header user={user} setUser={setUser} />
      <div className="flex flex-wrap">
        PROPOSALS
      </div>
    </main>
  );
}