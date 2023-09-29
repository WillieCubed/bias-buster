import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { AuthProvider } from "./auth-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
  const supabase = createServerComponentClient({ cookies });

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
