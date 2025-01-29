import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Chambitos",
  description:
    "Chambitos is a platform designed to connect freelancers and small business owners with clients looking for various services. It provides a user-friendly marketplace where skilled professionals can showcase their talents and find meaningful work opportunities.",
  icons: "/chambitos-logo.webp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>{children}</body>
    </html>
  );
}
