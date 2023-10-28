import { getServerAuthSession } from "@fridaylog/server/auth";
import SignoutButton from "./signout";

export default async function App() {
  const session = await getServerAuthSession();
  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Logged in as {session.user.email}</span>
      </p>
      <SignoutButton />
    </div>
  );
}
