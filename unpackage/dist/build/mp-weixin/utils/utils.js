"use strict";const e=require("../common/vendor.js"),t={toDate:e=>{const t=new Date(e);return t.getFullYear()+"-"+((t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-")+((t.getDate()<10?"0"+t.getDate():t.getDate())+" ")+((t.getHours()<10?"0"+t.getHours():t.getHours())+":")+((t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":")+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())},validateForm:async(t,o,n="")=>t?(e.index.showToast({title:o,icon:"none"}),!1):!("请先填写电话！"==o&&!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(n))||(e.index.showToast({title:"请输入正确格式的手机号码!",icon:"none"}),!1)};exports.common=t,exports.request=function(t){if(!t.url)return!1;let{url:o,data:n={},header:s={},method:r="GET"}=t;return new Promise(((t,a)=>{e.index.request({url:"https://code.itndedu.com/pz"+o,data:n,header:s,method:r,success:o=>{1e4===o.data.code?t(o.data):(e.index.showToast({title:o.data.msg,icon:"none"}),a(new Error(o.data.msg)))},fail:e=>{a(new Error(e))}})}))};
