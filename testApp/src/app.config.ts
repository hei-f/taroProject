export default {
  pages: [
    "pages/index/index",
    "pages/user/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: { //底部导航栏
    color: "#BBB",
    selectedColor: "#111",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      //list对应了pages中的路由
      //配置里不能用路径别名
      {
        pagePath: "pages/index/index",
        iconPath: "./assets/images/首页.png",
        selectedIconPath: "./assets/images/首页.png",
        text: "Chat",

      },
      {
        pagePath: "pages/user/index",
        iconPath: "./assets/images/用户.png",
        selectedIconPath: "./assets/images/用户.png",
        text: "User",
      },
    ],
  },
};
