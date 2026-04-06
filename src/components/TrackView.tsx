"use client";

import { useEffect } from "react";

export default function TrackView() {
  useEffect(() => {
    if (!sessionStorage.getItem("landing_viewed")) {
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "landing_view" }),
      }).catch(() => {});
      sessionStorage.setItem("landing_viewed", "1");
    }
  }, []);

  return null;
}
