"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "navbar",
  props: {
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    color: {
      type: String,
      default: "#000000"
    },
    title: {
      type: String,
      default: ""
    },
    fontSize: {
      type: String,
      default: "32"
    },
    iconWidth: {
      type: String,
      default: "116"
    },
    iconHeight: {
      type: String,
      default: "38"
    },
    //状态栏是否变白色
    isWhite: {
      type: Boolean,
      default: false
    }
  },
  emits: ["setHeight"],
  setup(__props, { emit: __emit }) {
    const app = getApp();
    let { statusBarHeight, system } = common_vendor.index.getSystemInfoSync();
    let statusHeight = common_vendor.ref("");
    statusHeight.value = `height:${statusBarHeight * 2}rpx;`;
    let isTrue = system.split(" ").includes("iOS");
    let contentHeight = common_vendor.ref("");
    let h = common_vendor.reactive(common_vendor.index.getMenuButtonBoundingClientRect());
    let searchStyle = common_vendor.ref("");
    searchStyle.value = `background-color:#e3e3e3;border-radius:200rpx;text-align:center;height:${h.height * 2}rpx;line-height:${h.height * 2}rpx;margin-top:${h.top * 2 - statusBarHeight * 2}rpx;margin-left:32rpx;margin-right:${h.width * 2 + 24}rpx;`;
    let lineHeight = common_vendor.ref("");
    if (isTrue) {
      contentHeight.value = "height:88rpx;";
      lineHeight.value = "line-height:88rpx;";
    } else {
      contentHeight.value = "height:96rpx;";
      lineHeight.value = "line-height:96rpx;";
    }
    common_vendor.onMounted(() => {
      if (contentHeight.value == "height:88rpx;") {
        app.globalData.hi = statusBarHeight * 2 + 88;
      } else {
        app.globalData.hi = statusBarHeight * 2 + 96;
      }
      emit("setHeight", app.globalData.hi);
    });
    const emit = __emit;
    let defaultStyle = __props;
    let backgroundColor = common_vendor.ref("");
    backgroundColor.value = `background-color:${defaultStyle.backgroundColor};`;
    let textStyle = common_vendor.ref("");
    textStyle.value = `color:${defaultStyle.color}; font-size:${defaultStyle.fontSize}rpx;`;
    let iconStyle = common_vendor.ref("");
    iconStyle.value = `width:${defaultStyle.iconWidth}rpx; height:${defaultStyle.iconHeight}rpx;`;
    let page = common_vendor.ref(getCurrentPages().length);
    let backLast = () => {
      if (page.value === 1) {
        common_vendor.index.switchTab({ url: "/pages/index/index" });
      } else {
        common_vendor.index.navigateBack();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s(common_vendor.unref(statusHeight)),
        b: __props.title === "首页"
      }, __props.title === "首页" ? {
        c: common_assets._imports_0$2,
        d: common_assets._imports_1$1,
        e: common_vendor.s(common_vendor.unref(searchStyle) + "flex:1"),
        f: common_vendor.s(common_vendor.unref(contentHeight))
      } : common_vendor.e({
        g: common_vendor.unref(page) === 1
      }, common_vendor.unref(page) === 1 ? {
        h: common_assets._imports_2$1
      } : common_vendor.unref(page) > 1 && common_vendor.unref(defaultStyle).isWhite ? {
        j: common_assets._imports_3$1
      } : {
        k: common_assets._imports_4$1
      }, {
        i: common_vendor.unref(page) > 1 && common_vendor.unref(defaultStyle).isWhite,
        l: common_vendor.o((...args) => common_vendor.unref(backLast) && common_vendor.unref(backLast)(...args)),
        m: __props.title
      }, __props.title ? {
        n: common_vendor.t(__props.title),
        o: common_vendor.s(common_vendor.unref(textStyle) + common_vendor.unref(contentHeight) + common_vendor.unref(lineHeight))
      } : {}, {
        p: common_vendor.s(common_vendor.unref(contentHeight))
      }), {
        q: common_vendor.s(common_vendor.unref(backgroundColor))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eaf4c2e5"]]);
wx.createComponent(Component);
