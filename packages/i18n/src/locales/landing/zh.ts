export const landingZh = {
  ui: {
    // Header
    nav: {
      features: "核心优势",
      howItWorks: "工作原理",
      techStack: "技术栈",
      quickStart: "快速安装",
      github: "GitHub",
      getStarted: "开始使用",
      dashboard: "进入控制台",
    },
    // Hero
    hero: {
      badge: "手写代码的时代结束了",
      title1: "AI 负责编写",
      title2: "你只管天马行空",
      subtitle:
        "描述你的想法，AI 负责实现——一套为 AI 而生的全栈规范模板，让你的 Claude Code / Copilot / Cursor / Codex 每次都写出生产级代码",
      ctaGithub: "Fork 模板",
      ctaLearn: "了解架构",
      techBadges: {
        typeSafe: "不耦合任何模块",
        aiPowered: "不限 UI 框架",
        fullStack: "生产级代码输出",
      },
      miu2dProof: "miu2d.com 由此模板产出",
    },
    // Features
    features: {
      sectionTitle: "为什么你需要这个模板",
      sectionSubtitle:
        "Vibe Coding 让 AI 随意发挥，结果一团乱麻。Spec Coding 不一样：架构本身就是提示词，根本不需要写文档。目录结构、类型、Lint 规则直接告诉 AI 该怎么做——每次都输出生产级代码",
      items: {
        typeSafe: {
          title: "驯服 AI 的输出",
          desc: "tRPC + Zod v4 端到端类型约束，AI 生成的每一行代码都在编译器监管之下，不符合规范立即报错",
        },
        aiSpeed: {
          title: "兼容一切 AI 工具",
          desc: "Claude Code、GitHub Copilot、Cursor、Codex、Gemini CLI、GLM、Qwen——不绑定任何模型或工具，哪个顺手用哪个，效果一样惊艳",
        },
        database: {
          title: "非程序员也能上手",
          desc: "用自然语言描述需求，AI 自动生成数据库 schema、API 接口、前端页面——你不需要懂代码，模板帮你兜底",
        },
        ui: {
          title: "不限 UI 框架",
          desc: "默认 TailwindCSS 4，但你可以换成 shadcn/ui、Ant Design、MUI 或任何 UI 库，不耦合不绑定，AI 随时帮你切换",
        },
        auth: {
          title: "模块完全解耦",
          desc: "路由、认证、存储、UI 均可独立替换。每个模块边界清晰，AI 工具能精准理解上下文，不会改一处坏一片",
        },
        i18n: {
          title: "Biome 守住规范，永不走样",
          desc: "Biome 取代 ESLint + Prettier，Rust 极速 lint + 自动格式化——AI 生成代码后 make lint 一键通过，代码风格永远统一",
        },
        theme: {
          title: "多主题开箱即用",
          desc: "亮色、暗色、跟随系统三种模式预置好，CSS 变量驱动——AI 几分钟内就能扩展品牌主题，无需修改任何组件",
        },
        locale: {
          title: "i18n 国际化开箱即用",
          desc: "React i18next 预配置中英双语，AI 新增语言包无缝衔接——组件代码零改动",
        },
        workspace: {
          title: "多租户开箱即用",
          desc: "租户隔离、Session 认证、角色权限、邀请机制全部内置，企业级需求开箱即用，AI 几句话就能扩展",
        },
      },
    },
    // How it works
    howItWorks: {
      sectionTitle: "三步交付一个功能",
      sectionSubtitle: "不需要你会写代码——告诉 AI 你要什么，模板确保它写得对",
      steps: {
        step1: {
          title: "描述你的需求",
          desc: "用自然语言告诉你的 AI 工具：「帮我做一个团队成员邀请功能，带邮件通知」——就像跟人说话一样",
        },
        step2: {
          title: "AI 生成规范化代码",
          desc: "AI 自动生成数据库 schema、后端 API、前端组件——全部符合模板规范，不会胡乱发挥",
        },
        step3: {
          title: "直接投入生产",
          desc: "类型安全、零运行时错误、lint 自动通过——代码质量与手工打磨无异，但你一行都没写",
        },
      },
    },
    // Tech Stack
    techStack: {
      sectionTitle: "顶级技术栈，精心搭配",
      sectionSubtitle:
        "每个选型都让 AI 更容易理解、更不容易出错——这不是堆砌技术，是为 AI 量身定制的弹药库",
      anyAiTitle: "不限 AI，同等质量",
      modelAgnostic: "模型无关",
      categories: {
        backend: "后端",
        frontend: "前端",
        tooling: "工具 & AI",
      },
      items: {
        honoDesc: "Web 框架",
        trpcDesc: "类型安全 API",
        prismaDesc: "数据库工具包",
        postgresDesc: "数据库",
        reactDesc: "UI 框架",
        viteDesc: "构建工具",
        tailwindDesc: "样式方案",
        tanstackDesc: "数据获取",
        typescriptDesc: "类型系统",
        zodDesc: "Schema 校验",
        biomeDesc: "ESLint + Prettier 替代，Rust 极速",
        pnpmDesc: "工作区管理",
      },
      monorepoComment: "# pnpm monorepo 结构",
      monorepoDescs: {
        server: "Hono + tRPC + Prisma",
        web: "React 19 + Vite 7",
        types: "Zod v4 schemas",
        components: "UI 设计系统",
      },
    },
    // CTA
    cta: {
      title: "古法非遗编程？该翻篇了",
      subtitle:
        "AI 时代已来，软件行业正在被彻底重构。还在一行行手写代码的人，终将被用模板 + AI 极速交付的人取代。世界正在被改写——你是旁观者，还是执笔人？",
      ctaGithub: "Fork 模板，立即开始",
      ctaDocs: "查看文档",
    },
    // HowItWorks
    howItWorksDemo: {
      typesInferred: "类型推导通过",
      lintPassed: "Lint 通过",
      prMerged: "PR 已合并",
    },
    // Highlights
    highlights: {
      title: "AI 很强，但它需要规矩",
      subtitle:
        "Vibe Coding 只是起点，Spec Coding 才是终局——有了规范，每一次 AI 生成都是生产级代码",
      trpc: {
        title: "端到端类型安全",
        desc: "tRPC + Zod v4 全链路推导。AI 改一处接口，编译器立即检查上下游——不是靠 AI 自觉，是靠编译器兜底",
        stat1: "0",
        stat1Label: "手写样板代码",
        stat2: "100%",
        stat2Label: "类型覆盖率",
      },
      ai: {
        title: "不限工具，效果一致",
        desc: "Claude Code、Copilot、Cursor、Codex、Gemini CLI、GLM、Qwen——规范在模板里，不在工具里。换任何一个 AI，产出质量都一样",
        stat1: "7+",
        stat1Label: "支持 AI 工具",
        stat2: "0",
        stat2Label: "手写代码量",
      },
      workspace: {
        title: "多租户开箱即用",
        desc: "完整多租户隔离 + Session 认证 + 邀请机制 + 细粒度权限，企业级需求开箱即用，AI 几句话就能扩展",
      },
      trpcDemo: {
        windowTitle: "tRPC · 端到端类型",
        server: "Server",
        client: "Client",
        zeroTypeErrors: "0 个类型错误",
      },
      aiDemo: {
        userLabel: "你",
        userPrompt: "帮我做一个用户邀请功能，带邮件通知",
        aiResponse: "好的，已为你生成完整的邀请功能：",
        doneMessage: "✦ 4 个文件已生成 · 可立即运行",
        artifacts: {
          prismaLabel: "Prisma Schema",
          prismaDetail: "Invitation model · 5 字段",
          trpcLabel: "tRPC Router",
          trpcDetail: "inviteUser · sendReminder",
          emailLabel: "Email Service",
          emailDetail: "邀请模板 · 队列",
          reactLabel: "React Component",
          reactDetail: "<InviteModal /> · useInvite()",
        },
      },
      workspaceDemo: {
        acmeCorp: "specc.sh",
        sideProject: "Side Project",
        openSource: "Open Source",
        owner: "Owner",
        admin: "Admin",
        member: "Member",
        members: "成员",
        createWorkspace: "+ 创建工作区",
        inviteMembers: "邀请成员",
      },
      prisma: {
        title: "Prisma ORM",
        desc: "类型安全 schema + PostgreSQL 18，AI 生成的 schema 自动适配，迁移脚本一键生成",
      },
      i18n: {
        title: "Biome · ESLint + Prettier 合二为一",
        desc: "Rust 极速 lint + 格式化，取代两个工具却无需任何配置争论。monorepo 全局统一规范，AI 输出的每行代码都经规范把关——make lint 次次绿灯，PR 永远干净",
      },
      ui: {
        title: "美观且可替换",
        desc: "默认 TailwindCSS 4，美观又标准化。不满意？让 AI 帮你换成任何 UI 框架，架构不受影响",
      },
    },
    // Why Vibe Coding Fails
    whyVibeFails: {
      badge: "核心问题",
      sectionTitle: "为什么普通人这么难驾驭 Vibe Coding？",
      sectionSubtitle:
        "所有人都试过。AI 几秒钟写出几百行代码，看起来很厉害。然后你一运行——崩了。这不是运气差，是结构性问题。",
      reasonsTitle: "根本原因",
      reasons: {
        noSpec: {
          title: "没有项目级规范",
          desc: "AI 不知道你的目录约定、命名规则、架构决策。它只能猜——而且每次猜的都不一样。",
        },
        noConstraints: {
          title: "没有强制约束",
          desc: "没有 Lint 规则、类型 Schema、输出契约的硬性约束，AI 就会自由发挥，写出一团风格各异的乱麻。",
        },
        noLanguage: {
          title: "没有共同语言",
          desc: "你的 AI 工具根本不知道「生产级」对你的项目意味着什么，除非你明确告诉它——每次会话都从零开始。",
        },
      },
      result: "结果就是：今天能跑，明天报错，后天没人敢动。",
      callout: "问题不在 AI，在于它没有可以读懂的结构。",
      solution:
        "SPECC.SH 通过架构来解决这个问题，而不是靠文档。目录布局、类型 Schema、Lint 规则、模块边界本身就是提示词——AI 打开代码库就能读懂并遵守，无需任何解释。",
    },
    // Why Not Next.js
    whyNotNextjs: {
      badge: "为什么不用 Next.js？",
      sectionTitle: "技术服务于业务，不是反过来",
      sectionSubtitle:
        "Next.js 很强大——但它带着隐性成本。我们选择真正适配业务需求的工具，而不是追逐框架热度",
      problemsTitle: "Next.js 的代价",
      problemsSubtitle: "生产环境中真实踩过的坑",
      problems: {
        slow: {
          title: "开发体验越来越慢",
          desc: "冷启动、慢重构、臃肿的缓存层——每次改动都要等秒数。AI 生成代码后的迭代验证速度被拖垮",
        },
        vendor: {
          title: "Vercel 商业绑定严重",
          desc: "Edge 函数、ISR、图片优化、App Router——这些特性都在悄悄为 Vercel 优化。自部署变成二等公民体验",
        },
        aiConfused: {
          title: "AI 在 Server/Client 边界里迷失",
          desc: "Server Components、Client Components、混合 RSC——边界模糊导致 AI 生成夹生代码，既难调试又难维护",
        },
      },
      solutionTitle: "用对工具，解决真实问题",
      solutionSubtitle:
        "业务上需要 SEO 的地方用 SSR，用户需要极速响应的地方用 CSR",
      ssr: {
        title: "官网 / 营销页 — 服务端渲染 SSR",
        desc: "React Router v7 SSR via Hono，首屏秒开，完整 SEO 索引——搜索引擎能抓到，用户愿意信任它",
      },
      csr: {
        title: "控制台 / 应用 — 客户端渲染 CSR",
        desc: "纯 Vite SPA，50ms 内热更新，零 SSR 开销，纯 React——AI 理解清晰，用户体感飞速",
      },
      clarification:
        "两种模式共存于同一套代码库，按路由灵活切换渲染策略——不绑定框架，不依赖 Vercel，任何平台随便部署",
    },
    // Quick Start
    quickStart: {
      sectionTitle: "一键安装，60 秒跑起来",
      sectionSubtitle:
        "无需手动配置环境——一行命令克隆模板、安装依赖、启动服务，开箱即用",
      copied: "已复制！",
      copyTooltip: "复制命令",
      prereqTitle: "前置条件",
      prereqs: {
        node: "Node.js 20+",
        docker: "Docker",
        pnpm: "pnpm 9+",
      },
      terminalTitle: "终端安装",
      orFork: "或者直接在 GitHub 上 Fork",
      forkBtn: "Fork 模板",
    },
    // Footer
    footer: {
      tagline: "从 Vibe Coding 到 Spec Coding——给 AI 一个规范，给自己一个未来",
      links: {
        title: "快速导航",
      },
      app: "应用",
      github: "GitHub",
      copyright: "MIT License · 开源模板",
      builtWith: "Built with ❤️ and Claude",
    },
    // Header
    header: {
      brandName: "specc.sh",
    },
  },
};

export type LandingSchema = typeof landingZh;
