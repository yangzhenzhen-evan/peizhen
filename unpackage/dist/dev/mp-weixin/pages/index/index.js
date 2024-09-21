"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_skehome2 = common_vendor.resolveComponent("skehome");
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_skehome2 + _easycom_navbar2 + _easycom_uni_notice_bar2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_skehome = () => "../../components/skehome/skehome.js";
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_uni_notice_bar = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_list_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-list/uni-list.js";
if (!Math) {
  (_easycom_skehome + _easycom_navbar + _easycom_uni_notice_bar + _easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let loading = common_vendor.ref(true);
    const app = getApp();
    const bannerData = common_vendor.ref([]);
    const entry = common_vendor.ref([]);
    const entry5 = common_vendor.ref([]);
    const hospitalList = common_vendor.ref([]);
    const hi = common_vendor.ref(0);
    const setHeight = (newhi) => {
      console.log("更新", newhi);
      hi.value = newhi;
    };
    common_vendor.onLoad(async () => {
      try {
        const res = await app.globalData.apis.homeInit();
        const { id } = res.data.area;
        const res2 = await app.globalData.apis.areaData(id);
        bannerData.value = res2.data.slides;
        entry.value = res2.data.nav2s;
        entry5.value = res2.data.navs;
        hospitalList.value = res2.data.hospitals;
      } catch (error) {
        console.error("数据加载失败", error);
      } finally {
        loading.value = false;
      }
    });
    const toNav = (e) => {
      const index = e.currentTarget.dataset.index;
      const entrySource = common_vendor.toRaw(entry.value);
      isInner(entrySource, index);
    };
    const toNav5 = (e) => {
      const index = e.currentTarget.dataset.index;
      const entrySource = common_vendor.toRaw(entry5.value);
      isInner(entrySource, index);
    };
    const isInner = (entrySource, index) => {
      if (entrySource[index].stype === "1") {
        common_vendor.index.navigateTo({
          url: entrySource[index].stype_link
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(loading)
      }, common_vendor.unref(loading) ? {} : {
        b: common_vendor.o(setHeight),
        c: common_vendor.p({
          title: "首页"
        }),
        d: common_vendor.p({
          ["show-icon"]: true,
          scrollable: true,
          ["show-close"]: true,
          text: "点击右上角添加到我的小程序,方便下次使用!"
        }),
        e: common_vendor.f(bannerData.value, (item, k0, i0) => {
          return {
            a: item.pic_image_url,
            b: item.id,
            c: item.id
          };
        }),
        f: common_vendor.f(entry.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: index,
            c: common_vendor.o(toNav, index),
            d: index
          };
        }),
        g: common_vendor.f(entry5.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: common_vendor.t(item.title),
            c: common_vendor.s("color:" + (item.tcolor ? item.tcolor : "")),
            d: index,
            e: common_vendor.o(toNav5, index),
            f: index
          };
        }),
        h: common_vendor.f(hospitalList.value, (item, index, i0) => {
          return {
            a: item.avatar ? item.avatar_url : "../../static/images/avatar.jpg",
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.rank),
            d: common_vendor.t(item.label),
            e: common_vendor.t(item.intro),
            f: item.id,
            g: "1cf27b2a-4-" + i0 + ",1cf27b2a-3",
            h: common_vendor.p({
              to: "../hospital/index?hid=" + item.id
            })
          };
        }),
        i: common_vendor.s(`margin-top:${hi.value}rpx`)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
