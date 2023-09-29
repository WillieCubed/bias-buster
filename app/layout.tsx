import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bias Buster",
  description: "Human or AI? Let's find out.",
  metadataBase: new URL(process.env.APP_URL || "http://localhost:3000/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-surface-background`}>
        {children}
      </body>
    </html>
  );
}
