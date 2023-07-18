import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createCompetitionId() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function objToArr<T extends Record<string, unknown>>(
  obj: T
): Array<keyof typeof obj> {
  if (!obj) return [];

  return Object.keys(obj);
}
