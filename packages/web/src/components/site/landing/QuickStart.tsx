import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const INSTALL_CMD = "curl -fsSL https://specc.sh | bash";

const PREREQS = ["node", "docker", "pnpm"] as const;

export function QuickStart() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(INSTALL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section
      id="quickStart"
      className="relative py-24 sm:py-32 bg-white dark:bg-zinc-950"
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {t("landing.quickStart.sectionTitle")}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t("landing.quickStart.sectionSubtitle")}
          </p>
        </motion.div>

        {/* Mac terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-xl overflow-hidden border border-zinc-300/60 dark:border-zinc-700/60 shadow-2xl shadow-zinc-900/20 dark:shadow-black/40"
        >
          {/* Title bar */}
          <div className="relative flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-zinc-700/50">
            {/* Traffic lights */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#28ca41] shadow-sm" />
            </div>
            {/* Window title */}
            <span className="absolute left-1/2 -translate-x-1/2 text-xs text-zinc-400 font-medium select-none">
              {t("landing.quickStart.terminalTitle")} — bash
            </span>
            {/* Copy button */}
            <button
              type="button"
              onClick={handleCopy}
              title={t("landing.quickStart.copyTooltip")}
              className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150
                text-zinc-400 hover:text-white hover:bg-zinc-700/60 cursor-pointer"
            >
              {copied ? (
                <>
                  <svg
                    className="w-3.5 h-3.5 text-[#28ca41]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-[#28ca41]">
                    {t("landing.quickStart.copied")}
                  </span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>{t("landing.quickStart.copyTooltip")}</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal body */}
          <div className="bg-[#1e1e2e] px-6 py-5 font-mono text-sm overflow-x-auto">
            <div className="flex items-center gap-2 whitespace-nowrap">
              {/* Prompt */}
              <span className="select-none text-[#28ca41] font-semibold flex-shrink-0">
                ~
              </span>
              <span className="select-none text-[#abb2bf] flex-shrink-0">
                $
              </span>
              {/* Command — single line, syntax highlighted */}
              <span>
                <span style={{ color: "#56b6c2" }}>curl</span>{" "}
                <span style={{ color: "#98c379" }}>-fsSL</span>{" "}
                <span style={{ color: "#c678dd" }}>https://specc.sh</span>{" "}
                <span style={{ color: "#abb2bf" }}>|</span>{" "}
                <span style={{ color: "#56b6c2" }}>bash</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Prerequisites + fork link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Prerequisites */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {t("landing.quickStart.prereqTitle")}:
            </span>
            {PREREQS.map((key) => (
              <span
                key={key}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium
                  bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300
                  border border-zinc-200 dark:border-zinc-700"
              >
                {t(`landing.quickStart.prereqs.${key}`)}
              </span>
            ))}
          </div>

          {/* Fork link */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {t("landing.quickStart.orFork")}
            </span>
            <a
              href="https://github.com/luckyyyyy/specc.sh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                bg-zinc-900 dark:bg-white text-white dark:text-zinc-900
                hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {t("landing.quickStart.forkBtn")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
