"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_apis = require("./utils/apis.js");
const utils_utils = require("./utils/utils.js");
const utils_share = require("./utils/share.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/order/order.js";
  "./pages/my/my.js";
  "./pages/search/search.js";
  "./pages/hospital/index.js";
  "./pages/service/index.js";
  "./pages/client/client.js";
  "./pages/order/detail.js";
}
const _sfc_main = {
  onLaunch: function() {
    this.globalData.apis.getUserInfo();
  },
  onShow: function() {
  },
  onHide: function() {
  },
  //全局变量
  globalData: {
    apis: utils_apis.apis,
    common: utils_utils.common,
    // 订单索引，用于页面传递参数
    globalIndex: 0,
    hi: 0
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.mixin(utils_share.share);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
