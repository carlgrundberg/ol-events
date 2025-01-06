import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar, NavbarBrand } from "@nextui-org/react";

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
        <Providers>
          <Navbar>
            <NavbarBrand className="gap-2">
              <a href="/" className="flex items-center gap-2">
                <svg
                  height="36"
                  viewBox="0 0 500 500"
                  width="36"
                  className="rounded"
                >
                  <path d="M502,0H0V502" fill="#FFF" />
                  <path d="M0,500H500V0" fill="#F76D22" />
                </svg>
                <p className="font-bold text-inherit">Orienteringstävlingar</p>
              </a>
            </NavbarBrand>
          </Navbar>
          {children}
        </Providers>
      </body>
    </html>
  );
}
