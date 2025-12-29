"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "./api";

export function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    getMe().catch(() => {
      router.push("/login");
    });
  }, [router]);
}
