import {
  ClerkProvider,
} from "@clerk/nextjs";
import "./globals.scss";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Clerk Template",
  description:
    "A simple and powerful Next.js template featuring authentication and user management powered by Clerk.",
  openGraph: { images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${inter.className} min-h-screen flex flex-col`}>

          <main className="grow">{children}</main>
          
        </body>
      </ClerkProvider>

    </html>
  );
}
