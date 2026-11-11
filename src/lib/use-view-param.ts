import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * A dashboard's open tab, kept in the URL as ?view=… so a refresh, a bookmark
 * or the browser's Back button returns to the same tab instead of the first one.
 * The default tab keeps a clean URL (no ?view).
 */
export function useViewParam<T extends string>(views: readonly T[], fallback: T): [T, (next: T) => void] {
  const [params, setParams] = useSearchParams();
  const raw = params.get("view");
  const view = (views as readonly string[]).includes(raw ?? "") ? (raw as T) : fallback;

  const setView = useCallback(
    (next: T) => {
      setParams((prev) => {
        const p = new URLSearchParams(prev);
        if (next === fallback) p.delete("view");
        else p.set("view", next);
        return p;
      });
    },
    [setParams, fallback],
  );

  return [view, setView];
}
