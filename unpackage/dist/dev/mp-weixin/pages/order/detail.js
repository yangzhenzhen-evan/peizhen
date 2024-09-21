"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  const _easycom_uni_countdown2 = common_vendor.resolveComponent("uni-countdown");
  const _easycom_headline2 = common_vendor.resolveComponent("headline");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_navbar2 + _easycom_uni_steps2 + _easycom_uni_countdown2 + _easycom_headline2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_uni_steps = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-steps/uni-steps.js";
const _easycom_uni_countdown = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-countdown/uni-countdown.js";
const _easycom_headline = () => "../../components/headline/headline.js";
const _easycom_uni_popup_dialog = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_navbar + _easycom_uni_steps + _easycom_uni_countdown + _easycom_headline + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const app = getApp();
    const step = common_vendor.ref([]);
    const active = common_vendor.ref(0);
    step.value = [{ title: "填写订单" }, { title: "在线支付" }, { title: "专人服务" }, { title: "服务完成" }];
    const payDialog = common_vendor.ref();
    common_vendor.ref(0);
    const ordDetail = common_vendor.ref({});
    const status = { "待支付": 1, "待服务": 2, "已完成": 3, "已取消": null };
    common_vendor.onLoad((obj) => {
      getData(obj.oid);
    });
    const getData = async (oid) => {
      const re = await app.globalData.apis.getOrdDetail(oid, common_vendor.index.getStorageSync("token"));
      ordDetail.value = re.data;
      active.value = status[re.data.trade_state];
      if (!ordDetail.value._exp_time)
        return;
    };
    const openDialog = () => {
      payDialog.value.open("center");
      const qr = new common_vendor.UQRCode();
      qr.data = ordDetail.value.code_url;
      qr.size = 150;
      qr.make();
      const canvasContext = common_vendor.index.createCanvasContext("qrcode");
      qr.canvasContext = canvasContext;
      qr.drawCanvas();
    };
    const payClose = () => {
      payDialog.value.close();
      common_vendor.index.switchTab({
        url: "./order"
      });
    };
    const changeDate = common_vendor.computed(() => {
      const re = app.globalData.common.toDate(ordDetail.value.order_start_time);
      return re;
    });
    const starttime = common_vendor.computed(() => {
      const re = app.globalData.common.toDate(ordDetail.value.starttime);
      return re;
    });
    const showPeizhen = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: ordDetail.value._staff.mobile
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "订单详情"
        }),
        b: common_vendor.p({
          options: step.value,
          active: active.value,
          ["active-color"]: "white"
        }),
        c: active.value == 1
      }, active.value == 1 ? {
        d: common_vendor.o(($event) => getData(ordDetail.value.out_trade_no)),
        e: common_vendor.p({
          ["show-day"]: false,
          hour: 0,
          minute: 30,
          second: 0
        }),
        f: common_vendor.t(ordDetail.value.price),
        g: common_vendor.o(openDialog)
      } : active.value == 2 ? common_vendor.e({
        i: _ctx.service_state == 0
      }, _ctx.service_state == 0 ? {} : {}, {
        j: _ctx.service_state == 1,
        k: _ctx.service_state == 1
      }, _ctx.service_state == 1 ? {
        l: common_vendor.p({
          title: "本次服务专员"
        }),
        m: ordDetail.value._staff.avatar_url,
        n: common_vendor.t(ordDetail.value._staff.nickname),
        o: common_vendor.o(showPeizhen)
      } : {}) : active.value == 3 ? {} : {}, {
        h: active.value == 2,
        p: active.value == 3,
        q: !active.value,
        r: common_vendor.p({
          title: "预约信息"
        }),
        s: common_vendor.t(ordDetail.value.service_name),
        t: common_vendor.t(ordDetail.value.hospital_name),
        v: common_vendor.t(changeDate.value),
        w: ordDetail.value.service_stype == 40
      }, ordDetail.value.service_stype == 40 ? {
        x: common_vendor.t(ordDetail.value.address.userName)
      } : {
        z: common_vendor.t(ordDetail.value.client_name)
      }, {
        y: ordDetail.value.service_stype == 15,
        A: ordDetail.value.service_stype == 40
      }, ordDetail.value.service_stype == 40 ? {
        B: common_vendor.t(ordDetail.value.address.cityName),
        C: common_vendor.t(ordDetail.value.address.countyName + ordDetail.value.address.detailInfo)
      } : {
        E: common_vendor.t(ordDetail.value.receiveAddress)
      }, {
        D: ordDetail.value.service_stype == 15,
        F: ordDetail.value.demand,
        G: active.value !== 0 && active.value !== null
      }, active.value !== 0 && active.value !== null ? {
        H: common_vendor.p({
          title: "订单信息"
        }),
        I: common_vendor.t(ordDetail.value.tel),
        J: common_vendor.t(starttime.value),
        K: common_vendor.t(ordDetail.value.price),
        L: common_vendor.t(ordDetail.value.out_trade_no)
      } : {}, {
        M: common_vendor.o(payClose),
        N: common_vendor.p({
          type: "info",
          confirmText: "关闭",
          title: "支付二维码",
          content: "欢迎使用 uni-popup!",
          showClose: false
        }),
        O: common_vendor.sr(payDialog, "6b23c96c-6", {
          "k": "payDialog"
        }),
        P: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6b23c96c"]]);
wx.createPage(MiniProgramPage);
