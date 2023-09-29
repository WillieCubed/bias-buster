"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";
import { User, SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "./supabase-client";
import { useRouter } from "next/navigation";

type AuthContextProps = {
  /**
   * A Supabase user object. This is null if the user is not signed in.
   */
  user: User | null;
  /**
   * A function to sign in the user.
   */
  signIn: () => void;
  /**
   * A function to sign out the user.
   */
  signOut: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signIn: () => undefined,
  signOut: () => undefined,
});

export function AuthProvider({
  supabaseUser,
  children,
}: PropsWithChildren<{
  supabaseUser: User | null;
}>) {
  const user = supabaseUser;

  const router = useRouter();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()
  async function signIn() {
    // sign in user
    console.log("signing in, AuthProvider");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  }

  async function signOut() {
    // sign out user
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const { user, signIn, signOut } = useContext(AuthContext);
  return {
    isSignedIn: user !== null,
    user,
    signIn,
    signOut,
  };
}
