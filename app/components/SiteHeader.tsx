"use client";

import Link from "next/link";
import { useAuth } from "../auth-provider";

export default function SiteHeader() {
  const { isSignedIn, signIn, signOut } = useAuth();
  const handleAuth = () => {
    if (isSignedIn) {
      signOut();
    } else {
      console.log("signing in");
      signIn();
    }
  };

  return (
    <header className="rounded-xl bg-slate-900 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* <Image
            src="/images/logo.svg"
            alt="Logo"
            width={40}
            height={40}
          /> */}
          <Link className="text-title-large" href="/">
            NewsReal
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {/* <Link className="text-title-large" href="/leaderboard">
            Leaderboard
          </Link>
          <Link className="text-title-large" href="/about">
            About
          </Link> */}
          <button className="text-title-large" onClick={handleAuth}>
            {isSignedIn ? "Sign out" : "Sign in"}
          </button>
        </div>
      </div>
    </header>
  );
}
