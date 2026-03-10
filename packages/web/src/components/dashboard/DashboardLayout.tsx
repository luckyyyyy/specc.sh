import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate, useParams } from "react-router";
import { UserMenu } from "@/components/account";
import { WorkspaceRedirectSkeleton } from "@/components/skeleton";
import { useAuth, useWorkspaceList, WorkspaceContext } from "@/hooks";
import CreateWorkspaceModal from "./CreateWorkspaceModal";
import SidebarNav from "./SidebarNav";
import WorkspaceSwitcher from "./WorkspaceSwitcher";

function WorkspaceNotFound({ slug }: { slug: string }) {
  const { t } = useTranslation();
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="rounded-lg border bg-[var(--ui-bg)] border-[var(--ui-border)] p-8 text-center space-y-3 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-[var(--ui-text)]">
          {t("errors.workspace.notFound")}
        </h2>
        <p className="text-[var(--ui-text-muted)]">
          <code className="text-[var(--ui-focus)]">/{slug}</code>{" "}
          {t("errors.workspace.notFoundDesc")}
        </p>
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  const { user, updateUser, logout } = useAuth();
  const { workspace: currentSlug } = useParams<{ workspace: string }>();
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);
  const { workspaces, isLoading } = useWorkspaceList();

  if (isLoading) {
    return <WorkspaceRedirectSkeleton />;
  }

  // list already filters by membership — not found means no access
  const currentWorkspace = currentSlug
    ? (workspaces.find((ws) => ws.slug === currentSlug) ?? null)
    : null;

  const workspaceNotFound = currentSlug && currentWorkspace === null;

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--ui-bg)]">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 flex flex-col border-r bg-[var(--ui-sidebar-bg)] border-[var(--ui-sidebar-border)]">
        {/* Workspace switcher — top */}
        <div className="border-b border-[var(--ui-sidebar-border)]">
          <WorkspaceSwitcher
            workspaces={workspaces}
            currentSlug={currentSlug}
            onCreateNew={() => setCreateOpen(true)}
          />
        </div>

        {/* Navigation area — grows */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <SidebarNav />
        </nav>

        {/* User menu — bottom */}
        {user && (
          <div className="border-t border-[var(--ui-sidebar-border)]">
            <UserMenu user={user} onUpdateUser={updateUser} onLogout={logout} />
          </div>
        )}
      </aside>

      {/* Scrollable main content */}
      <main className="flex-1 overflow-y-auto bg-[var(--ui-bg-subtle)]">
        {workspaceNotFound ? (
          <WorkspaceNotFound slug={currentSlug} />
        ) : (
          <WorkspaceContext.Provider value={currentWorkspace}>
            <Outlet />
          </WorkspaceContext.Provider>
        )}
      </main>

      <CreateWorkspaceModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={(ws) => {
          setCreateOpen(false);
          navigate(`/dashboard/${ws.slug}`);
        }}
      />
    </div>
  );
}
