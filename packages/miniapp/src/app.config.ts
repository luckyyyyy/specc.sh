export default defineAppConfig({
  pages: [
    "pages/home/index",
    "pages/login/index",
    "pages/explore/index",
    "pages/workspace/index",
    "pages/profile/index",
    "pages/profile/edit-profile/index",
    "pages/profile/settings/index",
    "pages/profile/change-password/index",
  ],
  tabBar: {
    custom: true,
    color: "#999999",
    selectedColor: "#1677ff",
    backgroundColor: "#ffffff",
    list: [
      { pagePath: "pages/home/index", text: "首页" },
      { pagePath: "pages/explore/index", text: "发现" },
      { pagePath: "pages/workspace/index", text: "工作台" },
      { pagePath: "pages/profile/index", text: "我的" },
    ],
  },
  window: {
    navigationBarTitleText: "Specc",
    navigationBarBackgroundColor: "#ffffff",
    navigationBarTextStyle: "black",
  },
});
