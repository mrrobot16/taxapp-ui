export interface Source {
  text: string;
  metadata: Record<string, string>;
  score: number;
}
  
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  phaseLabel?: string;
}
  
export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  history: HistoryEntry[];
}
  
export type BackendStatus = "loading" | "ok" | "no_index" | "offline";
  
export interface HistoryEntry {
  role: "user" | "assistant";
  content: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  name: string | null;
  picture: string | null;
}