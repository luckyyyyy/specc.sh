const avatarColors = [
  "#60a5fa",
  "#34d399",
  "#f97316",
  "#a78bfa",
  "#f43f5e",
  "#14b8a6",
  "#eab308",
  "#38bdf8",
  "#8b5cf6",
  "#f59e0b",
];

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const getAvatarColor = (value?: string | null) => {
  if (!value) return avatarColors[0];
  const hash = hashString(value);
  return avatarColors[hash % avatarColors.length];
};

export const getAvatarInitial = (
  name?: string | null,
  email?: string | null,
) => {
  const base = (name || email || "").trim();
  if (!base) return "?";
  return base[0].toUpperCase();
};
