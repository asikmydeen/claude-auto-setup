import { api } from "./client";
import type { SkillMetadata } from "@/types/adapters";

export function getSkills(): Promise<SkillMetadata[]> {
  return api.get<SkillMetadata[]>("/skills");
}
