"use strict";const t=require("../../../../../common/vendor.js"),e={name:"UniBadge",emits:["click"],props:{type:{type:String,default:"error"},inverted:{type:Boolean,default:!1},isDot:{type:Boolean,default:!1},maxNum:{type:Number,default:99},absolute:{type:String,default:""},offset:{type:Array,default:()=>[0,0]},text:{type:[String,Number],default:""},size:{type:String,default:"small"},customStyle:{type:Object,default:()=>({})}},data:()=>({}),computed:{width(){return 8*String(this.text).length+12},classNames(){const{inverted:t,type:e,size:i,absolute:o}=this;return[t?"uni-badge--"+e+"-inverted":"","uni-badge--"+e,"uni-badge--"+i,o?"uni-badge--absolute":""].join(" ")},positionStyle(){if(!this.absolute)return{};let t=this.width/2,e=10;this.isDot&&(t=5,e=5);const i=`${-t+this.offset[0]}px`,o=`${-e+this.offset[1]}px`,s={rightTop:{right:i,top:o},rightBottom:{right:i,bottom:o},leftBottom:{left:i,bottom:o},leftTop:{left:i,top:o}},r=s[this.absolute];return r||s.rightTop},dotStyle(){return this.isDot?{width:"10px",minWidth:"0",height:"10px",padding:"0",borderRadius:"10px"}:{}},displayValue(){const{isDot:t,text:e,maxNum:i}=this;return t?"":Number(e)>i?`${i}+`:e}},methods:{onClick(){this.$emit("click")}}};const i=t._export_sfc(e,[["render",function(e,i,o,s,r,n){return t.e({a:o.text},o.text?{b:t.t(n.displayValue),c:t.n(n.classNames),d:t.s(n.positionStyle),e:t.s(o.customStyle),f:t.s(n.dotStyle),g:t.o((t=>n.onClick()))}:{})}]]);wx.createComponent(i);
