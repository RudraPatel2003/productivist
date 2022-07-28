import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="mx-auto mt-auto mb-4 px-8 py-2 bg-pink text-dark-maroon rounded-2xl drop-shadow-normal will-change-[filter]">
      Sign out
    </button>
  );
}
