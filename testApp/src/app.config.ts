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
    color: "#333",
    selectedColor: "#222",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [//list对应了pages中的路由
      {
        pagePath: "pages/index/index",
        iconPath: "./img/首页.png",
        selectedIconPath: "./img/首页.png",
        text: "首页",
      },
      {
        pagePath: "pages/user/index",
        text: "用户中心",
      },
    ],
  },
};
