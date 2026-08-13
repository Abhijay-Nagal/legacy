import { MessageSquare, FileText, Layers, type LucideIcon } from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { id: "qa", label: "Q&A", icon: MessageSquare },
  { id: "summary", label: "Summary", icon: FileText },
  { id: "flashcard", label: "Flashcard", icon: Layers },
];
