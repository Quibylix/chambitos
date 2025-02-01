export const noLoggedLinks = [
  { title: "Home", href: "/" },
  { title: "Jobs", href: "/jobs" },
  { title: "Sign In", href: "/sign-in" },
  { title: "Sign Up", href: "/sign-up" },
] as const;

export const loggedLinks = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Jobs", href: "/jobs" },
  { title: "Sign Out", href: "/sign-out", c: "red" },
] as const;
