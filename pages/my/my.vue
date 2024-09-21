<template>
	<skemy v-if="loading"></skemy>
	<view v-else>
		<navbar title="我的"></navbar>
		<view class="body">
			<view class="user">
				<image :src="user.avatar_url" mode="widthFix"></image>
				<view>{{user.nickname}}</view>
			</view>
			<view class="ord">
				<view class="box2">
					<text>我的订单</text>
					<text style="color: #9d9d9d;">全部</text>
				</view>
				<uni-grid :column="4" :showBorder="false">
				<uni-grid-item :data-id="1">
					<view class="grid-item-box" style="background-color: #fff;" @click="toOrd(1)">
						<image src="../../static/images/od_10.png" mode="widthFix"></image>
						<text class="text">待支付</text>
						<view v-if="ser.todos" class="grid-dot">
							<uni-badge :text="ser.todos" type="error" />
						</view>
					</view>
				</uni-grid-item>
				<uni-grid-item :data-id="2">
					<view class="grid-item-box" style="background-color: #fff;" @click="toOrd(2)">
						<image src="../../static/images/od_20.png" mode="widthFix"></image>
						<text class="text">待服务</text>
						<view v-if="ser.topays" class="grid-dot">
							<uni-badge :text="ser.topays" type="error" />
						</view>
					</view>
				</uni-grid-item>
				<uni-grid-item :data-id="3">
					<view class="grid-item-box" style="background-color: #fff;" @click="toOrd(3)">
						<image src="../../static/images/od_30.png" mode="widthFix"></image>
						<text class="text">已完成</text>
					</view>
				</uni-grid-item>
				<uni-grid-item :data-id="4">
					<view class="grid-item-box" style="background-color: #fff;" @click="toOrd(4)">
						<image src="../../static/images/od_40.png" mode="widthFix"></image>
						<text class="text">已取消</text>
					</view>
				</uni-grid-item>
				</uni-grid>
			</view>
			<uni-list class="orderList">
				<uni-list-item class="ordItem" to="../index/index">
					<template v-slot:header>
						<view class="ordImage">
							<image src="../../static/images/ic_clients.png" mode="widthFix">
							</image>
							<text>服务对象管理</text>
						</view>
					</template>
					<template v-slot:footer>
						<image src="../../static/images/ic_arrow.png" mode="widthFix"></image>
					</template>
				</uni-list-item>
				<uni-list-item class="ordItem" to="../index/index">
					<template v-slot:header>
						<button open-type="share" class="ordImage" plain hover-class="none">
							<image src="../../static/images/ic_share.png" mode="widthFix"></image>
							<text>分享转发</text>
						</button>
					</template>
					<template v-slot:footer>
						<image src="../../static/images/ic_arrow.png" mode="widthFix"></image>
					</template>
				</uni-list-item>
			</uni-list>
			
			<!-- 声明 -->
			<view class="shengming">
				<view class="box3">用户协议</view>
				<view class="box3">服务协议</view>
				<view>咨询客服</view>
			</view>
		</view>
		<login></login>
	</view>
</template>

<script setup>
	import {ref,toRaw} from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	const app = getApp()
	const user = ref({})
	const ser = ref({})
	const staff = ref({})
	let loading = ref(true) 
	onLoad(async ()=>{
		try{
			const re = await app.globalData.apis.getUser(uni.getStorageSync('token'))
			user.value = re.data.mine
			ser.value = re.data.statistic
			staff.value = re.data.staff
		}catch(error){
			console.log(error)
		}finally {
			loading.value = false  
		}
	})
	
	const toOrd = (num)=>{
		app.globalData.globalIndex = num
		//因为跳转的是tab页面，因此不能携带参数，需设置全局变量
		uni.switchTab({
			url:'../order/order'
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
	margin-top:130rpx;
	overflow:hidden;
	padding:0 20rpx;
	min-height: calc(100vh - 130rpx);
	font-size:28rpx;
	color:#626262;
	position: relative;
}
.user,
.ord{
	margin-top:20rpx;
	background-color: #ffffff;
	width:100%;
	border-radius: 10rpx;
	box-sizing: border-box;
}
.ord{
	margin-bottom: 20rpx;
	padding:0 40rpx;
}
.user {
	padding:50rpx 0;
	text-align: center;
	font-size: 32rpx;
	font-weight: bold;
	color: #5b5b5b;
}
.user image {
	width:180rpx;
	
}
.box2{
	width:100%;
	justify-content: space-between;
	display: flex;
	align-items: center;
	height:100rpx;
	border-bottom:1rpx solid #d6d6d6;
}
.grid-item-box {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 15px 0;
}
.grid-item-box image {
	width:30px;
}
.grid-dot {
	position: absolute;
	top: 5px;
	right: 15px;
}
.ordImage{
	display: flex;
	font-size: 26rpx;
	align-items: center;
	border: 0;
	width: 600rpx;
	height: 60rpx;
	padding: 0;
}
.ordImage image
{
	width:40rpx;
	margin-right: 20rpx;
}
.ordItem image{
	width:40rpx;
}
:deep(.uni-list-item__container ){
	align-items: center;
}
.shengming{
	display:flex;
	justify-content: center;
	font-size: 24rpx;
	color: #acacac;
	position: absolute;
	bottom: 60rpx;
	left: 160rpx;
}
.shengming >view{
	padding:0 20rpx;
}
.box3{
	border-right: 1rpx solid #d6d6d6;
}
</style>
