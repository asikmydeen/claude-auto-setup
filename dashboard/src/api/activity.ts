import { api } from "./client";
import type { ActivityEntry } from "@/types/adapters";

export function getActivity(): Promise<ActivityEntry[]> {
  return api.get<ActivityEntry[]>("/activity");
}

export function logActivity(entry: Omit<ActivityEntry, "id" | "timestamp">): Promise<void> {
  return api.post("/activity", entry);
}
