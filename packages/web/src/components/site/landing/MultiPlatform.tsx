/**
 * MultiPlatform — True full-platform, full-stack coverage section
 * Shows all supported platforms: web, admin, SSR marketing, mini-program, mobile (coming soon)
 * Highlights the shared foundation: tRPC, Zod types, i18n, auth, business logic
 */

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type IconProps = { className?: string };

function MonitorIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 7.91a2.25 2.25 0 01-.97-1.666V5.25"
      />
    </svg>
  );
}

function LayoutIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h7.5c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m-7.5 0h7.5"
      />
    </svg>
  );
}

function GlobeIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );
}

function DevicePhoneIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    </svg>
  );
}

function MiniAppIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
      />
    </svg>
  );
}

function RocketIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
      />
    </svg>
  );
}

// ── Platform data ──────────────────────────────────────────────────────────

type PlatformKey = "webApp" | "admin" | "marketing" | "miniapp" | "mobileApp";

interface Platform {
  key: PlatformKey;
  Icon: React.ComponentType<IconProps>;
  iconGradient: string;
  glowGradient: string;
  badgeClass: string;
  comingSoon?: boolean;
}

const PLATFORMS: Platform[] = [
  {
    key: "webApp",
    Icon: MonitorIcon,
    iconGradient: "from-blue-500 to-cyan-500",
    glowGradient: "from-blue-500/20 to-cyan-500/20",
    badgeClass:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
  },
  {
    key: "admin",
    Icon: LayoutIcon,
    iconGradient: "from-indigo-500 to-violet-500",
    glowGradient: "from-indigo-500/20 to-violet-500/20",
    badgeClass:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800",
  },
  {
    key: "marketing",
    Icon: GlobeIcon,
    iconGradient: "from-emerald-500 to-teal-500",
    glowGradient: "from-emerald-500/20 to-teal-500/20",
    badgeClass:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
  },
  {
    key: "miniapp",
    Icon: MiniAppIcon,
    iconGradient: "from-green-500 to-emerald-500",
    glowGradient: "from-green-500/20 to-emerald-500/20",
    badgeClass:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-200 dark:border-green-800",
  },
  {
    key: "mobileApp",
    Icon: DevicePhoneIcon,
    iconGradient: "from-zinc-400 to-zinc-500",
    glowGradient: "from-zinc-400/10 to-zinc-500/10",
    badgeClass:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
    comingSoon: true,
  },
];

const SHARED_ITEM_STYLES = [
  "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
  "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-800",
  "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800",
  "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
  "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/50 dark:text-pink-300 dark:border-pink-800",
];

// ── Platform card ──────────────────────────────────────────────────────────

function PlatformCard({
  platform,
  index,
}: {
  platform: Platform;
  index: number;
}) {
  const { t } = useTranslation();
  const { Icon, iconGradient, glowGradient, badgeClass, comingSoon } = platform;
  const k = platform.key;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300 ${
        comingSoon
          ? "border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/60 dark:bg-zinc-900/40"
          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg"
      }`}
    >
      {/* Glow on hover */}
      {!comingSoon && (
        <div
          className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${glowGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`}
        />
      )}

      {/* Icon + badge row */}
      <div className="flex items-start justify-between">
        <div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${iconGradient} text-white shadow-md ${comingSoon ? "opacity-50" : ""}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}
        >
          {t(`landing.multiPlatform.platforms.${k}.badge`)}
        </span>
      </div>

      {/* Name + desc */}
      <div className={comingSoon ? "opacity-50" : ""}>
        <h3 className="font-bold text-zinc-900 dark:text-white text-base mb-1.5">
          {t(`landing.multiPlatform.platforms.${k}.name`)}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {t(`landing.multiPlatform.platforms.${k}.desc`)}
        </p>
      </div>

      {/* Tech tag */}
      <div
        className={`mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 ${comingSoon ? "opacity-40" : ""}`}
      >
        <code className="text-xs text-zinc-500 dark:text-zinc-500 font-mono">
          {t(`landing.multiPlatform.platforms.${k}.tech`)}
        </code>
      </div>
    </motion.div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────

export function MultiPlatform() {
  const { t } = useTranslation();

  const sharedKeys = ["types", "trpc", "i18n", "auth", "business"] as const;

  return (
    <section
      id="multiPlatform"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-4">
            <RocketIcon className="w-3.5 h-3.5" />
            {t("landing.multiPlatform.badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            {t("landing.multiPlatform.sectionTitle")}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t("landing.multiPlatform.sectionSubtitle")}
          </p>
        </motion.div>

        {/* ── Platform cards grid ── */}
        {/* 4 active + 1 coming soon: 2-2-1 on desktop via grid tricks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {PLATFORMS.slice(0, 3).map((p, i) => (
            <PlatformCard key={p.key} platform={p} index={i} />
          ))}
          {/* Bottom row: 2 cards centered */}
          <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 lg:max-w-2xl lg:mx-auto w-full">
            {PLATFORMS.slice(3).map((p, i) => (
              <PlatformCard key={p.key} platform={p} index={3 + i} />
            ))}
          </div>
        </div>

        {/* ── Shared foundation ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 overflow-hidden"
        >
          {/* Background shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-emerald-500/5 pointer-events-none" />

          <div className="relative">
            <div className="text-center mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
                {t("landing.multiPlatform.sharedSubtitle")}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                {t("landing.multiPlatform.sharedTitle")}
              </h3>
            </div>

            {/* Shared items */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {sharedKeys.map((key, i) => (
                <motion.span
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.4 + i * 0.06 }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border ${SHARED_ITEM_STYLES[i]}`}
                >
                  {t(`landing.multiPlatform.sharedItems.${key}`)}
                </motion.span>
              ))}
            </div>

            {/* One-prompt callout */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center"
            >
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                <span className="w-12 h-px bg-zinc-300 dark:bg-zinc-700" />
                {t("landing.multiPlatform.onePrompt")}
                <span className="w-12 h-px bg-zinc-300 dark:bg-zinc-700" />
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
