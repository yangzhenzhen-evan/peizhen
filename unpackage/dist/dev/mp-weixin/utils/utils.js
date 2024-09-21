"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "https://code.itndedu.com/pz";
const request = function(option) {
  if (!option.url)
    return false;
  let {
    url,
    data = {},
    header = {},
    method = "GET"
  } = option;
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseURL + url,
      data,
      header,
      method,
      //网络请求成功
      success: (res) => {
        if (res.data.code === 1e4) {
          resolve(res.data);
        } else {
          common_vendor.index.showToast({
            title: res.data.msg,
            icon: "none"
          });
          reject(new Error(res.data.msg));
        }
      },
      //网络请求失败
      fail: (error) => {
        reject(new Error(error));
      }
    });
  });
};
const toDate = (time) => {
  const date = new Date(time);
  const Y = date.getFullYear() + "-";
  const M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
  const D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  const h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  const m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
  const s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  const strDate = Y + M + D + h + m + s;
  return strDate;
};
const validateForm = (obj, title, tel = "") => {
  if (obj) {
    common_vendor.index.showToast({
      title,
      icon: "none"
    });
    return false;
  } else {
    if (title == "请先填写电话！" && !/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(tel)) {
      common_vendor.index.showToast({
        title: "请输入正确格式的手机号码!",
        icon: "none"
      });
      return false;
    } else {
      return true;
    }
  }
};
const common = {
  toDate,
  validateForm
};
exports.common = common;
exports.request = request;
