import { Button, Input, Modal } from "@specc/components";
import { slugify } from "@specc/types";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { message } from "@/lib/message";
import { trpc } from "@/lib/trpc";

interface CreateWorkspaceModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (workspace: { id: string; slug: string; name: string }) => void;
}

export default function CreateWorkspaceModal({
  open,
  onClose,
  onSuccess,
}: CreateWorkspaceModalProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [description, setDescription] = useState("");
  const utils = trpc.useUtils();

  const createMutation = trpc.workspace.create.useMutation({
    onSuccess: async (data) => {
      message.success(t("workspace.createSuccess"));
      await utils.workspace.list.invalidate();
      reset();
      onSuccess?.(data);
    },
    onError: (err) => {
      message.error(err.message || t("workspace.createFailed"));
    },
  });

  const reset = useCallback(() => {
    setName("");
    setSlug("");
    setSlugEdited(false);
    setDescription("");
  }, []);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const handleNameChange = (v: string) => {
    setName(v);
    if (!slugEdited) setSlug(slugify(v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMutation.mutateAsync({
      name,
      slug: slug || undefined,
      description: description || undefined,
    });
  };

  return (
    <Modal open={open} onClose={onClose} title={t("workspace.new")}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={t("workspace.name")}
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          required
          placeholder={t("workspace.namePlaceholder")}
        />
        <Input
          label={t("workspace.slugLabel")}
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugEdited(true);
          }}
          placeholder={t("workspace.slugPlaceholder")}
        />
        <Input
          label={t("workspace.description")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-3 pt-2">
          <Button variant="secondary" fullWidth type="button" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            variant="primary"
            fullWidth
            type="submit"
            loading={createMutation.isPending}
          >
            {t("workspace.create")}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
