<template>
	<view class="">
		<navbar backgroundColor="none" color="#ffffff" :isWhite="true"></navbar>
		<view class="body">
			<image :src="hosData.avatar_url" class="bg" mode="aspectFill"></image>
			<!-- 医院信息 -->
			<view class="hos">
				<view class="zhuanfa">
					<image :src="hosData.avatar_url" mode=""></image>
					<view class="hosTitle">
						<view style="font-size: 32rpx;color:#fff;font-weight: bold;">{{hosData.name}}</view>
						<view style="color:seagreen;font-weight: bold;">
							<text style="margin-right: 20rpx;">{{hosData.rank}}</text>
							<text>{{hosData.label}}</text>
						</view>
					</view>
					<view style="margin-left:auto;display:flex;justify-content: flex-end;align-items: flex-end;">
						<button open-type="share" plain class="shareBtn">转发</button>
						<!-- <text>转发</text> -->
						<uni-icons type="right" size="18"></uni-icons>
					</view>
				</view>
				<view class="daohang" @click="getLoacte">
					<uni-icons type="location" size="18"></uni-icons>
					{{hosData.address}}
					<view style="margin-left:auto;display:flex;justify-content: flex-end;align-items: center;">
						<text>导航</text>
						<uni-icons type="right" size="18"></uni-icons>
					</view>
				</view>
			</view>
			<!-- 服务信息 -->
			<view class="ser">
				<view style="width:100%"> 在线预约您需要的服务</view>
				<uni-list>
					<block v-for="item in serData" :key="item.id">
						<uni-list-item :to="`../service/index?svid=${item.id}&hid=${hosData.id}`">
							<!-- 左侧放图 -->
							<template v-slot:header>
								<view class="ordImage">
									<image :src="item.icon_image_url" mode="widthFix">
									</image>
								</view>
							</template>
							<!-- 中间放订单信息 -->
							<template v-slot:body>
								<view class="box2" style="flex:1">
									<view class="font1">{{item.name}}</view>
									<view class="font2">{{item.intro}}</view>
									<view class="font3">{{item.price}}元/次</view>
								</view>
							</template>
							<!-- 右侧放支付状态，待支付需要倒计时且到时需要调用端口 -->
							<template v-slot:footer>
								<button class="order">预约</button>
							</template>
						</uni-list-item>
					</block>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref,toRaw} from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	
	const hosData = ref({})
	const serData = ref([])
	const app = getApp()
	onLoad(async (obj)=>{
		const re  = await app.globalData.apis.getHosData(obj.hid)
		hosData.value= re.data.hospital
		serData.value= re.data.services
		console.log('医院详情',hosData.value)
		console.log('ser',serData)
	})
	//打开医院定位
	const getLoacte= ()=>{
		uni.openLocation({
			latitude:parseFloat(hosData.value.lat),
			longitude:parseFloat(hosData.value.lng)
		})
	}
</script>
<style lang="scss">
page {
  background: #f4f4f4;
}
</style>
<style lang="scss" scoped>
.body{
	min-height: 100vh;
	//防止盒子高度塌陷
	overflow:hidden;
}
.bg{
	width:100%;
	height:550rpx;
	filter: blur(20px);
	position:fixed;
	display: block;
	z-index: -2;
	overflow: hidden;
}
.hos{
	position: relative;
	width:710rpx;
	height:160rpx;
	box-sizing:border-box;
	margin:220rpx 20rpx 40rpx 20rpx;
	background-color: #ffffff;
	border-radius: 10px;
}
.ser{
	padding:10rpx;
	width:710rpx;
	box-sizing:border-box;
	margin-left: 20rpx;
	margin-right: 20rpx;
	border-radius: 10px;
	background-color: #ffffff;
	font-size: 30rpx;
	font-weight: bold;
	color: #696969;
}
.hos > view {  
	color:#b6b6b6;
	font-size:26rpx;
	box-sizing:border-box;
	width:690rpx;
	margin:10rpx;
}
.zhuanfa{
	position: relative;
	height:120rpx;
	top:-64rpx;
	display:flex;
	align-items: flex-end;
}
.zhuanfa::after{
	content:'';
	display:block;
	width:100%;
	height:1rpx;
	background-color: #c8c7c7;
	position:absolute;
	bottom: -20rpx;
}
.shareBtn{
	font-size:26rpx;
	color:#b6b6b6;
	border:0;
	padding: 0;
	height: 33rpx;
	line-height: 33rpx;
}
.daohang{
	display: flex;
	align-items: center;
	justify-content: space-between;
	height:60rpx;
    position: absolute;
    bottom: 0;
}
.zhuanfa image {
	width:120rpx;
	height:120rpx;
	border-radius: 10rpx;
	margin-right: 30rpx;
}
.hosTitle{
	height: 100%;
	flex:1;
	text-align: left;
	display:flex;
	flex-direction:column;
	justify-content: space-between;
}
.ordImage{
	width:130rpx;
	margin-right: 15rpx;
	overflow: hidden;
}
.ordImage image {
	width:100%;
	height:100%;
	border-radius: 10px;
}
.font1{
	font-size: 30rpx;
	font-weight: bold;
	margin-bottom: 7rpx;
}
.font2{
	font-size: 24rpx;
	color:#c1c1c1;
	margin-bottom: 7rpx;
}
.font3{
	font-size: 24rpx;
	color:#009c72;
}
.order{
	font-size: 24rpx;
	color:#ffffff;
	background-color:#1AAD19;
	border-color:#1AAD19;
	height: 64rpx;
	line-height: 64rpx;
}
:deep(.uni-list-item__container){
	align-items: center;
}
</style>
