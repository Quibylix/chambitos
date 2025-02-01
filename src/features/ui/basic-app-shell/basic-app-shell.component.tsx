"use client";

import { AppShell, Burger, Group } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import Image from "next/image";
import NavbarContent from "../navbar-content/navbar-content.component";
import Link from "next/link";

export type BasicAppShellProps = {
  children: React.ReactNode;
  isLogged: boolean;
};

export function BasicAppShell({ children, isLogged }: BasicAppShellProps) {
  const [opened, toggle] = useToggle();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={() => toggle()}
            hiddenFrom="sm"
            size="sm"
          />
          <Link href="/">
            <Image
              src="/chambitos-logo.webp"
              alt="Chambitos"
              width={40}
              height={40}
            />
          </Link>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavbarContent onLinkClick={() => toggle()} isLogged={isLogged} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
