"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_navbar2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_uni_list_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-list/uni-list.js";
if (!Math) {
  (_easycom_navbar + _easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "client",
  setup(__props) {
    let cliTile = common_vendor.ref("");
    let cliData = common_vendor.ref([]);
    const app = getApp();
    const act = common_vendor.ref("");
    common_vendor.onLoad(async (obj) => {
      console.log(obj);
      if (obj.act == "select") {
        cliTile.value = "请选择服务对象";
      } else {
        cliTile.value = "服务对象管理";
      }
      act.value = obj.act;
      const res = await app.globalData.apis.clientData();
      cliData.value = res.data.clients;
      console.log("服务对象", cliData);
    });
    const changeClient = (index) => {
      console.log("99");
      if (act.value == "select") {
        const data = cliData.value[index];
        common_vendor.index.$emit("showClient", common_vendor.toRaw(data));
        common_vendor.index.navigateBack();
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: common_vendor.unref(cliTile)
        }),
        b: common_vendor.f(common_vendor.unref(cliData), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.sex == 1 ? "男" : "女"),
            c: common_vendor.s("color:" + (item.sex == 1 ? "#4881df" : "#df4872")),
            d: common_vendor.t(item.age),
            e: common_vendor.t(item.mobile)
          }, act.value == "select" ? {} : {}, {
            f: index,
            g: common_vendor.o(($event) => changeClient(index), index),
            h: "394faf7f-2-" + i0 + ",394faf7f-1"
          });
        }),
        c: act.value == "select",
        d: common_vendor.p({
          clickable: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-394faf7f"]]);
wx.createPage(MiniProgramPage);
