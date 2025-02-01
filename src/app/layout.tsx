import type { Metadata } from "next";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

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
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
