import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event Tier App",
  description: "Tier-based event management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex justify-between items-center p-4 border-b">
            <Link href="/" className="text-xl font-bold">EventTier</Link>
            <div className="flex items-center gap-4">
              <SignedIn>
                <Link href="/events" className="text-gray-600 hover:text-gray-900">Events</Link>
                <Link href="/settings" className="text-gray-600 hover:text-gray-900">Settings</Link>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm h-10 px-5">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
            </div>
          </header>
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}