"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_popup2)();
}
const _easycom_uni_easyinput = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.js";
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "mylogin",
  props: {
    token: {
      type: String,
      default: "0"
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "open"],
  setup(__props, { emit: __emit }) {
    const app = getApp();
    const prop = __props;
    const loginDialog = common_vendor.ref();
    common_vendor.watch(() => prop.isShow, (newValue, oldValue) => {
      if (newValue) {
        common_vendor.nextTick$1(() => {
          loginDialog.value.open("center");
          console.log("开了");
        });
      } else {
        common_vendor.nextTick$1(() => {
          loginDialog.value.close();
          console.log("关了");
        });
      }
    }, { immediate: true });
    const loginForm = common_vendor.reactive({
      tel: "",
      code: "",
      codetext: "点击获取验证码",
      time: 60
    });
    let emit = __emit;
    const cancel = () => {
      emit("close");
    };
    let flag = false;
    let i;
    const getCode = async () => {
      if (!app.globalData.common.validateForm(!loginForm.tel, "请先填写电话！", loginForm.tel))
        return;
      if (flag)
        return;
      console.log("flag");
      i = setInterval(() => {
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
      try {
        const re = await app.globalData.apis.checkCode(loginForm.tel, loginForm.code);
        common_vendor.index.setStorageSync("token", re.data.token);
        emit("close");
      } catch (error) {
        console.error("Error during login:", error);
        common_vendor.index.showToast({
          title: "登录失败，请重试！",
          icon: "none"
        });
      } finally {
        flag = false;
        loginForm.time = 60;
        loginForm.codetext = "点击获取验证码";
        clearInterval(i);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => loginForm.tel = $event),
        b: common_vendor.p({
          type: "number",
          placeholder: "请输入联系电话",
          clearable: false,
          modelValue: loginForm.tel
        }),
        c: common_vendor.o(($event) => loginForm.code = $event),
        d: common_vendor.p({
          type: "text",
          placeholder: "请输入验证码",
          clearable: false,
          modelValue: loginForm.code
        }),
        e: common_vendor.t(loginForm.codetext),
        f: common_vendor.o(getCode),
        g: common_vendor.sr(loginForm, "cd1797cf-1,cd1797cf-0", {
          "k": "loginForm"
        }),
        h: common_vendor.p({
          modelValue: loginForm,
          rules: _ctx.rules
        }),
        i: common_vendor.o(cancel),
        j: common_vendor.o(ok),
        k: common_vendor.sr(loginDialog, "cd1797cf-0", {
          "k": "loginDialog"
        }),
        l: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cd1797cf"]]);
wx.createComponent(Component);
