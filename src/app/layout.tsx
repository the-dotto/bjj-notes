import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BJJ Notes",
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
