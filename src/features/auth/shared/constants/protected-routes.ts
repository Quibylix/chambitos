export type UserRole = "anon" | "incomplete" | "worker" | "contractor";

export const roleDefaultRedirects: Record<UserRole, string> = {
  anon: "/sign-in",
  incomplete: "/complete-data",
  worker: "/dashboard",
  contractor: "/dashboard",
};

export type RouteProtectionInfo = {
  allowedRoles?: UserRole[];
  [key: `/${string}`]: RouteProtectionInfo;
};

export const routes: Record<`/${string}`, RouteProtectionInfo> = {
  "/": {},
  "/dashboard": {
    allowedRoles: ["worker", "contractor"],
  },
  "/complete-data": {
    allowedRoles: ["incomplete"],
  },
  "/sign-in": {},
  "/sign-up": {},
  "/confirm-email": {},
  "/auth": {
    "/confirm": {},
  },
  "/jobs": {
    "/:": {},
    "/new": { allowedRoles: ["contractor"] },
    "/edit": {
      "/:": { allowedRoles: ["contractor"] },
    },
  },
};
