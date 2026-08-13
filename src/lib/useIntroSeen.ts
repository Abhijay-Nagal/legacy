"use client";

import { useEffect, useState } from "react";

const KEY = "legacy_intro_seen";

export function useIntroSeen() {
  const [seen, setSeen] = useState<boolean | null>(null);

  useEffect(() => {
    // Intentional: sessionStorage is only available after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSeen(sessionStorage.getItem(KEY) === "true");
  }, []);

  const markSeen = () => {
    sessionStorage.setItem(KEY, "true");
    setSeen(true);
  };

  return { seen, markSeen };
}
