import React from "react";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header>
      <p className="text-dark-maroon text-center text-2xl sm:text-3xl md:text-4xl font-[Courgette] py-5 ">
        productivist
      </p>
      {session ? (
        <p className="text-center text-dark-maroon mb-4">
          Welcome, {session.user.name.split(" ")[0]}
        </p>
      ) : null}
    </header>
  );
}
