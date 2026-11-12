import {
  BookUser,
  BriefcaseBusiness,
  CalendarDays,
  HandHeart,
  MessagesSquare,
  Newspaper,
  ReceiptText,
  Scale,
  Sprout,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { Pillar } from "@/data/programs";

export const pillarIcons: Record<Pillar["id"], LucideIcon> = {
  grow: Sprout,
  earn: BriefcaseBusiness,
  connect: UsersRound,
  give: HandHeart,
  represent: Scale,
};

export const featureIcons: Record<string, LucideIcon> = {
  directory: BookUser,
  mentoring: MessagesSquare,
  jobs: BriefcaseBusiness,
  events: CalendarDays,
  news: Newspaper,
  ledger: ReceiptText,
};

/** lucide icons at the 1.5px stroke from design.md */
export const iconStroke = 1.5;
