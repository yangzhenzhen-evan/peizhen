<template>
	<view class="">
		<navbar title="订单详情"></navbar>
		<view class="body">
			<view class="step">
				<uni-steps :options="step" :active="active" active-color="white"></uni-steps>
			</view>
			<!-- 待支付 -->
			<block v-if="active==1">
				<view class = "box1">
					<view>待支付</view>
					<view>请在
					<!-- 倒计时 -->
					<uni-countdown :show-day="false" :hour="0" :minute="30" :second="0" @timeup="getData(ordDetail.out_trade_no)"/>
					 内完成支付，否则到时自动取消</view>
					<view class="btn">
						<button
						@click="openDialog"
						type="default"
						>立即支付{{ordDetail.price}}元
						</button>
					</view>
				</view>
			</block>
			<!-- 待服务 -->
			<block v-else-if="active==2">
				<view class = "box1">
					<view>服务进行中</view>
					<!-- 后台未安排服务专员 -->
					<view v-if="service_state==0">正在为您安排服务专员...</view>
					<!-- 后台已安排服务专员 -->
					<view v-else="service_state==1"> 已安排服务专员，将于预约时间进行服务 </view>
				</view>
				<view class = "box2" v-if="service_state==1">
					<headline title="本次服务专员"></headline>
					<view class="peizhen">
						<img :src="ordDetail._staff.avatar_url" alt="" />
						<text>{{ordDetail._staff.nickname}}</text>
						<button type="primary" @click="showPeizhen"> 联系电话 </button>
					</view>
				</view>
			</block>
			<!-- 已完成 -->
			<block v-else-if="active==3">
				<view class = "box1">
					<view>服务完成！</view>
					<view>感谢您的使用！如有售后问题请联系客服</view>
				</view>
			</block>
			<block 	v-else="!active">
				<view class = "box1">
					<view>订单已取消</view>
					<view>期待下次为您服务！如需帮助请咨询客服</view>
				</view>
			</block>
			<!-- 预约信息 -->
			<view class = "box2">
				<headline title="预约信息"></headline>
				<view class = "ordMsg">
					<text>预约服务：</text>
					<text>{{ordDetail.service_name}}</text>
				</view>
				<view class = "ordMsg">
					<text>选择医院：</text>
					<text>{{ordDetail.hospital_name}}</text>
				</view>
				<view class = "ordMsg">
					<text>预约时间：</text>
					<text>{{changeDate}}</text>
				</view>
				<view class = "ordMsg">
					<text>服务对象：</text>
					<text v-if="ordDetail.service_stype==40">{{ordDetail.address.userName}}</text>
					<text v-else="ordDetail.service_stype==15">{{ordDetail.client_name}}</text>
				</view>
				<view class = "ordMsg">
					<text>预约地址：</text>
					<text v-if="ordDetail.service_stype==40">{{ordDetail.address.cityName}}-{{ordDetail.address.countyName+ordDetail.address.detailInfo}}</text>
					<text v-else="ordDetail.service_stype==15">{{ordDetail.receiveAddress}}</text>
				</view>
				<view class = "ordMsg">
					<text>其他需求：</text>
					<textarea auto-height :value="ordDetail.demand" placeholder="暂无"></textarea>
				</view>
			</view>
			<!-- 订单信息 -->
			<block v-if="active!==0 && active!==null">
			<view class = "box2">
				<headline title="订单信息"></headline>
				<view class = "ordMsg">
					<text>联系电话：</text>
					<text>{{ordDetail.tel}}</text>
				</view>
				<view class = "ordMsg">
					<text>下单时间：</text>
					<text>{{starttime}}</text>
				</view>
				<view class = "ordMsg">
					<text>应付金额：</text>
					<text>{{ordDetail.price}}</text>
				</view>
				<view class = "ordMsg">
					<text>订单编号：</text>
					<text>{{ordDetail.out_trade_no}}</text>
				</view>
				<view class = "ordMsg">
					<text>联系客服：</text>
					<text>疑问或投诉</text>
				</view>
			</view>
			</block>
		</view>
		<!-- 支付弹窗 -->
		<uni-popup ref="payDialog" type="dialog">
			<uni-popup-dialog type="info" confirmText="关闭" title="支付二维码" content="欢迎使用 uni-popup!" :showClose="false"
				@confirm="payClose">
				<canvas id="qrcode" canvas-id="qrcode" style="width:300rpx;height:300rpx;">
				</canvas>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
	import {ref,reactive,watch,computed, toRaw} from 'vue'
	import {onLoad,onUnload} from '@dcloudio/uni-app'
	import UQRCode from 'uqrcodejs'
	
	const app = getApp()
	const step = ref([])
	const active = ref(0)
	step.value=[{title: '填写订单'},{title: '在线支付'},{title: '专人服务'},{title: '服务完成'}]
	const payDialog = ref()
	const h = ref(0)
	const setHeight = (height)=>{
		h.value = height
		console.log('h',h)
	}
	//订单详情
	const ordDetail = ref({})
	//订单状态
	const status = {'待支付':1,'待服务':2,'已完成':3,'已取消':null} 
	onLoad((obj)=>{
		getData(obj.oid)
	})
	//获取订单详情
	const getData =  async(oid)=>{
		const re = await app.globalData.apis.getOrdDetail(oid,uni.getStorageSync('token'))
		ordDetail.value = re.data
		active.value = status[re.data.trade_state]
		//存在此表示待支付
		if(!ordDetail.value._exp_time) return
	}
	//支付弹窗
	const openDialog = ()=>{
		payDialog.value.open('center')
		// 获取uQRCode实例
		const qr = new UQRCode()
		// 设置二维码内容
		qr.data = ordDetail.value.code_url
		// 设置二维码大小，必须与canvas设置的宽高一致
		qr.size = 150;
		// 调用制作二维码方法
		qr.make();
		// 获取canvas上下文
		const canvasContext = uni.createCanvasContext('qrcode'); // 如果是组件，this必须传入
		// 设置uQRCode实例的canvas上下文
		qr.canvasContext = canvasContext;
		// 调用绘制方法将二维码图案绘制到canvas上
		qr.drawCanvas();
	}
	const payClose = ()=>{
			 payDialog.value.close()
			 //跳到订单详情页
			 uni.switchTab({
			 	url:'./order'
			 })
	}
	const changeDate = computed(()=>{
		const re = app.globalData.common.toDate(ordDetail.value.order_start_time)
		return re
	}) 
	const starttime = computed(()=>{
		const re = app.globalData.common.toDate(ordDetail.value.starttime)
		return re
	}) 
	//服务专员
	const showPeizhen = ()=>{
		uni.makePhoneCall({
			phoneNumber: ordDetail.value._staff.mobile
		})
	}
