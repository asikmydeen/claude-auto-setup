import { api } from "./client";
import type { Session, AgentState } from "@/types/adapters";

export function getSessions(): Promise<Session[]> {
  return api.get<Session[]>("/sessions");
}

export function getSession(id: string): Promise<Session> {
  return api.get<Session>(`/sessions/${id}`);
}

export function reportAgentState(sessionId: string, agent: AgentState): Promise<void> {
  return api.post(`/sessions/${sessionId}/agents`, agent);
}

export function sendSteeringCommand(
  sessionId: string,
  command: { type: "pause" | "instruct"; message?: string }
): Promise<void> {
  return api.post(`/sessions/${sessionId}/steering`, command);
}
