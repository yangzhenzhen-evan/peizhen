"use strict";const i=require("../../../../../common/vendor.js"),r={name:"UniGridItem",inject:["grid"],props:{index:{type:Number,default:0}},data:()=>({column:0,showBorder:!0,square:!0,highlight:!0,left:0,top:0,openNum:2,width:0,borderColor:"#e5e5e5"}),created(){this.column=this.grid.column,this.showBorder=this.grid.showBorder,this.square=this.grid.square,this.highlight=this.grid.highlight,this.top=0===this.hor?this.grid.hor:this.hor,this.left=0===this.ver?this.grid.ver:this.ver,this.borderColor=this.grid.borderColor,this.grid.children.push(this),this.width=this.grid.width},beforeDestroy(){this.grid.children.forEach(((i,r)=>{i===this&&this.grid.children.splice(r,1)}))},methods:{_onClick(){this.grid.change({detail:{index:this.index}})}}};const h=i._export_sfc(r,[["render",function(r,h,t,e,o,d){return i.e({a:o.width},o.width?{b:o.showBorder?1:"",c:o.showBorder&&t.index<o.column?1:"",d:o.highlight?1:"",e:o.borderColor,f:o.borderColor,g:o.borderColor,h:i.o(((...i)=>d._onClick&&d._onClick(...i))),i:i.s("width:"+o.width+";"+(o.square?"height:"+o.width:""))}:{})}],["__scopeId","data-v-cd2fd601"]]);wx.createComponent(h);
