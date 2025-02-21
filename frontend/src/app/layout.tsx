import type { Metadata } from "next";
import { Inter } from "next/font/google"; // ✅ Use Inter (Geist is not available in Google Fonts)
import "../styles/globals.css"; // ✅ Import global styles

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-gray-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
