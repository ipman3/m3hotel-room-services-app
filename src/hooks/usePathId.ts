import { useMatch, type RegisteredRouter, type RouteIds } from '@tanstack/react-router';


export function usePathId<T extends RouteIds<RegisteredRouter['routeTree']>>(from: T) {
  const match = useMatch({ from });

  const currentPath = match?.pathname || from;

  const pathId = currentPath.replace(/^\/|\/$/g, "");

  return pathId;
}

