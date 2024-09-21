"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-forms")+e.resolveComponent("uni-popup"))()}Math||((()=>"../../node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.js")+(()=>"../../node-modules/@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.js")+(()=>"../../node-modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.js")+(()=>"../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js"))();const o={__name:"login",props:{token:{type:String,default:"0"}},setup(o){const t=getApp(),n=o;e.onShow((async()=>{await e.nextTick$1((()=>{n.token||(l.value.open("center"),e.index.showToast({title:"请先登录！",icon:"none"}))}))}));const l=e.ref(),a=e.reactive({tel:"",code:"",codetext:"点击获取验证码",time:60}),c=()=>{l.value.close()};let s=!1;const r=async()=>{if(!t.globalData.common.validateForm(!a.tel,"请先填写电话！",a.tel))return;if(s)return;console.log("flag");let o=setInterval((()=>{a.time<=0?(s=!1,a.time=60,a.codetext="重新获取验证码",clearInterval(o)):(s=!0,a.time-=1,a.codetext=`剩余${a.time}s`)}),1e3);try{await t.globalData.apis.sendCode(a.tel)}catch(n){e.index.showToast({title:"发送过于频繁，请1小时后再试！",icon:"none"}),s=!1,a.time=60,a.codetext="点击获取验证码",clearInterval(o)}},u=async()=>{if(!a.tel||!a.code)return e.index.showToast({title:"请填写手机号或验证码！",icon:"none"});const o=await t.globalData.apis.checkCode(a.tel,a.code);e.index.setStorageSync("token",o.data.token),s=!1,a.time=60,a.codetext="点击获取验证码",clearInterval(i),l.value.close()};return(o,t)=>({a:e.o((e=>a.tel=e)),b:e.p({type:"number",placeholder:"请输入联系电话",clearable:!1,modelValue:a.tel}),c:e.o((e=>a.code=e)),d:e.p({type:"text",placeholder:"请输入验证码",clearable:!1,modelValue:a.code}),e:e.t(a.codetext),f:e.o(r),g:e.sr(a,"c54dfeab-1,c54dfeab-0",{k:"loginForm"}),h:e.p({modelValue:a,rules:o.rules}),i:e.o(c),j:e.o(u),k:e.sr(l,"c54dfeab-0",{k:"loginDialog"}),l:e.p({type:"center","is-mask-click":!1,"background-color":"#fff"})})}},t=e._export_sfc(o,[["__scopeId","data-v-c54dfeab"]]);wx.createComponent(t);
