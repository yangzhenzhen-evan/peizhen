"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("skehome")+e.resolveComponent("navbar")+e.resolveComponent("uni-notice-bar")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list"))()}Math||((()=>"../../components/skehome/skehome.js")+(()=>"../../components/navbar/navbar.js")+(()=>"../../node-modules/@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar.js")+(()=>"../../node-modules/@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.js")+(()=>"../../node-modules/@dcloudio/uni-ui/lib/uni-list/uni-list.js"))();const a={__name:"index",setup(a){let t=e.ref(!0);const o=getApp(),i=e.ref([]),n=e.ref([]),l=e.ref([]),s=e.ref([]);e.onLoad((async()=>{try{const e=await o.globalData.apis.homeInit(),{id:a}=e.data.area,r=await o.globalData.apis.areaData(a);i.value=r.data.slides,n.value=r.data.nav2s,l.value=r.data.navs,s.value=r.data.hospitals}catch(e){console.error("数据加载失败",e)}finally{t.value=!1}}));const r=a=>{const t=a.currentTarget.dataset.index,o=e.toRaw(n.value);d(o,t)},u=a=>{const t=a.currentTarget.dataset.index,o=e.toRaw(l.value);d(o,t)},d=(a,t)=>{"1"===a[t].stype&&e.index.navigateTo({url:a[t].stype_link})};return(a,o)=>e.e({a:e.unref(t)},e.unref(t)?{}:{b:e.p({title:"首页"}),c:e.p({"show-icon":!0,scrollable:!0,"show-close":!0,text:"点击右上角添加到我的小程序,方便下次使用!"}),d:e.f(i.value,((e,a,t)=>({a:e.pic_image_url,b:e.id,c:e.id}))),e:e.f(n.value,((a,t,o)=>({a:a.pic_image_url,b:t,c:e.o(r,t),d:t}))),f:e.f(l.value,((a,t,o)=>({a:a.pic_image_url,b:e.t(a.title),c:e.s("color:"+(a.tcolor?a.tcolor:"")),d:t,e:e.o(u,t),f:t}))),g:e.f(s.value,((a,t,o)=>({a:a.avatar?a.avatar_url:"../../static/images/avatar.jpg",b:e.t(a.name),c:e.t(a.rank),d:e.t(a.label),e:e.t(a.intro),f:a.id,g:"ad491132-4-"+o+",ad491132-3",h:e.p({to:"../hospital/index?hid="+a.id})})))})}},t=e._export_sfc(a,[["__scopeId","data-v-ad491132"]]);wx.createPage(t);
