"use client";

import { useState, useTransition } from "react";
import { updateUserRole } from "@/lib/admin/actions";

interface UserRoleControlProps {
  userId: string;
  currentRole: "user" | "admin";
  isSelf: boolean;
}

export function UserRoleControl({
  userId,
  currentRole,
  isSelf,
}: UserRoleControlProps) {
  const [role, setRole] = useState(currentRole);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleChange(nextRole: "user" | "admin") {
    if (nextRole === role) return;
    setError(null);

    const previous = role;
    setRole(nextRole); // optimistic

    startTransition(async () => {
      const result = await updateUserRole(userId, nextRole);
      if (!result.success) {
        setRole(previous);
        setError(result.error);
      }
    });
  }

  if (isSelf) {
    return (
      <span
        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-brand-amber/30 bg-brand-amber/10 text-brand-amber"
        title="You can't change your own role"
      >
        Admin (you)
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-fit">
      <div className="inline-flex items-center rounded-full border border-glass-border bg-white/5 p-0.5 text-xs font-medium">
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleChange("user")}
          className={`px-3 py-1 rounded-full transition-colors disabled:opacity-50 ${
            role === "user"
              ? "bg-white/15 text-white"
              : "text-brand-muted hover:text-white"
          }`}
        >
          User
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleChange("admin")}
          className={`px-3 py-1 rounded-full transition-colors disabled:opacity-50 ${
            role === "admin"
              ? "bg-brand-amber/20 text-brand-amber border border-brand-amber/30"
              : "text-brand-muted hover:text-white"
          }`}
        >
          Admin
        </button>
      </div>
      {error && <span className="text-[11px] text-red-400">{error}</span>}
    </div>
  );
}
