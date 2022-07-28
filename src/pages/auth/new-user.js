import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function NewUser() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const syncLocalStorageToDatabase = async () => {
      if (status === "loading") return;

      if (status === "authenticated") {
        const LOCAL_STORAGE_KEY = "productifyLocalStorageKey";
        const toDoList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

        const response = await fetch("/api/entries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toDoList }),
        });

        router.push("/");
      }

      if (status === "unauthenticated") {
        router.push("/api/auth/signin");
      }
    };

    syncLocalStorageToDatabase();
  }, [status]);

  return (
    <div className="h-screen w-screen bg-light-pink flex flex-col justify-center items-center">
      <p className="text-dark-maroon text-xs">
        Syncing local storage and database...
      </p>

      <Link href="/">
        <a className="text-dark-maroon text-xs">
          Please click here if you are not redirected
        </a>
      </Link>
    </div>
  );
}
