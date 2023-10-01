import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { cache } from "react";
import { AuthProvider } from "./auth-provider";
import "./globals.css";
import BASE_APP_URL from "@/lib/base-app-url";
import { createServerSupabaseClient } from "./supabase-server";

const inter = Inter({ subsets: ["latin"] });

// export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "NewsReal",
  description:
    "NewsReal is a game that tests your ability to distinguish real news from AI-generated content.",
  metadataBase: new URL(BASE_APP_URL),
  openGraph: {
    siteName: "NewsReal",
    title: "Play NewsReal",
    description:
      "NewsReal is a game that tests your ability to distinguish real news from AI-generated content. Play with your friends or against a bot.",
    type: "website",
    images: "/og_image.png",
    url: "/",
  },
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
