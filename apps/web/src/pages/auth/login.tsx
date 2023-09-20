import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
  const { status } = useSession();

  const [email, setEmail] = useState("w4rz4zi@gmail.com");
  const [loading, setIsLoading] = useState(false);

  if (status === "authenticated") {
    return <Redirect />;
  }

  async function login() {
    setIsLoading(true);
    try {
      await signIn("email", {
        email,
      });
    } catch (error) {
      //
    }
    setIsLoading(false);
  }

  return (
    <form
      className="flex min-h-screen flex-col items-center justify-center"
      onSubmit={(e) => {
        login();
      }}
    >
      <input
        className="border"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button className="border p-1.5" type="submit" disabled={loading}>
        {loading ? "loading .." : "login"}
      </button>
    </form>
  );
}

function Redirect() {
  const { replace } = useRouter();

  useEffect(() => {
    replace({
      pathname: "/",
    });
  }, []);

  return <p>Redirecting ..</p>;
}
