import type { User } from "@specc/types";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { resolveAvatarUrl } from "@/lib/avatar";
import { message } from "@/lib/message";
import { trpc } from "@/lib/trpc";

/**
 * Encapsulates avatar upload / delete state and handlers.
 * Used by ProfileSettingsModal to keep that component focused on the form.
 *
 * Internally tracks `avatarKey` (the storage key, e.g. "userId/1234.jpg").
 * Consumers get `avatarUrl` — the fully resolved public URL derived from
 * VITE_STORAGE_PUBLIC_URL — for display purposes.
 */
export function useAvatarUpload(
  user: User,
  onUpdateUser: (user: User) => void,
) {
  const { t } = useTranslation();
  const [avatarKey, setAvatarKey] = useState(user.settings?.avatarKey ?? "");
  const [uploading, setUploading] = useState(false);

  const deleteMutation = trpc.user.deleteAvatar.useMutation({
    onSuccess: (updated) => {
      setAvatarKey("");
      onUpdateUser(updated);
      message.success(t("user.avatarRemoved"));
    },
    onError: (err) => {
      message.error(err.message || t("user.avatarRemoveFailed"));
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/upload/avatar", {
        method: "POST",
        body,
        credentials: "include",
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? t("user.uploadFailed"));
      }
      const data = (await res.json()) as { key: string; user: User };
      setAvatarKey(data.key);
      onUpdateUser(data.user);
      message.success(t("user.avatarUpdated"));
    } catch (err) {
      message.error(
        err instanceof Error ? err.message : t("user.uploadFailed"),
      );
    } finally {
      setUploading(false);
    }
  };

  // Sync when modal reopens with a different user
  const syncFromUser = useCallback((u: User) => {
    setAvatarKey(u.settings?.avatarKey ?? "");
  }, []);

  return {
    avatarKey,
    avatarUrl: resolveAvatarUrl(avatarKey),
    uploading,
    deleteMutation,
    handleFileChange,
    syncFromUser,
  };
}
