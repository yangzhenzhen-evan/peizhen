<template>
	<skehome v-if="loading"></skehome>
	<view v-else>
		<navbar title="首页" @setHeight="setHeight"></navbar>
		<view class="body" :style="`margin-top:${hi}rpx`" >
			<!-- 公告栏 -->
			<uni-notice-bar 
			show-icon 
			scrollable
			show-close
			text="点击右上角添加到我的小程序,方便下次使用!" />
			<!-- banner -->
			<swiper class = 'bannerBox' autoplay circular>
				<block v-for="item in bannerData" :key="item.id">
					<swiper-item :item-id ="item.id">
						<image :src="item.pic_image_url" mode="widthFix"></image>
					</swiper-item>
				</block>
			</swiper>
			<!-- 陪诊入口 -->
			<view class="entry">
				<block v-for="(item,index) in entry" :key="index">
					<view class="entryItem" :data-index = "index" @click="toNav">
						<image :src="item.pic_image_url" mode="widthFix"></image>
					</view>
				</block>
			</view>
			<!-- 5个功能入口 -->
			<view class="entry5">
				<block v-for="(item,index) in entry5" :key="index">
					<view class="entry5Item" :data-index = "index" @click="toNav5">
						<image :src="item.pic_image_url" mode="widthFix"></image>
						<text :style="'color:'+(item.tcolor?item.tcolor:'')">{{item.title}}</text>
					</view>
				</block>
			</view>
			<!-- 医院列表 -->
			<uni-list class="hosList">
				<uni-list-item 
				v-for="(item,index) in hospitalList" :key="item.id" class="hosItem"
				:to="'../hospital/index?hid='+item.id">
					<!-- 左侧放图 -->
					<template v-slot:header>
						<view class="hosImage">
							<image :src="item.avatar?item.avatar_url:'../../static/images/avatar.jpg'" mode="aspectFill">
							</image>
						</view>
					</template>
					<!-- 右侧放医院信息 -->
					<template v-slot:body>
						<view class="font1">{{item.name}}</view>
						<view class="fontLine">
							<text class="font2">{{item.rank}}</text>
							<text class="font3">{{item.label}}</text>
						</view>
						<view class="hosNote">{{item.intro}}</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script setup>
	import {ref,toRaw,computed,watch} from 'vue'
	import {onLoad,onReady} from '@dcloudio/uni-app'
	let loading = ref(true) 
	const app = getApp()
	//banner数据
	const bannerData = ref([])
	//陪诊入口
	const entry = ref([])
	//五个功能入口
	const entry5 = ref([])
	//医院列表
	const hospitalList = ref([])
	const hi = ref (0)
	const setHeight = (newhi)=>{
		console.log('更新',newhi)
		hi.value = newhi
	}
	//加载页面时
	onLoad(async ()=>{
		try {
			//请求首页初始数据
			const res = await app.globalData.apis.homeInit()
			// console.log('homeInit',res)
			//获取地区id
			const {id} =res.data.area
			//获取banner数据
			const res2 = await app.globalData.apis.areaData(id)
			// console.log('bannerData',res2)
			bannerData.value = res2.data.slides
			entry.value = res2.data.nav2s
			entry5.value=res2.data.navs
			hospitalList.value = res2.data.hospitals
		}catch (error) {
			console.error('数据加载失败', error)
		} finally {
			loading.value = false  // 数据加载完成后隐藏骨架屏
		}
	})

	

	//点击陪诊入口跳至内部链接 
	const toNav = (e)=>{
		//拿到对应index
		const index = e.currentTarget.dataset.index
		//取源数据
		const entrySource = toRaw(entry.value)
		//判断是否为内部链接并跳转
		isInner(entrySource,index)
	}
	//5个功能入口
	const toNav5 =(e)=>{
		//拿到对应index
		const index = e.currentTarget.dataset.index
		//取源数据
		const entrySource = toRaw(entry5.value)
		//判断是否为内部链接并跳转
		isInner(entrySource,index)
	}
	//判断是否为内部链接
	const isInner = (entrySource,index)=>{
		if(entrySource[index].stype === "1"){
			uni.navigateTo({
				url:entrySource[index].stype_link
			})
		}
	}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.bannerBox{
	width:95vw;
	height:320rpx;
	margin:10rpx auto;
	border-radius: 10rpx;
	overflow: hidden;
}
.bannerBox swiper-item image {
	width:100%;
	height:100%;
}
.entry{
	margin:15rpx;
}
//清除浮动,不影响后面标准流
.entry::after{
     content:"";
     display:block;
     height:0;
	 line-height:0;
     clear:both;
     visibility:hidden;
}
.entryItem{
	float:left;
	box-sizing: border-box;
	padding:0 5rpx;
	width:50%;
}
.entryItem image{
	width:100%
}
.entry5::after{
     content:"";
     display:block;
     height:0;
	 line-height:0;
     clear:both;
     visibility:hidden;
}
.entry5Item{
	float:left;
	width:20%;
	//里面的图片和文字都能居中
	text-align:center;
}
.entry5Item image {
	margin:0 auto;
	width:110rpx;
	height:110rpx;
}
.entry5Item text {
	font-size: 24rpx;
	font-weight: bold;
	white-space: nowrap;
	overflow:hidden;
}
.hosList{
	margin-top:20rpx;
}
.hosImage{
	width:450rpx;
	margin-right: 15rpx;
	overflow: hidden;
}
.hosImage image {
	width:100%;
	height:100%;
	border-radius: 10px;
}
.font1{
	font-size: 34rpx;
	font-weight: bold;
}
.fontLine{
	margin-top: 5rpx;
}
.font2,
.font3,
.hosNote {
	font-size: 26rpx;
}
.font2{
	color:#01ce12;
	font-weight: bold;
}
.font3{
	color:#2bc0ff;
	margin-left:15rpx;
	font-weight: bold;
}
.hosNote{
	color:#999999;
	margin-top: 5rpx;
}
:deep(.uni-list--border){
	margin:0 25rpx;
}
:deep(.uni-list--border-top){
	height:0;
}
</style>
