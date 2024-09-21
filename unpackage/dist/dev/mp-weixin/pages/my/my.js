"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_skemy2 = common_vendor.resolveComponent("skemy");
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_login = common_vendor.resolveComponent("login");
  (_easycom_skemy2 + _easycom_navbar2 + _easycom_uni_badge2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _component_login)();
}
const _easycom_skemy = () => "../../components/skemy/skemy.js";
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_uni_badge = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-badge/uni-badge.js";
const _easycom_uni_grid_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-grid/uni-grid.js";
const _easycom_uni_list_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-list/uni-list.js";
if (!Math) {
  (_easycom_skemy + _easycom_navbar + _easycom_uni_badge + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const app = getApp();
    const user = common_vendor.ref({});
    const ser = common_vendor.ref({});
    const staff = common_vendor.ref({});
    let loading = common_vendor.ref(true);
    common_vendor.onLoad(async () => {
      try {
        const re = await app.globalData.apis.getUser(common_vendor.index.getStorageSync("token"));
        user.value = re.data.mine;
        ser.value = re.data.statistic;
        staff.value = re.data.staff;
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    });
    const toOrd = (num) => {
      app.globalData.globalIndex = num;
      common_vendor.index.switchTab({
        url: "../order/order"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(loading)
      }, common_vendor.unref(loading) ? {} : common_vendor.e({
        b: common_vendor.p({
          title: "我的"
        }),
        c: user.value.avatar_url,
        d: common_vendor.t(user.value.nickname),
        e: common_assets._imports_0$1,
        f: ser.value.todos
      }, ser.value.todos ? {
        g: common_vendor.p({
          text: ser.value.todos,
          type: "error"
        })
      } : {}, {
        h: common_vendor.o(($event) => toOrd(1)),
        i: common_assets._imports_1,
        j: ser.value.topays
      }, ser.value.topays ? {
        k: common_vendor.p({
          text: ser.value.topays,
          type: "error"
        })
      } : {}, {
        l: common_vendor.o(($event) => toOrd(2)),
        m: common_assets._imports_2,
        n: common_vendor.o(($event) => toOrd(3)),
        o: common_assets._imports_3,
        p: common_vendor.o(($event) => toOrd(4)),
        q: common_vendor.p({
          column: 4,
          showBorder: false
        }),
        r: common_assets._imports_4,
        s: common_assets._imports_5,
        t: common_vendor.p({
          to: "../index/index"
        }),
        v: common_assets._imports_6,
        w: common_assets._imports_5,
        x: common_vendor.p({
          to: "../index/index"
        })
      }));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
