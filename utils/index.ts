import { RANDOM_ID_SLICE_END, RANDOM_ID_SLICE_START } from "@/config";

export function uid() {
  return Math.random().toString(36).slice(RANDOM_ID_SLICE_START, RANDOM_ID_SLICE_END);
}