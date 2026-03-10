---
description: "Use when working on frontend code: React components, hooks, pages, TailwindCSS styling, tRPC client calls, or UI architecture in packages/web or packages/components."
applyTo: "packages/web/**,packages/components/**"
---

# Frontend Patterns

## Component Architecture

| Type | Location | Rule |
|------|----------|------|
| Generic UI | `packages/components/src/` | Pure UI, no API calls, reusable across projects |
| Business | `packages/web/src/components/` | May call tRPC, contains business logic |

Before creating a component: check `packages/components/src/` first. If it exists, reuse or extend it (add props). Only create a new generic component there if it's pure UI. Only create in `packages/web/src/components/` if it needs API access.

Generic: Button, Modal, Input, Select, Avatar, Badge, Loading, Empty
Business: UserMenu, DashboardLayout, CreateWorkspaceModal

## Styling

- TailwindCSS 4 only — no antd, no @ant-design/icons
- Plain HTML elements with Tailwind classes; no inline styles unless dynamic values

## tRPC Client Usage

```typescript
import { trpc } from "@/lib/trpc";

// Query
const { data, isLoading, error } = trpc.user.getProfile.useQuery();

// Mutation
const updateMutation = trpc.user.updateProfile.useMutation({
  onSuccess: () => { /* handle success */ }
});
```

## i18n

```typescript
import { useTranslation } from "react-i18next";
const { t } = useTranslation();
// t("common:save"), t("user:profile")
```

Add translations to both `packages/i18n/src/locales/en/` and `zh/`. **Never hardcode UI strings — always use i18n keys.**

## Error Pages

Use `ErrorPage` from `@/components/error/ErrorPage`. Required props:

```tsx
<ErrorPage
  code="404"
  title={t("common.notFoundTitle")}
  description={t("common.notFoundDesc")}
  variant="primary"                      // "primary" (blue) | "danger" (red)
  secondaryLabel={t("common.backToPrevious")}
  // secondaryTo="/login"               // optional — omit to use history.back()
/>
```

Icons are hardcoded by variant. `primaryTo` defaults to `"/"`.

## Extracting Async Side Effects to Hooks

When a component manages async operations (file upload, multi-step mutations), extract to a hook to keep the component focused on rendering:

```typescript
// packages/web/src/hooks/useAvatarUpload.ts — example pattern
export function useFeatureUpload(user: User, onUpdateUser: (u: User) => void) {
  const [key, setKey] = useState(user.settings?.someKey ?? "");
  const [uploading, setUploading] = useState(false);
  const deleteMutation = trpc.feature.delete.useMutation({ ... });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => { ... };
  const syncFromUser = useCallback((u: User) => { setKey(u.settings?.someKey ?? ""); }, []);

  return { key, url: resolveAvatarUrl(key), uploading, deleteMutation, handleFileChange, syncFromUser };
}
```

## Storage / File URL

- Backend returns `key` (e.g. `userId/1234.jpg`), never a full URL
- Use `resolveAvatarUrl(key)` from `@/lib/avatar` to get the full URL for display
- Base URL comes from `VITE_STORAGE_PUBLIC_URL` env var

```typescript
import { resolveAvatarUrl } from "@/lib/avatar";
<Avatar url={resolveAvatarUrl(user.settings?.avatarKey)} />
```
