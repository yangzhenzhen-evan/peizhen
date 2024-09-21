<template>
	<view class="nav" :style="backgroundColor">
		<!-- 顶部状态栏-->
		<view class="status" :style="statusHeight">
		</view>
		<!-- 顶部内容栏-->
		<view class="home" v-if="title==='首页'" :style="contentHeight">
			<image src="../../static/navbarImage/locate.png" alt=""/>
			<text>中部地区</text>
			<image src="../../static/navbarImage/right.png" alt=""/>
			<navigator 
			url="/pages/search/search"
			:style="searchStyle+'flex:1'">
				<text>搜索</text>
			</navigator>
		</view>
		
		<view class="bar" :style="contentHeight" v-else>
			<!-- 页面栈层级判断是首页还是返回 --> 
			<view class="icon-back" @click="backLast">
				<image src="../../static/navbarImage/home.png" alt="" v-if="page===1" />
				<!-- 白色箭头 -->
				<image src="../../static/navbarImage/leftWhite.png" alt="" v-else-if="page>1 && defaultStyle.isWhite" />
				<!-- 黑色箭头 -->
				<image src="../../static/navbarImage/back.png" alt="" v-else/>
			</view>
			<!-- 标题 -->
			<view class="title" :style="textStyle+contentHeight+lineHeight" v-if="title">{{title}}</view>
		</view>
	</view>
</template>

<script setup>
	// 准备数据:高度(直接调用api)和样式(设置默认值,props接收其他值)
	import {ref,defineProps, reactive,defineEmits,onMounted} from 'vue'
	
	const app = getApp()
	//api对象解构的高度和系统信息
	let {statusBarHeight,system} = uni.getSystemInfoSync()
	//1.设置状态栏高度
	let statusHeight = ref('')
	statusHeight.value = `height:${statusBarHeight*2}rpx;`
	//2.设置内容栏高度
	let isTrue = system.split(' ').includes('iOS') 
	let contentHeight = ref('')
	//首页胶囊高度
	let h = reactive(uni.getMenuButtonBoundingClientRect())
	
	let searchStyle = ref('')
	searchStyle.value = `background-color:#e3e3e3;border-radius:200rpx;text-align:center;height:${h.height*2}rpx;line-height:${h.height*2}rpx;margin-top:${h.top*2-statusBarHeight*2}rpx;margin-left:32rpx;margin-right:${h.width*2+24}rpx;`
	//行高
	let lineHeight = ref('')
	//ios内容高度
	if(isTrue){
		contentHeight.value = 'height:88rpx;'
		lineHeight.value = 'line-height:88rpx;'
	}else{
		contentHeight.value = 'height:96rpx;'
		lineHeight.value = 'line-height:96rpx;'
	}
	onMounted(()=>{
		//把总高度传递出去方便body设置外边距
		if(contentHeight.value == 'height:88rpx;'){
			app.globalData.hi = statusBarHeight*2+88
		}else{
			app.globalData.hi = statusBarHeight*2+96
		}
		emit('setHeight',app.globalData.hi)
	})
	const emit = defineEmits(['setHeight'])
	
	//3.设置样式初始值
	let defaultStyle = defineProps({
		backgroundColor:{
			type:String,
			default:'#ffffff'
		},
		color:{
			type:String,
			default:'#000000'
		},
		title:{
			type:String,
			default:''
		},
		fontSize:{
			type:String,
			default:'32'
		},
		iconWidth:{
			type:String,
			default:'116'
		},
		iconHeight:{
			type:String,
			default:'38'
		},
		//状态栏是否变白色
		isWhite:{
			type:Boolean,
			default:false
		}
	})
	let backgroundColor = ref('')
	backgroundColor.value = `background-color:${defaultStyle.backgroundColor};`
	let textStyle = ref('')
	textStyle.value = `color:${defaultStyle.color}; font-size:${defaultStyle.fontSize}rpx;`
	let iconStyle = ref('')
	iconStyle.value = `width:${defaultStyle.iconWidth}rpx; height:${defaultStyle.iconHeight}rpx;`

	//4.准备页面栈,返回数组，首页为1，其他页>1
	let page = ref(getCurrentPages().length)
	let backLast = ()=>{
		// 页面返回要分是否为tab页？
		if(page.value===1){
			uni.switchTab({url:'/pages/index/index'})
		}else{
			uni.navigateBack()
		}
	}
	

</script>

<style lang="scss" scoped>
// 顶部导航fix定位,参考系为可视区
.nav {
	position:fixed;
	top:0;
	left:0;
	z-index:99;
	width:100%;
}
.bar{
	position: relative;
}
.title{
	position: absolute;
	top:0;
	left:50%;
	transform:translate(-50%);
}
.home {
	display:flex;
	align-items: center;
}
.icon-back{
	margin-left: 20rpx;
	width:64rpx;
	height:100%;
	display:flex;
	align-items: center;
}
.icon-back image,
.home image {
	width:50rpx;
	height:50rpx;
	margin: 0, 20rpx;
}

</style>