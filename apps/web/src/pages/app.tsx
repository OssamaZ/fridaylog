import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App() {
  const { data, status } = useSession();

  if (status === "loading") {
    return <div>Loading</div>;
  }

  if (status === "unauthenticated" || !data) {
    return <Redirect />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Logged in as {data.user.email}</span>
      </p>
      <button className="px-10 py-3 font-semibold" onClick={() => void signOut()}>
        Sign out
      </button>
    </div>
  );
}

function Redirect() {
  const { replace } = useRouter();

  useEffect(() => {
    void replace({
      pathname: "/auth/login",
    });
  }, []);

  return <p>Redirecting ..</p>;
}
