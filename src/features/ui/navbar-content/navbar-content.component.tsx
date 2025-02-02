import { NavLink } from "@mantine/core";
import NextLink from "next/link";
import { loggedLinks, noLoggedLinks } from "./navbar-links.constant";

export type NavbarContentProps = {
  onLinkClick?: () => void;
  isLogged: boolean;
};

export default function NavbarContent({
  isLogged,
  onLinkClick,
}: NavbarContentProps) {
  const links = isLogged ? loggedLinks : noLoggedLinks;

  return (
    <>
      {links.map((link) => (
        <NavLink
          onClick={onLinkClick}
          component={NextLink}
          key={link.title}
          href={link.href}
          c={"c" in link ? link.c : "blue"}
          label={link.title}
        />
      ))}
    </>
  );
}
