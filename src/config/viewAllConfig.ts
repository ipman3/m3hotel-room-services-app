// import { spaItems } from "@/config/data/wellness-spa";
// import type { SpaItem } from "@/types/spaItems";

// export const viewAllConfig: Record<string, { title: string; items: SpaItem[] }> = {
//   "room-service": { title: "Service Room", items: [] },
//   "wellness-spa": { title: "Wellness & Spa", items: spaItems },
//   "activities": { title: "Things To Do", items: [] },
// };


// dynamic
import type { SpaItem } from "@/types/spaItems";
import { spaItems } from "./data/wellness-spa";
import { serviceItems } from "./data/room-service";
import type { ServiceItem } from "@/types/ServiceItem";
// import type { ServiceItem } from "@/types/serviceItems";
// import type { ThingsToDoItem } from "@/types/thingsToDoItems";

export type ViewAllItem = SpaItem | ServiceItem | ThingsToDoItem;

export const viewAllConfig: Record<string, { title: string; items: ViewAllItem[] }> = {
  "room-service": { title: "Service Room", items: serviceItems },
  "wellness-spa": { title: "Wellness & Spa", items: spaItems },
  // "activities": { title: "Things To Do", items: activitiesItems },
};
