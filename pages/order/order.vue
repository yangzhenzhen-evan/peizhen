<template>
	<view class="">
		<navbar title="我的订单" @setHeight="setHeight"></navbar>
		<view class="body" :style="`margin-top:${hi}rpx`">
			<!-- tab栏 -->
			<view class="box">
				<view class="topTab">
					<block v-for="(item,index) in tabArray" :key = "index">
						<view :class="(selectIndex==index)?'tabItemon':'tabItem'" :data-index="index" @click="changeTab(index)">
							{{item}}
						</view>	
					</block>
				</view>
			</view>
			<image src="../../static/images/empty.png"
			style="display: block;width:640rpx;height:600rpx;margin:200rpx auto;" 
			v-if="listData.length==0">
			</image>
			<!-- 列表数据 -->
			<uni-list class="orderList" v-else>
					<block v-for="(item,index) in listData" :key="index">
						<uni-list-item class="ordItem" :to="'./detail?oid='+item.out_trade_no" :data-id = "item.out_trade_no">
							<!-- 左侧放图 -->
							<template v-slot:header>
								<view class="ordImage">
									<image :src="item.service_logo_image_url" mode="widthFix">
									</image>
								</view>
							</template>
							<!-- 中间放订单信息 -->
							<template v-slot:body>
								<view class="box2" style="flex:1">
									<view class="font1">{{item.service_name}}</view>
									<view class="font2">{{item.hospital_name}}({{item.area_name}})</view>
									<view class="font2">处理时间：{{changeDate[index]}}</view>
									<view class="font2" v-if="item.service_stype==15">就诊人：{{item.client_name}}</view>
								</view>
								
							</template>
							<!-- 右侧放支付状态，待支付需要倒计时且到时需要调用端口 -->
							<template v-slot:footer>
								<view class="font3">{{item.trade_state}}</view>
							</template>
						</uni-list-item>
					</block>
			</uni-list>
		</view>
		<!-- 若无token则强制用户登录 -->
		<mylogin :token="token" :isShow = "isShow" @close="close" @open="open"></mylogin>
	</view>
</template>

<script setup>
	import {ref,toRaw,reactive,computed,nextTick} from 'vue'
	import {onShow} from '@dcloudio/uni-app'
	let token = ref('')
	 //控制弹窗显示
	let isShow = ref(false)
	const app = getApp()
	//tab数组
	const tabArray = reactive(['全部','待支付','待服务','已完成','已取消'])
	//选中索引
	let selectIndex = ref(0)
	//列表数据
	let listData =ref([])
	const hi = ref (0)
	const setHeight = (newhi)=>{
		console.log('更新',newhi)
		hi.value = newhi
	}

	onShow(()=>{
		//判断是否从我的页面进入（带索引）
		if(app.globalData.globalIndex) 
		selectIndex.value = app.globalData.globalIndex
		//获取所有数据
		getListData(selectIndex)
	})
	//控制弹窗开关
	const open = ()=>{
		isShow.value = true
	}
	const close  =()=>{
		isShow.value = false
	}
	//传给服务器的标识符
	let i = ''
	//获取订单数据
	const getListData = async(index)=>{
		//每次请求前先获取token（更新）
		token.value = uni.getStorageSync('token')
		try{
			if(index==0) i = ''
			else i=index.toString()
			//没有token要提示登陆
			if(!token.value){
				isShow.value = true
			}
			//获取订单列表
			const re = await app.globalData.apis.getOrderList(i,uni.getStorageSync('token'))
			listData.value = re.data
			//将下单时间转为特定格式显示
			changeDate.value = listData.value.map((item,index)=>{
				const re = app.globalData.common.toDate(item.order_start_time)
				return re
			})
		}catch(error){
			console.dir(error)
		}

	}
	const changeTab = (index)=>{
		selectIndex.value = index
		// 更新数据
		getListData(index)
	}
	//特定格式日期
	const changeDate = ref([])
	
</script>

<!-- 配置页面背景色 -->
<style lang="scss">
page {
  background: #fff;
  
}
.body{
margin-top: 180rpx;
}
</style>
<style lang="scss" scoped>
.box{
	height: 60rpx;
}
.topTab{
	position: fixed;
	left: 0;
	top:9;
	z-index:2;
	width:100%;
	border-bottom:0 none;
	background-color: #ffffff;
	display:flex;
	align-items: center;
}
.topTab > view {
	display:inline-block;
	width:20%;
	text-align: center;
	height:60rpx;
	line-height: 60rpx;
	font-size: 32rpx;
}
.tabItem{
	color: #cdcdcd;
	border-bottom: 4rpx solid #ffffff;
}
.tabItemon{
	color:#00a176;
	border-bottom: 4rpx solid #00a176;
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
}
.font3{
	font-size: 30rpx;
	text-align: right;
	color:#c1c1c1;
	width: 130rpx;
	height:100%;
}
.ordbody{
	display: flex;
	align-content:space-between;
}
</style>
