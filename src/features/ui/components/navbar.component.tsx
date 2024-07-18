"use client";

import {
  Navbar as BaseNavbar,
  Button,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";

type NavbarProps = {
  session: Session | null;
};

export default function Navbar({ session }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Inicio", href: "/" },
    { name: "Trabajos", href: "/jobs" },
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Contacto", href: "mailto:chambitos.team@gmail.com" },
  ];

  function handleLinkClick() {
    setIsMenuOpen(false);
  }

  return (
    <BaseNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <img
              src="/chambitos-logo.webp"
              className="w-auto h-10"
              alt="Chambitos Logo"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`}>
            <Link href={item.href} onClick={handleLinkClick}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {session ? (
            <img
              src={session.user?.image ?? ""}
              alt="User Profile Picture"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <Button
              as={Link}
              color="primary"
              href="/auth/sign-in"
              variant="solid"
            >
              Empezar
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link className="w-full" href={item.href} onClick={handleLinkClick}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </BaseNavbar>
  );
}
