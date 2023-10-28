"use client"

import { signOut } from "next-auth/react";

export default function SignoutButton() {
  return (
    <button className="px-10 py-3 font-semibold" onClick={() => void signOut()}>
        Sign out
      </button>
  )
}