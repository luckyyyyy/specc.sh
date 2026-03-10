/**
 * WhyVibeCodingFails — Why ordinary people struggle with Vibe Coding
 * Core message: without a project-level spec, AI output is inconsistent garbage
 */

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function NoSpecIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
}

function NoConstraintsIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function NoLanguageIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
      />
    </svg>
  );
}

const REASONS = [
  { key: "noSpec", Icon: NoSpecIcon },
  { key: "noConstraints", Icon: NoConstraintsIcon },
  { key: "noLanguage", Icon: NoLanguageIcon },
] as const;

export function WhyVibeCodingFails() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 overflow-hidden bg-zinc-50 dark:bg-zinc-900/50">
      {/* subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgb(99,102,241) 1px,transparent 1px),linear-gradient(to bottom,rgb(99,102,241) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            {t("landing.whyVibeFails.badge")}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-4 text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white"
        >
          {t("landing.whyVibeFails.sectionTitle")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-4 text-center text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          {t("landing.whyVibeFails.sectionSubtitle")}
        </motion.p>

        {/* Reason cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {REASONS.map(({ key, Icon }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
              className="flex flex-col gap-3 p-6 rounded-2xl border border-red-200/70 bg-white dark:bg-zinc-900 dark:border-red-900/40 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-red-500 dark:text-red-400" />
              </div>
              <p className="font-semibold text-zinc-900 dark:text-white text-sm">
                {t(`landing.whyVibeFails.reasons.${key}.title`)}
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                {t(`landing.whyVibeFails.reasons.${key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Result line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-400"
        >
          {t("landing.whyVibeFails.result")}
        </motion.p>

        {/* Callout quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="mt-6 mx-auto max-w-2xl rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 px-8 py-6 text-center"
        >
          <p className="text-indigo-700 dark:text-indigo-300 font-semibold text-base leading-relaxed">
            {t("landing.whyVibeFails.callout")}
          </p>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            {t("landing.whyVibeFails.solution")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
