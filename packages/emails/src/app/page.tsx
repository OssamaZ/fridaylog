import Link from "next/link";

export const metadata = {
  title: "React Email",
};

export default function Index() {
  return (
    <div className="mx-auto mt-56 max-w-md rounded-md border p-8">
      <h2 className="text-xl font-semibold">Welcome to the React Email preview!</h2>
      <p className="mb-4 mt-2">
        To start developing your next email template, you can create a <code>.jsx</code> or <code>.tsx</code>{" "}
        file under the "emails" folder.
      </p>

      <button>
        <Link href="https://react.email/docs">Check the docs</Link>
      </button>
    </div>
  );
}
