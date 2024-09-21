"use strict";
const common_vendor = require("../common/vendor.js");
const utils_utils = require("./utils.js");
const getUserInfo = () => {
  common_vendor.index.login({
    success: (res) => {
      return utils_utils.request({
        url: "/auth/wxLogin",
        data: { code: res.code }
      }).then((res2) => {
        console.log("useMsg", res2);
      });
    }
  });
};
const homeInit = () => {
  return utils_utils.request({
    url: "/app/init"
  });
};
const areaData = (id) => {
  return utils_utils.request({
    url: "/Index/index",
    data: { aid: id }
  });
};
const serviceData = (id) => {
  return utils_utils.request({
    url: "/Service/order",
    data: {
      svid: id
    }
  });
};
const clientData = () => {
  return utils_utils.request({
    url: "/User/clients"
  });
};
const sendCode = (phone) => {
  return utils_utils.request({
    url: "/get/code",
    method: "POST",
    data: {
      tel: phone
    }
  });
};
const checkCode = (telnumber, codenumber) => {
  return utils_utils.request({
    url: "/user/authentication",
    method: "POST",
    data: {
      tel: telnumber,
      code: codenumber
    }
  });
};
const createOrder = (obj, tokenStr) => {
  return utils_utils.request({
    url: "/pay/createOrder",
    method: "POST",
    data: obj,
    header: {
      token: tokenStr
    }
  });
};
const getOrderList = (stateNumber = "", tokenNumber) => {
  if (!tokenNumber) {
    common_vendor.index.showToast({
      title: "请先登录！",
      icon: "none"
    });
    return;
  }
  return utils_utils.request({
    url: "/order/list",
    data: {
      state: stateNumber
    },
    header: {
      token: tokenNumber
    }
  });
};
const getOrdDetail = (orderID, tokenNumber) => {
  return utils_utils.request({
    url: "/order/detail",
    data: {
      oid: orderID
    },
    header: {
      token: tokenNumber
    }
  });
};
const getHosData = (hidNumber) => {
  return utils_utils.request({
    url: "/Hospital/index",
    data: {
      hid: hidNumber
    }
  });
};
const getUser = (tokenNumber) => {
  return utils_utils.request({
    url: "/User/index",
    header: {
      token: tokenNumber
    }
  });
};
const apis = {
  getUserInfo,
  homeInit,
  areaData,
  serviceData,
  clientData,
  sendCode,
  checkCode,
  createOrder,
  getOrderList,
  getOrdDetail,
  getHosData,
  getUser
};
exports.apis = apis;
