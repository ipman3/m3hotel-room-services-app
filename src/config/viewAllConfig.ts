import type { SpaItem } from "@/types/spaItems";
import { spaItems } from "./data/wellness-spa";
import { serviceItems } from "./data/room-service";
import type { ServiceItem } from "@/types/ServiceItem";
import type { ThingItem } from "@/types/thingItem";
import { thingItems } from "./data/thing-to-do";

export type ViewAllItem = SpaItem | ServiceItem | ThingItem;

export const viewAllConfig: Record<string, { title: string; items: ViewAllItem[] }> = {
  "room-service": { title: "Service Room", items: serviceItems },
  "wellness-spa": { title: "Wellness & Spa", items: spaItems },
  "thing-to-do": { title: "Things To Do", items: thingItems },
};
