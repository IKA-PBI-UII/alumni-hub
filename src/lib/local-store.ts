"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny external store backed by localStorage (with an in-memory fallback when
 * storage is blocked). Safe for SSR: the server snapshot is always `initial`.
 */
export function createLocalStore<T>(key: string, initial: T) {
  const listeners = new Set<() => void>();
  let memoryRaw: string | null = null;
  let cache: { raw: string | null; value: T } | null = null;

  function readRaw(): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return memoryRaw;
    }
  }

  function get(): T {
    const raw = readRaw();
    if (cache && cache.raw === raw) return cache.value;
    let value = initial;
    if (raw) {
      try {
        value = JSON.parse(raw) as T;
      } catch {
        value = initial;
      }
    }
    cache = { raw, value };
    return value;
  }

  function set(next: T | ((prev: T) => T)) {
    const value = typeof next === "function" ? (next as (p: T) => T)(get()) : next;
    const raw = value === null ? null : JSON.stringify(value);
    memoryRaw = raw;
    try {
      if (raw === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, raw);
    } catch {
      /* storage blocked: memory fallback keeps the demo working */
    }
    cache = { raw, value };
    listeners.forEach((l) => l());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  function useValue(): T {
    return useSyncExternalStore(subscribe, get, () => initial);
  }

  return { get, set, useValue };
}

const noopSubscribe = () => () => {};

/** False during SSR and hydration, true once running on the client. */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
