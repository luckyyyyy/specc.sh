import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "@specc/components";
import type { User } from "@specc/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { resolveAvatarUrl } from "@/lib/avatar";
import ProfileSettingsModal from "./ProfileSettingsModal";

type UserMenuProps = {
  user: User;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
  showDashboardLink?: boolean;
  /** Apply glassmorphism style to the dropdown panel (for landing page). */
  glassy?: boolean;
};

export default function UserMenu({
  user,
  onUpdateUser,
  onLogout,
  showDashboardLink = false,
  glassy = false,
}: UserMenuProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const displayName = user.name || user.email;

  const trigger = (
    <button
      type="button"
      className="cursor-pointer w-full flex items-center gap-2 rounded px-2 py-1.5 text-sm text-[var(--ui-text)] hover:bg-[var(--ui-sidebar-item-hover)] transition-colors"
    >
      <Avatar
        name={user.name}
        email={user.email}
        url={resolveAvatarUrl(user.settings?.avatarKey)}
        size="sm"
      />
      <span className="flex-1 text-left truncate font-medium">
        {displayName}
      </span>
    </button>
  );

  return (
    <>
      <Dropdown
        open={open}
        onOpenChange={setOpen}
        trigger={trigger}
        align="right"
        panelClassName={
          glassy
            ? "!bg-white/60 dark:!bg-zinc-900/50 !border-white/25 dark:!border-white/10 backdrop-blur-2xl !shadow-2xl"
            : ""
        }
      >
        <div className="px-4 py-2">
          <p className="text-sm font-medium text-[var(--ui-text)] truncate">
            {displayName}
          </p>
          <p className="text-xs text-[var(--ui-text-muted)] truncate">
            {user.email}
          </p>
        </div>
        <DropdownDivider />
        {showDashboardLink && (
          <DropdownItem
            onClick={() => {
              setOpen(false);
              navigate("/dashboard");
            }}
          >
            {t("landing.nav.dashboard")}
          </DropdownItem>
        )}
        <DropdownItem
          onClick={() => {
            setOpen(false);
            setSettingsOpen(true);
          }}
        >
          {t("user.profileSettings")}
        </DropdownItem>
        <DropdownItem
          danger
          onClick={() => {
            setOpen(false);
            onLogout();
          }}
        >
          {t("user.signOut")}
        </DropdownItem>
      </Dropdown>

      <ProfileSettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        user={user}
        onUpdateUser={onUpdateUser}
      />
    </>
  );
}
