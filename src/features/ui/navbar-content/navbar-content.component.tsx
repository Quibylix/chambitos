import { Anchor } from "@mantine/core";
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
        <Anchor
          onClick={onLinkClick}
          component={NextLink}
          key={link.title}
          mt={10}
          href={link.href}
          c={"c" in link ? link.c : undefined}
        >
          {link.title}
        </Anchor>
      ))}
    </>
  );
}
