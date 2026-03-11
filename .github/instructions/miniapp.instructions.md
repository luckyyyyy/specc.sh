---
applyTo: packages/miniapp/**
---

# Mini Program Instructions (`packages/miniapp`)

## Framework & Stack

| Layer | Library / Version |
|-------|------------------|
| Framework | **Taro 4.1.11** (React 模式) |
| UI Components | `@tarojs/components`（`View`, `Text`, `Button`, `Input` 等） |
| Platform | WeChat Mini Program (`--type weapp`) |
| HTTP / API | **tRPC v11** — `@trpc/react-query`，与 Web 端写法一致（`trpc.xxx.useQuery()` / `trpc.xxx.useMutation()`） |
| Storage | `Taro.getStorageSync` / `Taro.setStorageSync`（封装在 `src/lib/storage.ts`） |
| Build tool | Webpack 5（`@tarojs/webpack5-runner` + `weapp-tailwindcss`） |

## Project Structure

```
packages/miniapp/src/
  app.tsx              # 入口，挂载 trpc.Provider + QueryClientProvider
  app.config.ts        # defineAppConfig — 页面列表 / 窗口配置
  app.css              # 全局样式，@import "weapp-tailwindcss"
  custom-tab-bar/
    index.tsx          # 自定义 TabBar 组件
    index.config.ts    # { styleIsolation: "apply-shared" }（必须，见下方说明）
  lib/
    trpc.ts            # tRPC client 实例（注入 wxFetch）
    wx-fetch.ts        # 把 Taro.request 适配成 fetch 接口
    storage.ts         # 封装 Taro.getStorageSync/setStorageSync
    use-theme-colors.ts  # useThemeColors() — 返回当前主题颜色 JS 值
    app-settings.tsx   # useAppSettings() — 读写 themeMode / langMode
    use-nav-bar-theme.ts # useNavBarTheme() — 同步顶部导航栏颜色
  pages/
    login/index.tsx
    profile/index.tsx      # 个人中心
    profile/settings/      # 通用设置（主题/语言）
    profile/edit-profile/  # 修改个人信息
    profile/change-password/
    profile-setup/index.tsx
    orders/index.tsx
    inventory/index.tsx
    catalog/index.tsx
```

## Key Conventions

### Components
- 只用 `@tarojs/components` 的原生组件，**不用** HTML 元素（`<div>`, `<span>` 等）。
- 样式：**优先 Tailwind 工具类**，仅动态颜色用 `style={{}}`（见下方 Tailwind 用法规则）。

### Tailwind 用法规则（必读）

**原则：非颜色样式全部用 Tailwind 类；颜色用 `style={{}}` 传 JS 值（因为颜色随主题动态变化）。**

| 场景 | 写法 |
|------|------|
| 布局、间距、字号、圆角等 | Tailwind 类：`flex flex-col p-4 rounded-[10px] text-lg` |
| 颜色（背景、文字、边框，随主题变）| `style={{ backgroundColor: colors.card, color: colors.fg }}` |
| 边框含颜色 | `style={{ borderBottom: \`0.5px solid ${colors.divider}\` }}` |
| 图标颜色 | `color={colors.fgSecondary}`（直接传 prop） |
| 静态颜色（不随主题，如品牌色）| Tailwind 类：`bg-[#007aff] text-white` |
| opacity 动态值 | `style={{ opacity: isPending ? 0.6 : 1 }}`（动态，必须 inline） |

**禁止**：
- ❌ 用 `style={{}}` 写布局/间距（`display`, `flexDirection`, `padding` 等非颜色属性）
- ❌ `dark:bg-black`、`dark:text-white` 等 `dark:` 前缀类（WXSS 不支持）
- ❌ 根容器自身 `style={{ backgroundColor: "var(--color-surface)" }}`（同节点 CSS 变量不可靠，用 `colors.surface`）
- ❌ **任意 px 字号（`text-[13px]`、`text-[15px]` 等）** — `weapp-tailwindcss` 会把任意 px 值 1:1 转为 rpx（`13px → 13rpx`），而在微信小程序中 `750rpx = 屏幕宽度 ≈ 375pt`，即 `1rpx ≈ 0.5pt`，所以 `13rpx ≈ 6.5pt`，极小！
  标准 Tailwind 工具类走的是 `rem2rpx` 路径（`1rem = 32rpx`），`text-sm = 0.875rem → 28rpx ≈ 14pt`，大小正常。

  | 标准类 | 编译结果 | 实际大小 |
  |--------|----------|----------|
  | `text-xs` | `24rpx` | ~12pt |
  | `text-sm` | `28rpx` | ~14pt |
  | `text-base` | `32rpx` | ~16pt |
  | `text-lg` | `36rpx` | ~18pt |
  | `text-xl` | `40rpx` | ~20pt |

  若必须使用任意值，改用 rpx：`text-[28rpx]`。

### TailwindCSS 在自定义组件中的限制

Taro + React 里有两种完全不同的"组件"：

| 类型 | 是否微信自定义组件 | 需要 `styleIsolation`？ |
|------|-----------------|------------------------|
| `pages/xxx/index.tsx` 页面 | ❌ 编译成微信**页面** | ❌ 页面天然继承 `app.wxss`，Tailwind 直接可用 |
| 页面内的普通 React 组件 | ❌ 打包进页面 JS | ❌ 随页面一起，Tailwind 直接可用 |
| 微信自定义组件（如 `custom-tab-bar`）| ✅ 独立自定义组件 | ✅ **必须加**，否则 Tailwind 类完全失效 |

**这个项目目前只有 `custom-tab-bar` 是微信自定义组件，是唯一需要设置的地方。**
没有全局开关（Taro 源码不支持），但普通 React 组件和页面都不受影响。

**微信自定义组件（`component: true`）的正确配置**：

在组件目录下创建 `index.config.ts`（Taro 标准方式，与 `index.config.ts` 在页面中用法一致）：
```ts
// src/custom-tab-bar/index.config.ts
export default {
  styleIsolation: "apply-shared",
};
```

这会让 Taro 在构建时把 `styleIsolation` 写进 `dist/custom-tab-bar/index.json`，使 `app.wxss` 里的 Tailwind 工具类能穿透进来。

**Tailwind v4 spacing 变量问题（已全局修复）**：

Tailwind v4 的间距类生成 `gap: calc(var(--spacing) * 0.5)`，在样式隔离的组件里 CSS 变量继承链断掉会失效。
`config/index.ts` 已配置 `cssCalc: ["--spacing"]`，构建时预计算为固定 rpx 值（如 `gap: 4rpx`），不再依赖变量。

### 主题 / 暗黑模式

`useThemeColors()` 返回当前主题的所有颜色 JS 值，`useAppSettings()` 读取 `themeMode`。

**根容器写法**：
- 自身颜色用 JS 值（`style={{ backgroundColor: colors.surface }}`）
- 加 `className={isDark ? "dark" : ""}` 让子元素的 Tailwind token 类（`text-fg`、`bg-card` 等）通过 CSS 变量继承拿到暗色值

**禁止写法**：
- ❌ `dark:bg-black`、`dark:text-white`（WXSS 不支持 `dark:` 变体）
- ❌ 根容器自身 `style={{ backgroundColor: "var(--color-surface)" }}`（同节点读取 CSS 变量不可靠）

**标准页面模板**：

```tsx
const colors = useThemeColors();
const { theme } = useAppSettings();
const isDark = theme === "dark";
useNavBarTheme();

return (
  <View
    className={`min-h-screen ${isDark ? "dark" : ""}`}
    style={{ backgroundColor: colors.surface }}
  >
    {/* 布局/间距用 Tailwind 类 */}
    <View className="p-4 flex flex-col gap-3">
      {/* 颜色跟主题：用 Tailwind token 类（通过 .dark 继承）*/}
      <Text className="text-lg font-bold text-fg">标题</Text>
      {/* 或直接用 JS 值（无需 .dark class）*/}
      <Text style={{ color: colors.fgSecondary }}>副标题</Text>
    </View>
  </View>
);
```

### Navigation
- 使用 `Taro.navigateTo / reLaunch / redirectTo / switchTab`，不用 `react-router-dom`。
- 路径格式：`/pages/xxx/index`（以 `/` 开头的绝对路径）。

### Storage
- 直接引用 `src/lib/storage.ts` 中的函数（`saveUser`, `getUser`, `saveToken` 等）。
- 不直接调用 `Taro.setStorageSync`；如需新 key，在 `storage.ts` 里统一维护。

### 路径别名
- `@/` → `src/`（在 `tsconfig.json` 中已配置）。

### 环境变量
- `process.env.TARO_APP_API_URL` — API 服务地址（`.env` 文件）。
- 所有 Taro 环境变量必须以 `TARO_APP_` 为前缀。

## 微信小程序官方文档

- **API 参考**：https://developers.weixin.qq.com/miniprogram/dev/api/
- **组件参考**：https://developers.weixin.qq.com/miniprogram/dev/component/
- **框架指南（Taro 4）**：https://taro-docs.jd.com/docs/

查找某个微信 API（如 `wx.login`、`wx.getPhoneNumber` 等）时，直接在 API 参考页面搜索即可。

## Build Commands

```sh
# 开发（监听模式）
cd packages/miniapp && pnpm dev

