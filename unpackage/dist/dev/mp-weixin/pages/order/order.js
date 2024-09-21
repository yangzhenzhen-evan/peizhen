"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_mylogin2 = common_vendor.resolveComponent("mylogin");
  (_easycom_navbar2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_mylogin2)();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_uni_list_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-list/uni-list.js";
const _easycom_mylogin = () => "../../components/mylogin/mylogin.js";
if (!Math) {
  (_easycom_navbar + _easycom_uni_list_item + _easycom_uni_list + _easycom_mylogin)();
}
const _sfc_main = {
  __name: "order",
  setup(__props) {
    let token = common_vendor.ref("");
    let isShow = common_vendor.ref(false);
    const app = getApp();
    const tabArray = common_vendor.reactive(["全部", "待支付", "待服务", "已完成", "已取消"]);
    let selectIndex = common_vendor.ref(0);
    let listData = common_vendor.ref([]);
    const hi = common_vendor.ref(0);
    const setHeight = (newhi) => {
      console.log("更新", newhi);
      hi.value = newhi;
    };
    common_vendor.onShow(() => {
      if (app.globalData.globalIndex)
        selectIndex.value = app.globalData.globalIndex;
      getListData(selectIndex);
    });
    const open = () => {
      isShow.value = true;
    };
    const close = () => {
      isShow.value = false;
    };
    let i = "";
    const getListData = async (index) => {
      token.value = common_vendor.index.getStorageSync("token");
      try {
        if (index == 0)
          i = "";
        else
          i = index.toString();
        if (!token.value) {
          isShow.value = true;
        }
        const re = await app.globalData.apis.getOrderList(i, common_vendor.index.getStorageSync("token"));
        listData.value = re.data;
        changeDate.value = listData.value.map((item, index2) => {
          const re2 = app.globalData.common.toDate(item.order_start_time);
          return re2;
        });
      } catch (error) {
        console.dir(error);
      }
    };
    const changeTab = (index) => {
      selectIndex.value = index;
      getListData(index);
    };
    const changeDate = common_vendor.ref([]);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(setHeight),
        b: common_vendor.p({
          title: "我的订单"
        }),
        c: common_vendor.f(tabArray, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.n(common_vendor.unref(selectIndex) == index ? "tabItemon" : "tabItem"),
            c: index,
            d: common_vendor.o(($event) => changeTab(index), index),
            e: index
          };
        }),
        d: common_vendor.unref(listData).length == 0
      }, common_vendor.unref(listData).length == 0 ? {
        e: common_assets._imports_0
      } : {
        f: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          return common_vendor.e({
            a: item.service_logo_image_url,
            b: common_vendor.t(item.service_name),
            c: common_vendor.t(item.hospital_name),
            d: common_vendor.t(item.area_name),
            e: common_vendor.t(changeDate.value[index]),
            f: item.service_stype == 15
          }, item.service_stype == 15 ? {
            g: common_vendor.t(item.client_name)
          } : {}, {
            h: common_vendor.t(item.trade_state),
            i: item.out_trade_no,
            j: "93207a4f-2-" + i0 + ",93207a4f-1",
            k: common_vendor.p({
              to: "./detail?oid=" + item.out_trade_no
            }),
            l: index
          });
        })
      }, {
        g: common_vendor.s(`margin-top:${hi.value}rpx`),
        h: common_vendor.o(close),
        i: common_vendor.o(open),
        j: common_vendor.p({
          token: common_vendor.unref(token),
          isShow: common_vendor.unref(isShow)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-93207a4f"]]);
wx.createPage(MiniProgramPage);
