import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/background/AnimatedBackground";
import { SessionProvider } from "@/context/SessionProvider";
import Navigation from "@/components/nav/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contract Clause Reviewer",
  description: "AI-powered contract clause analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-black text-white antialiased`}>
        <AnimatedBackground />
        <div className="relative min-h-full">
          <SessionProvider>
            <Navigation />
            <main className="py-8">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl p-8">
                  {children}
                </div>
              </div>
            </main>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
