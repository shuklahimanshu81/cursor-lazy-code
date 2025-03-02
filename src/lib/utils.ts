import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SUPPORTED_LANGUAGES = [
  { name: "JavaScript", value: "javascript" },
  { name: "TypeScript", value: "typescript" },
  { name: "Python", value: "python" },
  { name: "Java", value: "java" },
  { name: "C++", value: "cpp" },
  { name: "Ruby", value: "ruby" },
  { name: "Go", value: "go" },
  { name: "Rust", value: "rust" },
] as const;

export type Language = typeof SUPPORTED_LANGUAGES[number]["value"];

export function getLanguageName(value: Language) {
  return SUPPORTED_LANGUAGES.find((lang) => lang.value === value)?.name || value;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
} 