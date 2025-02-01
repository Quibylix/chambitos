import type { Metadata } from "next";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { BasicAppShell } from "@/features/ui/basic-app-shell/basic-app-shell.component";
import { createClient } from "@/features/db/utils/server";
import { getUserRole } from "@/features/auth/utils/get-user-role";

export const metadata: Metadata = {
  title: "Chambitos",
  description:
    "Chambitos is a platform designed to connect freelancers and small business owners with clients looking for various services. It provides a user-friendly marketplace where skilled professionals can showcase their talents and find meaningful work opportunities.",
  icons: "/chambitos-logo.webp",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const db = await createClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  const userRole = await getUserRole(user?.id ?? null);

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications />
          <BasicAppShell isLogged={userRole !== "anon"}>
            {children}
          </BasicAppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
