import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && !window.location.hostname.includes("localhost")
    ? "https://arrowcraft-backend.onrender.com"
    : "http://localhost:8000");
