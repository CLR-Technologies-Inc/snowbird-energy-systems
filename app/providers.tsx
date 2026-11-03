"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "@posthog/react";

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    if (!token) return;
    posthog.init(token, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: "2026-08-30",
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