# 生产构建
cd packages/miniapp && pnpm build
```

构建产物通过 `dist` 软链输出到 `MINIAPP_WIN_OUTPUT`（`.env` 中配置的 Windows 路径，如 `/mnt/c/miniapp-dist`）。用微信开发者工具打开该 Windows 目录预览。

## Taro 与 React 的主要差异

| React Web | Taro Mini Program |
|-----------|------------------|
| `<div>` / `<span>` | `<View>` / `<Text>` |
| `<img>` | `<Image>` |
| `<button>` | `<Button>` |
| `<input>` | `<Input>`（受控：`value` + `onInput`） |
| `window.localStorage` | `Taro.getStorageSync` |
| `fetch` | `Taro.request`（已由 `wxFetch` 适配） |
| `window.location` | `Taro.navigateTo` 等 |
| React Router | `app.config.ts` pages 列表 + Taro 导航 API |

## Adding a New Page

1. 在 `src/pages/<name>/index.tsx` 创建页面组件（`export default function XxxPage()`）。
2. 在 `src/app.config.ts` 的 `pages` 数组中添加 `"pages/<name>/index"`。
3. 如需底部 Tab，在 `app.config.ts` 配置 `tabBar`。

## API 状态管理

与 Web 端写法完全一致（同样使用 `@trpc/react-query`）：

- 查询：`trpc.xxx.useQuery(input?, options?)` — 支持 `enabled`、`staleTime` 等选项
- 变更：`trpc.xxx.useMutation({ onSuccess, onError })`
- 缓存失效：`const utils = trpc.useUtils()` → `utils.xxx.list.invalidate()`
- 错误提示：`onError(err)` 里直接用 `err.message`（已是后端 AppError 文本）
- UNAUTHORIZED：`clearAll()` + `Taro.reLaunch({ url: "/pages/login/index" })`
- 服务端数据不要放 `useState`，用 `trpc.xxx.useQuery()` 管理

Provider 已在 `app.tsx` 挂载（`trpc.Provider` + `QueryClientProvider`），无需额外配置。

## Input 组件样式

微信小程序的 `<Input>` 组件有独立的原生渲染层，直接在其 `style` 上设置 `padding`、`height`、`boxSizing` 会导致：
- 右侧内容溢出（`width: 100%` + padding 超出容器）
- 点击聚焦时 placeholder / 光标位置错位上移

**正确做法**：用外层 `<View>` 承担所有布局样式，`<Input>` 自身只保留字体颜色和宽度。

```tsx
{/* ✅ 正确 */}
<View
  className="rounded-[6px] px-2.5 h-9 flex items-center"
  style={{ backgroundColor: colors.input }}
>
  <Input
    value={value}
    onInput={(e) => setValue(e.detail.value)}
    placeholder="请输入"
    placeholderStyle={`color: ${colors.placeholder}`}
    className="text-base w-full"
    style={{ color: colors.fg }}
  />
</View>

{/* ❌ 错误 — 会溢出且聚焦时错位 */}
<Input
  style={{
    padding: "8px 10px",
    height: "36px",
    width: "100%",
    boxSizing: "border-box",   // 无效
    backgroundColor: colors.input,
  }}
/>
```

## Anti-Patterns to Avoid

- ❌ 使用 `document` / `window` / `localStorage`（小程序无 DOM）。
- ❌ 使用 HTML 标签（`div`, `span`, `p`）；用 `@tarojs/components` 替代。
- ❌ 直接 `new URLSearchParams` 或 `location.href`。
- ❌ 在小程序中使用 Node.js 内置模块（`fs`, `path` 等）。
- ❌ AbortController（微信基础库不支持，tRPC link 已设置 `AbortController: null`）。
- ❌ 在 `<Input>` 上直接设置 `padding` / `height` / `boxSizing`（用外层 View 包裹代替）。
- ❌ 直接用 `fetch` / `axios` 请求后端（通过 `trpc` 调用）。
