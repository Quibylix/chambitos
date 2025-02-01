import { RouteProtectionInfo, routes } from "../constants/protected-routes";

export function getRouteProtectionInfo(pathname: string): RouteProtectionInfo {
  const paths = pathname.split(/(?=\/)/g) as `/${string}`[];

  if (!(paths[0] in routes || "/:" in routes)) {
    return {};
  }

  let data = paths[0] in routes ? routes[paths[0]] : routes["/:"];

  for (let i = 1; i < paths.length; i++) {
    if (!(paths[i] in data || "/:" in data)) {
      return {};
    }

    data = paths[i] in data ? data[paths[i]] : data["/:"];
  }

  return {
    allowedRoles: data.allowedRoles,
  };
}
