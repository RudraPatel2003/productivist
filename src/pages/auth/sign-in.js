import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";

export default function SignIn({ providers }) {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="w-[min(600px,80%)] h-[75%] rounded-2xl bg-pink py-16 flex flex-col items-center justify-start gap-4 ">
          <Link href="/">
            <a className="text-dark-maroon text-center text-2xl sm:text-3xl md:text-4xl font-[Courgette]">
              productivist
            </a>
          </Link>
          <p>Please sign in to continue</p>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="text-dark-maroon font-bold outline outline-2 py-4 px-8"
                onClick={() =>signIn(provider.id, { callbackUrl: "http://localhost:3000" })}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
