import type { LandingSchema } from "./zh.js";

export const landingEn: LandingSchema = {
  ui: {
    // Header
    nav: {
      features: "Why This Template",
      howItWorks: "How it Works",
      multiPlatform: "All Platforms",
      techStack: "Tech Stack",
      quickStart: "Quick Start",
      github: "GitHub",
      getStarted: "Get Started",
      dashboard: "Dashboard",
    },
    // Hero
    hero: {
      badge: "The End of Handwritten Code",
      title1: "Your AI Writes",
      title2: "You Ship",
      subtitle:
        "Describe your idea. AI handles the rest. — A full-stack spec template for AI, making your Claude Code / Copilot / Cursor / Codex produce production-grade code every time. Supports web frontend, admin dashboard, SSR marketing site, WeChat Mini-Program, with mobile app support coming soon",
      ctaGithub: "Fork Template",
      ctaLearn: "Explore Architecture",
      techBadges: {
        typeSafe: "Zero Module Coupling",
        aiPowered: "Any Platform, One Prompt",
        fullStack: "Production-Grade Output",
      },
      miu2dProof: "miu2d.com was built with this template",
    },
    // Features
    features: {
      sectionTitle: "Why You Need This Template",
      sectionSubtitle:
        "Vibe Coding lets AI freestyle — the result is a mess. Spec Coding is different: the architecture itself is the prompt. No docs to write. The folder structure, types, and lint rules tell AI exactly what to do — production-grade output every time",
      items: {
        typeSafe: {
          title: "Tame AI Output",
          desc: "tRPC + Zod v4 end-to-end types. AI writes code, compiler enforces it — non-compliant output fails instantly",
        },
        aiSpeed: {
          title: "Works with Any AI Tool",
          desc: "Claude Code, Copilot, Cursor, Codex, Gemini CLI, GLM, Qwen — use any model freely. The template enforces quality, not the tool",
        },
        database: {
          title: "Non-Programmers Welcome",
          desc: "Describe in plain language. AI auto-generates schema, API, and pages — no coding knowledge required",
        },
        ui: {
          title: "UI Framework Freedom",
          desc: "TailwindCSS 4 by default. Swap to shadcn/ui, Ant Design, or MUI anytime — zero coupling, AI handles the switch",
        },
        auth: {
          title: "Fully Decoupled Modules",
          desc: "Routing, auth, storage, and UI are all independently replaceable. Change one module, break nothing else",
        },
        i18n: {
          title: "Biome — Always Clean",
          desc: "Biome replaces ESLint + Prettier with Rust-powered lint. make lint always passes — any AI's code is always clean",
        },
        theme: {
          title: "Multi-Theme Out of the Box",
          desc: "Light, dark, and auto modes pre-configured. CSS variable-driven — AI can add brand themes in minutes without touching components",
        },
        locale: {
          title: "i18n Out of the Box",
          desc: "React i18next pre-configured with EN/ZH support. AI adds new locales seamlessly — zero component changes needed",
        },
        workspace: {
          title: "Multi-Tenant Out of the Box",
          desc: "Tenant isolation, session auth, role-based permissions, and invite system — all ready. AI extends them in minutes",
        },
      },
    },
    // How it works
    howItWorks: {
      sectionTitle: "Ship a Feature in 3 Steps",
      sectionSubtitle:
        "You don't need to know how to code — tell AI what you want, the template ensures it’s done right",
      steps: {
        step1: {
          title: "Describe What You Want",
          desc: 'Tell your AI tool in plain language: "Add a team invitation feature with email notification" — just like talking to a person',
        },
        step2: {
          title: "AI Generates Standardized Code",
          desc: "AI auto-generates database schema, backend API, and frontend components — all following template conventions, no improvising",
        },
        step3: {
          title: "Deploy to Production",
          desc: "Type-safe, zero runtime errors, lint auto-passes — code quality rivals hand-crafted work, but you didn’t write a single line",
        },
      },
    },
    // Tech Stack
    techStack: {
      sectionTitle: "Best-in-Class Stack",
      sectionSubtitle:
        "Every choice makes AI easier to understand and harder to mess up — this isn’t tech stacking, it’s an arsenal built for AI",
      anyAiTitle: "Any AI, Same Quality",
      modelAgnostic: "Model Agnostic",
      categories: {
        backend: "Backend",
        frontend: "Frontend",
        tooling: "Tooling & AI",
      },
      items: {
        honoDesc: "Web framework",
        trpcDesc: "Type-safe API",
        prismaDesc: "Database toolkit",
        postgresDesc: "Database",
        reactDesc: "UI framework",
        viteDesc: "Build tool",
        tailwindDesc: "Styling",
        tanstackDesc: "Data fetching",
        typescriptDesc: "Type system",
        zodDesc: "Schema validation",
        biomeDesc: "ESLint + Prettier replacement, Rust-fast",
        pnpmDesc: "Workspace mgmt",
      },
      monorepoComment: "# pnpm monorepo structure",
      monorepoDescs: {
        server: "Hono + tRPC + Prisma",
        web: "React 19 + Vite 7 (SSR + CSR)",
        types: "Zod v4 schemas",
        components: "UI design system",
        miniapp: "WeChat Mini-Program · Taro + React",
      },
    },
    // CTA
    cta: {
      title: "Artisan Hand-Coding? That Era Is Over",
      subtitle:
        "The AI era is here — the software industry is being completely restructured. Those still handwriting every line will be replaced by those shipping with templates + AI. Now supporting web, mini-program, SSR marketing sites, with mobile app coming soon. The world is being rewritten — are you watching, or are you writing?",
      ctaGithub: "Fork Template, Start Now",
      ctaDocs: "View Docs",
    },
    // HowItWorks
    howItWorksDemo: {
      typesInferred: "Types inferred",
      lintPassed: "Lint passed",
      prMerged: "PR merged",
    },
    // Highlights
    highlights: {
      title: "AI Is Powerful, But It Needs Rules",
      subtitle:
        "Vibe Coding is just the beginning. Spec Coding is the endgame — with specs, every AI generation is production-grade code",
      trpc: {
        title: "End-to-End Type Safety",
        desc: "tRPC + Zod v4 full-chain inference. When AI changes an API, the compiler instantly checks upstream and downstream — not relying on AI discipline, but on compiler guarantees",
        stat1: "0",
        stat1Label: "Handwritten Boilerplate",
        stat2: "100%",
        stat2Label: "Type Coverage",
      },
      ai: {
        title: "Any Tool, Same Quality",
        desc: "Claude Code, Copilot, Cursor, Codex, Gemini CLI, GLM, Qwen — the standards live in the template, not in the tool. Swap any AI, output quality stays the same",
        stat1: "7+",
        stat1Label: "AI Tools Supported",
        stat2: "0",
        stat2Label: "Lines Hand-Written",
      },
      workspace: {
        title: "Multi-Tenant Out of the Box",
        desc: "Complete multi-tenant isolation + session auth + invite system + fine-grained permissions. Enterprise-grade ready, extendable by AI in a few sentences",
      },
      trpcDemo: {
        windowTitle: "tRPC \u2022 End-to-End Types",
        server: "Server",
        client: "Client",
        zeroTypeErrors: "0 type errors",
      },
      aiDemo: {
        userLabel: "You",
        userPrompt: "Add a user invitation feature with email notification",
        aiResponse: "Sure, I've generated the complete invitation feature:",
        doneMessage: "\u2726 4 files generated \u00b7 ready to run",
        artifacts: {
          prismaLabel: "Prisma Schema",
          prismaDetail: "Invitation model \u00b7 5 fields",
          trpcLabel: "tRPC Router",
          trpcDetail: "inviteUser \u00b7 sendReminder",
          emailLabel: "Email Service",
          emailDetail: "invitation template \u00b7 queue",
          reactLabel: "React Component",
          reactDetail: "<InviteModal /> \u00b7 useInvite()",
        },
      },
      workspaceDemo: {
        acmeCorp: "specc.sh",
        sideProject: "Side Project",
        openSource: "Open Source",
        owner: "Owner",
        admin: "Admin",
        member: "Member",
        members: "members",
        createWorkspace: "+ Create workspace",
        inviteMembers: "Invite members",
      },
      prisma: {
        title: "Prisma ORM",
        desc: "Type-safe schema + PostgreSQL 18. AI-generated schemas auto-adapt, migration scripts generated with one command",
      },
      i18n: {
        title: "Biome · ESLint + Prettier in One",
        desc: "Rust-powered lint + formatting, replacing two tools with zero config debates. Monorepo-wide consistent standards — every line AI generates is rules-checked. make lint always green, PRs always clean",
      },
      ui: {
        title: "Beautiful & Swappable",
        desc: "TailwindCSS 4 by default — beautiful and standardized. Not satisfied? Let AI swap it to any UI framework, architecture unaffected",
      },
    },
    // Why Vibe Coding Fails
    whyVibeFails: {
      badge: "The Real Problem",
      sectionTitle: "Why Is Vibe Coding So Hard to Get Right?",
      sectionSubtitle:
        "Everyone's tried it. You open Claude Code or Cursor, describe what you want, and watch the AI write hundreds of lines in seconds. It looks impressive. Then you run it — and it breaks.",
      structuralProblem:
        "This isn't bad luck. It's structural. Your AI output is poor for one reason: there's no project-level spec to constrain it.",
      reasonsTitle: "The Root Causes",
      reasons: {
        noSpec: {
          title: "No Project-Level Spec",
          desc: "The AI doesn't know your folder conventions, naming patterns, or architecture decisions. It guesses — and guesses differently every time.",
        },
        noConstraints: {
          title: "No Enforced Constraints",
          desc: "Without lint rules, type schemas, and output contracts baked into the project, the AI freestyles its way into an inconsistent mess.",
        },
        noLanguage: {
          title: "No Shared Language",
          desc: 'Your AI tool has no idea what "production-grade" means for your project unless you tell it explicitly.',
        },
      },
      result:
        "The result: code that runs today, breaks tomorrow, and nobody dares touch by Friday.",
      callout:
        "The problem isn't the AI. It's the absence of a spec for it to follow.",
      solution:
        "SPECC.SH solves this at the architecture level. No extra docs to write. No spec files to maintain. The folder structure, type system, lint rules, and module contracts are the prompt — the codebase tells AI what to do.",
      speccIntro:
        "You've probably tried Vibe Coding — throwing a prompt at Claude Code, Cursor, or Copilot and hoping for the best. Sometimes it works. More often it doesn't. The code doesn't compile, the style is all over the place, and changing one thing breaks another.",
      speccProblem: "The problem isn't the AI. It's the absence of a spec.",
      speccDesc:
        "SPECC.SH is a full-stack template where the architecture is the prompt. The folder structure, type system, module boundaries, and lint rules tell AI exactly what to do — no extra documentation needed. When AI opens this codebase, it stops guessing and follows the structure — outputting code that compiles, passes lint, and ships to production on the first try.",
      contrast: {
        vibeLabel: "Vibe Coding",
        vibeDesc: "AI freestyles → chaos",
        specLabel: "Spec Coding",
        specDesc: "AI follows spec → production-grade output",
      },
    },
    // Why Not Next.js
    whyNotNextjs: {
      badge: "Why Not Next.js?",
      sectionTitle: "Technology Serves Business, Not the Other Way Around",
      sectionSubtitle:
        "Next.js is powerful — but it carries hidden costs. We chose tools that fit real business needs instead of chasing framework hype",
      problemsTitle: "The Next.js Tax",
      problemsSubtitle: "Real pain points experienced in production",
      problems: {
        slow: {
          title: "Sluggish Dev Experience",
          desc: "Cold starts, slow rebuild cycles, bloated caching layer — every change costs seconds. AI-generated code iteration slows to a crawl",
        },
        vendor: {
          title: "Vercel Commercial Lock-in",
          desc: "Edge functions, ISR, Image optimization, App Router features — quietly optimized for Vercel. Self-hosting becomes a second-class experience",
        },
        aiConfused: {
          title: "AI Gets Lost in Server/Client Blur",
          desc: "Server Components, Client Components, hybrid RSC — the boundary confusion produces AI-generated spaghetti that's hard to debug and impossible to maintain",
        },
      },
      solutionTitle: "Right Tool for the Right Job",
      solutionSubtitle:
        "SSR where it matters for business. CSR where speed matters for users",
      ssr: {
        title: "Marketing Site — Server-Side Rendered",
        desc: "React Router v7 SSR via Hono. First paint is instant, fully SEO-indexed — search engines crawl it, users trust it",
      },
      csr: {
        title: "App Dashboard — Client-Side Rendered",
        desc: "Pure Vite SPA. Sub-50ms HMR, zero SSR overhead, pure React — AI understands it cleanly, users feel it instantly",
      },
      clarification:
        "Both modes coexist in one codebase. Switch routing strategy per route — no framework lock-in, no Vercel dependency, deploy anywhere",
    },
    // Quick Start
    quickStart: {
      sectionTitle: "One-Line Install",
      sectionSubtitle:
        "No manual setup needed — one command clones the template, installs dependencies, and starts all services",
      copied: "Copied!",
      copyTooltip: "Copy command",
      prereqTitle: "Prerequisites",
      prereqs: {
        node: "Node.js 20+",
        docker: "Docker",
        pnpm: "pnpm 9+",
      },
      terminalTitle: "Terminal",
      orFork: "Or fork directly on GitHub",
      forkBtn: "Fork Template",
    },
    // Multi-Platform
    multiPlatform: {
      badge: "Full-Platform Coverage",
      sectionTitle: "Truly Full-Platform. Truly Full-Stack.",
      sectionSubtitle:
        "One codebase. Every platform. Web app, admin panel, marketing site, and mini-program all share the same types, APIs, and i18n — one prompt ships a feature on any platform",
      platforms: {
        webApp: {
          name: "Web Frontend",
          desc: "User-facing web app — sub-50ms HMR, instant interactions, zero SSR overhead",
          badge: "CSR",
          tech: "React 19 + Vite 7",
        },
        admin: {
          name: "Admin Dashboard",
          desc: "Auth-gated management console with roles, multi-tenant workspaces, all built-in",
          badge: "CSR",
          tech: "React 19 + Vite 7",
        },
        marketing: {
          name: "Marketing Site",
          desc: "SEO-indexed, instant first paint — search engines crawl it, users trust it",
          badge: "SSR",
          tech: "React Router v7 + Hono",
        },
        miniapp: {
          name: "WeChat Mini-Program",
          desc: "Native mini-program experience sharing tRPC APIs and Zod types — zero duplication",
          badge: "Native",
          tech: "Taro + React",
        },
        mobileApp: {
          name: "Mobile App",
          desc: "iOS & Android native app, compatible with the same backend services",
          badge: "Coming Soon",
          tech: "Stay tuned",
        },
      },
      sharedTitle: "Every Platform Shares the Same Foundation",
      sharedSubtitle: 'Not sharing "part" of it — sharing all of it',
      sharedItems: {
        types: "Zod v4 Types",
        trpc: "tRPC APIs",
        i18n: "i18n Resources",
        auth: "Auth Logic",
        business: "Business Logic",
      },
      onePrompt: "One prompt. Any platform. Instant feature.",
    },
    // Footer
    footer: {
      tagline:
        "From Vibe Coding to Spec Coding — give AI a standard, give yourself a future",
      links: {
        title: "Quick Links",
      },
      app: "App",
      github: "GitHub",
      copyright: "MIT License \u00b7 Open Source Template",
      builtWith: "Built with \u2764\ufe0f and Claude",
    },
    // Header
    header: {
      brandName: "specc.sh",
    },
  },
};