</script>
<style lang="scss">
page {
  background: #f4f4f4;
}
.body{
	margin-top:180rpx;
}
</style>
<style lang="scss" scoped>
.step{
	height: 130rpx;
	background-color: #00aa7f;
	padding-top: 20rpx;
}
.box1{
	box-sizing: border-box;
	width:100%;
	border-top-left-radius: 10rpx;
	border-top-right-radius:10rpx;
	padding:30rpx;
	background-color: #ffffff;
}
.box2{
	box-sizing: border-box;
	background-color: #ffffff;
	width:100%;
	padding:30rpx;
	margin-top:30rpx;
}
.box1 > view {
	font-size: 24rpx;
}
.box1 view:first-child{
	font-size:32rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
}
.btn button{
	width:70%;
	margin-top:30rpx;
	color:#ffffff;
	background-color:#16a676;
	border-color:#16a676;
	text-align: center;
}
:deep(.uni-countdown){
	display: inline-block;
}
:deep(textarea){
	width:60%;
}
.ordMsg{
	display:flex;
	justify-content: space-between;
	font-size: 28rpx;
	margin:10rpx 0 ;
	text-align: right;
}
.peizhen{
	margin-top:15rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.peizhen image {
	width:100rpx;
	height:100rpx;
	margin-right:16rpx;
}
.peizhen button{
	width:30%;
	font-size: 30rpx;
	height:50rpx;
	line-height: 50rpx;
}
</style>