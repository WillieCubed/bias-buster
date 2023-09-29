import { Metadata } from "next/types";
import SiteHeader from "@/app/components/SiteHeader";
import { PropsWithChildren } from "react";
import GameSessionProvider from "./session-provider";

export const metadata: Metadata = {
  title: "Start a Round - NewsReal",
  description: "Human or AI? Let's find out.",
  openGraph: {
    siteName: "NewsReal",
    title: "Start a Round",
    description: "Human or AI? Let's find out.",
    type: "website",
  },
};

export default function GameSessionLayout({ children }: PropsWithChildren) {
  return (
    <GameSessionProvider>
      <div className="min-h-screen">
        <div className="pt-4 max-w-6xl mx-auto">
          <SiteHeader />
        </div>
        {children}
      </div>
    </GameSessionProvider>
  );
}
