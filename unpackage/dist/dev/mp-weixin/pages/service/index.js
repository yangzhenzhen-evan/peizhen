"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  (_easycom_navbar2 + _easycom_uni_steps2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_card2 + _easycom_uni_forms_item2 + _easycom_uni_datetime_picker2 + _easycom_uni_easyinput2 + _easycom_uni_forms2 + _easycom_uni_popup2 + _easycom_uni_popup_dialog2)();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_uni_steps = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-steps/uni-steps.js";
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-list/uni-list.js";
const _easycom_uni_card = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-card/uni-card.js";
const _easycom_uni_forms_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.js";
const _easycom_uni_datetime_picker = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_easyinput = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.js";
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
const _easycom_uni_popup_dialog = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog.js";
if (!Math) {
  (_easycom_navbar + _easycom_uni_steps + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_card + _easycom_uni_forms_item + _easycom_uni_datetime_picker + _easycom_uni_easyinput + _easycom_uni_forms + _easycom_uni_popup + _easycom_uni_popup_dialog)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const step = common_vendor.ref([]);
    const active = common_vendor.ref(0);
    step.value = [{ title: "填写订单" }, { title: "在线支付" }, { title: "专人服务" }, { title: "服务完成" }];
    const serviceData = common_vendor.ref({});
    common_vendor.ref(0);
    const loginDialog = common_vendor.ref();
    const loginForm = common_vendor.reactive({
      tel: "",
      code: "",
      codetext: "点击获取验证码",
      time: 60
    });
    const payDialog = common_vendor.ref();
    const serform = common_vendor.reactive({
      "price": "0",
      "address": {
        "cityName": "",
        "countyName": "",
        "detailInfo": "",
        "userName": ""
      },
      "demand": "",
      "hospital_id": 0,
      "hospital_name": "",
      "receiveAddress": "",
      "service_code": "",
      "service_id": 0,
      "service_name": "",
      "service_stype": "",
      "starttime": 0,
      "tel": "",
      "client": {
        "age": 0,
        "mobile": "",
        "name": "",
        "sex": 0
      }
    });
    const hospitalData = common_vendor.ref({});
    const hospitalIndex = common_vendor.ref(0);
    let hosArray = common_vendor.computed({
      // 读取
      get() {
        const re = common_vendor.toRaw(hospitalData.value).map((item, index) => {
          return item.name;
        });
        console.log("re33", re);
        return re;
      }
    });
    const hospitalChange = (e) => {
      hospitalIndex.value = e.detail.value;
      const hos = common_vendor.toRaw(hospitalData.value);
      serform.price = hos[hospitalIndex.value].service_price;
      serform.hospital_id = hos[hospitalIndex.value].id;
      serform.hospital_name = hos[hospitalIndex.value].name;
      console.log("serform", serform);
    };
    const showDate = common_vendor.computed({
      // 读取
      get() {
        const re = app.globalData.common.toDate(serform.starttime);
        console.log("serform.starttime", serform.starttime);
        return re;
      }
    });
    common_vendor.ref(1);
    let AddressMsg = common_vendor.computed({
      // 读取
      get() {
        const re = serform.address.userName ? `${serform.address.userName}(${serform.address.cityName}-${serform.address.countyName}-${serform.address.detailInfo}` : "请输入收件信息";
        return re;
      }
    });
    const showAddress = () => {
      console.log(123);
      common_vendor.index.chooseAddress({
        success: (res) => {
          let { cityName, countyName, detailInfo, userName } = res;
          serform.address.cityName = cityName;
          serform.address.countyName = countyName;
          serform.address.detailInfo = detailInfo;
          serform.address.userName = userName;
          console.log("信息", serform.address);
        }
      });
    };
    const isxieyi = common_vendor.ref(false);
    const clientName = common_vendor.computed({
      // 读取
      get() {
        const re = serform.client.name ? `${serform.client.name}` : "请选择就诊人";
        return re;
      }
    });
    const showClient = () => {
      common_vendor.index.navigateTo({
        url: "../client/client?act=select"
      });
    };
    const cancel = () => {
      loginDialog.value.close();
    };
    const payClose = () => {
      payDialog.value.close();
      common_vendor.index.switchTab({
        url: "../order/order"
      });
    };
    const submitForm = async () => {
      if (!app.globalData.common.validateForm(!isxieyi.value, "请先勾选协议！"))
        return;
      if (!app.globalData.common.validateForm(hospitalIndex.value == 0, "请先选择医院！"))
        return;
      if (!app.globalData.common.validateForm(serform.starttime == 0, "请先选择日期！"))
        return;
      if (serviceData.value.stype == 40 && !app.globalData.common.validateForm(!serform.address.userName, "请先选择收件地址！"))
        return;
      if (serviceData.value.stype == 15 && !app.globalData.common.validateForm(!serform.client.name, "请先选择就诊人！"))
        return;
      if (serviceData.value.stype == 15 && !app.globalData.common.validateForm(!serform.receiveAddress, "请先填写收件信息！"))
        return;
      if (!app.globalData.common.validateForm(!serform.tel, "请先填写电话！", serform.tel))
        return;
      if (!common_vendor.index.getStorageSync("token")) {
        loginDialog.value.open("center");
        return;
      }
      const obj = common_vendor.toRaw(serform);
      try {
        const re = await app.globalData.apis.createOrder(obj, common_vendor.index.getStorageSync("token"));
        console.log("创建订单", re);
        payDialog.value.open("center");
        const qr = new common_vendor.UQRCode();
        qr.data = re.wx_code;
        qr.size = 150;
        qr.make();
        const canvasContext = common_vendor.index.createCanvasContext("qrcode");
        qr.canvasContext = canvasContext;
        qr.drawCanvas();
      } catch (error) {
        common_vendor.index.showToast({
          title: error,
          icon: "none"
        });
      }
    };
    let flag = false;
    const getCode = async () => {
      if (!app.globalData.common.validateForm(!loginForm.tel, "请先填写电话！", loginForm.tel))
        return;
      if (flag)
        return;
      console.log("flag");
      let i = setInterval(() => {
        if (loginForm.time <= 0) {
          flag = false;
          loginForm.time = 60;
          loginForm.codetext = "重新获取验证码";
          clearInterval(i);
        } else {
          flag = true;
          loginForm.time -= 1;
          loginForm.codetext = `剩余${loginForm.time}s`;
        }
      }, 1e3);
      try {
        const re = await app.globalData.apis.sendCode(loginForm.tel);
      } catch (error) {
        common_vendor.index.showToast({
          title: "发送过于频繁，请1小时后再试！",
          icon: "none"
        });
        flag = false;
        loginForm.time = 60;
        loginForm.codetext = "点击获取验证码";
        clearInterval(i);
      }
    };
    const ok = async () => {
      if (!loginForm.tel || !loginForm.code) {
        return common_vendor.index.showToast({
          title: "请填写手机号或验证码！",
          icon: "none"
        });
      }
      const re = await app.globalData.apis.checkCode(loginForm.tel, loginForm.code);
      common_vendor.index.setStorageSync("token", re.data.token);
      loginDialog.value.close();
    };
    common_vendor.onLoad(async (obj) => {
      console.log("obj", obj);
      const res = await app.globalData.apis.serviceData(obj.svid);
      serviceData.value = res.data.service;
      hospitalData.value = res.data.hospitals;
      console.log("ser", serviceData);
      console.log("hos", hospitalData);
      const ser = common_vendor.toRaw(serviceData.value);
      serform.service_code = ser.code;
      serform.service_id = ser.id;
      serform.service_name = ser.name;
      serform.service_stype = ser.stype;
      if (obj.hid > 0) {
        const hos = common_vendor.toRaw(hospitalData.value);
        for (let i = 0; i++; i < hos.length) {
          if (obj.hid == hos[i].id) {
            hospitalIndex.value = i;
            serform.price = hos[i].service_price;
            serform.hospital_id = hos[i].id;
            serform.hospital_name = hos[i].name;
          }
        }
      }
      console.log("serform", serform);
      common_vendor.index.$on("showClient", (obj2) => {
        console.log("就诊信息", obj2);
        const { name, age, mobile, sex, user_id } = obj2;
        serform.client.age = age;
        serform.client.mobile = mobile;
        serform.client.name = name;
        serform.client.sex = sex;
        console.log(serform.client);
      });
    });
    common_vendor.onUnload(() => {
      common_vendor.index.$off("showClient");
    });
    const dialog = () => {
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "填写服务订单"
        }),
        b: common_vendor.p({
          options: step.value,
          active: active.value,
          ["active-color"]: "white"
        }),
        c: common_vendor.t(serviceData.value.name),
        d: common_vendor.p({
          type: "info",
          size: "20",
          color: "#d2d2d2"
        }),
        e: common_vendor.o(dialog),
        f: common_vendor.p({
          thumb: serviceData.value.icon_image_url,
          ["thumb-size"]: "lg"
        }),
        g: serviceData.value.stype == 40 || serviceData.value.stype == 15
      }, serviceData.value.stype == 40 || serviceData.value.stype == 15 ? common_vendor.e({
        h: common_vendor.t(common_vendor.unref(hosArray)[hospitalIndex.value]),
        i: common_vendor.o(hospitalChange),
        j: hospitalIndex.value,
        k: common_vendor.unref(hosArray),
        l: common_vendor.p({
          type: "right",
          size: "18"
        }),
        m: common_vendor.p({
          label: "选择医院"
        }),
        n: serform.starttime == 0
      }, serform.starttime == 0 ? {} : {
        o: common_vendor.t(showDate.value)
      }, {
        p: common_vendor.o(($event) => serform.starttime = $event),
        q: common_vendor.p({
          returnType: "timestamp",
          modelValue: serform.starttime
        }),
        r: common_vendor.p({
          type: "right",
          size: "18"
        }),
        s: common_vendor.p({
          label: "选择日期"
        }),
        t: serviceData.value.stype == 40
      }, serviceData.value.stype == 40 ? {
        v: common_vendor.t(common_vendor.unref(AddressMsg)),
        w: common_vendor.p({
          type: "right",
          size: "18"
        }),
        x: common_vendor.o(showAddress),
        y: common_vendor.p({
          label: "收件信息"
        })
      } : {}, {
        z: serviceData.value.stype == 15
      }, serviceData.value.stype == 15 ? {
        A: common_vendor.t(clientName.value),
        B: common_vendor.p({
          type: "right",
          size: "18"
        }),
        C: common_vendor.o(showClient),
        D: common_vendor.p({
          label: "就诊人"
        })
      } : {}, {
        E: serviceData.value.stype == 15
      }, serviceData.value.stype == 15 ? {
        F: common_vendor.o(($event) => serform.receiveAddress = $event),
        G: common_vendor.p({
          placeholder: "请输入接送地址",
          inputBorder: false,
          clearable: false,
          modelValue: serform.receiveAddress
        }),
        H: common_vendor.p({
          type: "right",
          size: "18"
        }),
        I: common_vendor.p({
          label: "接送地址"
        })
      } : {}, {
        J: common_vendor.o(($event) => serform.tel = $event),
        K: common_vendor.p({
          type: "number",
          placeholder: "请输入联系电话",
          inputBorder: false,
          clearable: false,
          modelValue: serform.tel
        }),
        L: common_vendor.p({
          type: "right",
          size: "18"
        }),
        M: common_vendor.p({
          label: "联系电话"
        }),
        N: common_vendor.sr("serForm", "f6ccea2d-7,f6ccea2d-6"),
        O: common_vendor.p({
          modelValue: serform,
          rules: _ctx.rules
        })
      }) : {}, {
        P: serviceData.value.stype == 40 || serviceData.value.stype == 15
      }, serviceData.value.stype == 40 || serviceData.value.stype == 15 ? {
        Q: serform.demand,
        R: common_vendor.o(($event) => serform.demand = $event.detail.value)
      } : {}, {
        S: isxieyi.value,
        T: common_vendor.o(($event) => isxieyi.value = !isxieyi.value),
        U: common_vendor.t(serform.price),
        V: common_vendor.o(submitForm),
        W: common_vendor.s(isxieyi.value ? "color:#ffffff;background-color:#1AAD19;border-color:#1AAD19;" : ""),
        X: common_vendor.o(($event) => loginForm.tel = $event),
        Y: common_vendor.p({
          type: "number",
          placeholder: "请输入联系电话",
          clearable: false,
          modelValue: loginForm.tel
        }),
        Z: common_vendor.o(($event) => loginForm.code = $event),
        aa: common_vendor.p({
          type: "text",
          placeholder: "请输入验证码",
          clearable: false,
          modelValue: loginForm.code
        }),
        ab: common_vendor.t(loginForm.codetext),
        ac: common_vendor.o(getCode),
        ad: common_vendor.sr(loginForm, "f6ccea2d-25,f6ccea2d-24", {
          "k": "loginForm"
        }),
        ae: common_vendor.p({
          modelValue: loginForm,
          rules: _ctx.rules
        }),
        af: common_vendor.o(cancel),
        ag: common_vendor.o(ok),
        ah: common_vendor.sr(loginDialog, "f6ccea2d-24", {
          "k": "loginDialog"
        }),
        ai: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        }),
        aj: common_vendor.o(payClose),
        ak: common_vendor.p({
          type: "info",
          confirmText: "关闭",
          title: "支付二维码",
          content: "欢迎使用 uni-popup!",
          showClose: false
        }),
        al: common_vendor.sr(payDialog, "f6ccea2d-30", {
          "k": "payDialog"
        }),
        am: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f6ccea2d"]]);
wx.createPage(MiniProgramPage);
