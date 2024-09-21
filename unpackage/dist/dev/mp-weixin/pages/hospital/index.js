"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_navbar2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-list/uni-list.js";
if (!Math) {
  (_easycom_navbar + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const hosData = common_vendor.ref({});
    const serData = common_vendor.ref([]);
    const app = getApp();
    common_vendor.onLoad(async (obj) => {
      const re = await app.globalData.apis.getHosData(obj.hid);
      hosData.value = re.data.hospital;
      serData.value = re.data.services;
      console.log("医院详情", hosData.value);
      console.log("ser", serData);
    });
    const getLoacte = () => {
      common_vendor.index.openLocation({
        latitude: parseFloat(hosData.value.lat),
        longitude: parseFloat(hosData.value.lng)
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          backgroundColor: "none",
          color: "#ffffff",
          isWhite: true
        }),
        b: hosData.value.avatar_url,
        c: hosData.value.avatar_url,
        d: common_vendor.t(hosData.value.name),
        e: common_vendor.t(hosData.value.rank),
        f: common_vendor.t(hosData.value.label),
        g: common_vendor.p({
          type: "right",
          size: "18"
        }),
        h: common_vendor.p({
          type: "location",
          size: "18"
        }),
        i: common_vendor.t(hosData.value.address),
        j: common_vendor.p({
          type: "right",
          size: "18"
        }),
        k: common_vendor.o(getLoacte),
        l: common_vendor.f(serData.value, (item, k0, i0) => {
          return {
            a: item.icon_image_url,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.intro),
            d: common_vendor.t(item.price),
            e: "b7cc38d0-5-" + i0 + ",b7cc38d0-4",
            f: common_vendor.p({
              to: `../service/index?svid=${item.id}&hid=${hosData.value.id}`
            }),
            g: item.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b7cc38d0"]]);
wx.createPage(MiniProgramPage);
