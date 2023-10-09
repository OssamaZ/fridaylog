import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("w4rz4zi@gmail.com");
  const [loading, setIsLoading] = useState(false);

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
        e.preventDefault();
        void login();
      }}>
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
