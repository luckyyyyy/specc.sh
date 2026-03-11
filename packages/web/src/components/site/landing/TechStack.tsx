import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const STACK = [
  {
    categoryKey: "backend" as const,
    color: "text-orange-600 dark:text-orange-400",
    items: [
      { name: "Hono", descKey: "honoDesc" as const, logo: "🌐" },
      { name: "tRPC v11", descKey: "trpcDesc" as const, logo: "🔗" },
      { name: "Prisma ORM", descKey: "prismaDesc" as const, logo: "🗄" },
      { name: "PostgreSQL 18", descKey: "postgresDesc" as const, logo: "🐘" },
    ],
  },
  {
    categoryKey: "frontend" as const,
    color: "text-blue-600 dark:text-blue-400",
    items: [
      { name: "React 19", descKey: "reactDesc" as const, logo: "⚛" },
      { name: "Vite 7", descKey: "viteDesc" as const, logo: "⚡" },
      { name: "TailwindCSS 4", descKey: "tailwindDesc" as const, logo: "🎨" },
      { name: "TanStack Query", descKey: "tanstackDesc" as const, logo: "🔄" },
    ],
  },
  {
    categoryKey: "tooling" as const,
    color: "text-violet-600 dark:text-violet-400",
    items: [
      { name: "TypeScript 5", descKey: "typescriptDesc" as const, logo: "📘" },
      { name: "Zod v4", descKey: "zodDesc" as const, logo: "✅" },
      { name: "Biome", descKey: "biomeDesc" as const, logo: "⚡" },
      { name: "pnpm Monorepo", descKey: "pnpmDesc" as const, logo: "📦" },
    ],
  },
] as const;

export function TechStack() {
  const { t } = useTranslation();

  return (
    <section
      id="techStack"
      className="relative py-24 sm:py-32 bg-white dark:bg-zinc-950"
    >
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {t("landing.techStack.sectionTitle")}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t("landing.techStack.sectionSubtitle")}
          </p>
        </motion.div>

        {/* AI tools card - model agnostic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 rounded-2xl border border-violet-200 dark:border-violet-800/50 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0 text-4xl">🤖</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {t("landing.techStack.anyAiTitle")}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                  {t("landing.techStack.modelAgnostic")}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {t("landing.features.items.aiSpeed.desc")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium">
              {[
                "Claude Code",
                "Copilot",
                "Cursor",
                "Codex",
                "Gemini",
                "GLM",
                "Qwen",
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-1 rounded-md bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stack grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STACK.map((group, gi) => (
            <motion.div
              key={group.categoryKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + gi * 0.1 }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
            >
              {/* Category header */}
              <div className="px-5 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                <span className={`text-sm font-semibold ${group.color}`}>
                  {t(`landing.techStack.categories.${group.categoryKey}`)}
                </span>
              </div>
              {/* Items */}
              <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {group.items.map((item, ii) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: 0.15 + gi * 0.1 + ii * 0.06,
                    }}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <span className="text-xl w-7 text-center">{item.logo}</span>
                    <div>
                      <span className="text-sm font-medium text-zinc-900 dark:text-white">
                        {item.name}
                      </span>
                      <span className="block text-xs text-zinc-500 dark:text-zinc-500">
                        {t(`landing.techStack.items.${item.descKey}`)}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Monorepo structure note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 dark:bg-black p-6 font-mono"
        >
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-3">
            {t("landing.techStack.monorepoComment")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            {[
              {
                path: "packages/server",
                color: "text-orange-400",
                descKey: "server" as const,
              },
              {
                path: "packages/web",
                color: "text-blue-400",
                descKey: "web" as const,
              },
              {
                path: "packages/types",
                color: "text-emerald-400",
                descKey: "types" as const,
              },
              {
                path: "packages/components",
                color: "text-pink-400",
                descKey: "components" as const,
              },
              {
                path: "packages/miniapp",
                color: "text-violet-400",
                descKey: "miniapp" as const,
              },
            ].map((m) => (
              <div key={m.path}>
                <span className={m.color}>{m.path}</span>
                <span className="block text-zinc-600 dark:text-zinc-600 mt-0.5">
                  {t(`landing.techStack.monorepoDescs.${m.descKey}`)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
