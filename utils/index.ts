import { RANDOM_ID_SLICE_END, RANDOM_ID_SLICE_START } from "@/config";

export function uid() {
  return Math.random().toString(36).slice(RANDOM_ID_SLICE_START, RANDOM_ID_SLICE_END);
}

export function isMobile() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
}