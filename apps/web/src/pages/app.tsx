import { signIn, signOut, useSession } from "next-auth/react";

export default function App() {
  const { data, status } = useSession();

  if (status === "loading") {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {data && <span>Logged in as {data.user.email}</span>}
      </p>
      <button
        className="px-10 py-3 font-semibold"
        onClick={data ? () => void signOut() : () => void signIn()}
      >
        {data ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
