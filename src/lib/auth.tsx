"use client";

import { createLocalStore, useHydrated } from "@/lib/local-store";
import { demoUser, type DemoUser } from "@/data/alumni";

/**
 * Mock auth for the prototype. Any email/password "works"; nothing is secure.
 * Stored under the localStorage key `ika-demo-user`.
 */
const userStore = createLocalStore<DemoUser | null>("ika-demo-user", null);

export function useAuth() {
  const user = userStore.useValue();
  const ready = useHydrated();

  function login(email?: string) {
    userStore.set({ ...demoUser, email: email?.trim() || demoUser.email });
  }

  function logout() {
    userStore.set(null);
  }

  return { user, ready, login, logout };
}
