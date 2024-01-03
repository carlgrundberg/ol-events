import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orienteringstävlingar",
  description: "Hitta orienteringstävlingar enkelt i mobilen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className="dark">
      <body className={inter.className}>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
