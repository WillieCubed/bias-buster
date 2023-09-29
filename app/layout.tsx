import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { AuthProvider } from "./auth-provider";
import "./globals.css";
import { cache } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Bias Buster",
  description: "Human or AI? Let's find out.",
  metadataBase: new URL(process.env.APP_URL || "http://localhost:3000/"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-surface-background`}>
        <AuthProvider supabaseUser={user}>{children}</AuthProvider>
      </body>
    </html>
  );
}

const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();
  return _createServerComponentClient({ cookies: () => cookieStore });
});
