"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("navbar")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list"))()}Math||((()=>"../../components/navbar/navbar.js")+(()=>"../../node-modules/@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.js")+(()=>"../../node-modules/@dcloudio/uni-ui/lib/uni-list/uni-list.js"))();const t={__name:"client",setup(t){let o=e.ref(""),n=e.ref([]);const a=getApp(),l=e.ref("");e.onLoad((async e=>{console.log(e),"select"==e.act?o.value="请选择服务对象":o.value="服务对象管理",l.value=e.act;const t=await a.globalData.apis.clientData();n.value=t.data.clients,console.log("服务对象",n)}));return(t,a)=>({a:e.p({title:e.unref(o)}),b:e.f(e.unref(n),((t,o,a)=>e.e({a:e.t(t.name),b:e.t(1==t.sex?"男":"女"),c:e.s("color:"+(1==t.sex?"#4881df":"#df4872")),d:e.t(t.age),e:e.t(t.mobile)},(l.value,{}),{f:o,g:e.o((t=>(t=>{if(console.log("99"),"select"==l.value){const o=n.value[t];e.index.$emit("showClient",e.toRaw(o)),e.index.navigateBack()}})(o)),o),h:"dcb47881-2-"+a+",dcb47881-1"}))),c:"select"==l.value,d:e.p({clickable:!0})})}},o=e._export_sfc(t,[["__scopeId","data-v-dcb47881"]]);wx.createPage(o);
