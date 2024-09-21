<template>
	<view class="">
		<navbar title="填写服务订单"></navbar>
		<view class="body">
			<view class="step">
				<uni-steps :options="step" :active="active" active-color="white"></uni-steps>
			</view>
			<!-- 基本信息 -->
			<uni-card class="card1">
				<uni-list>
					<uni-list-item
					:thumb="serviceData.icon_image_url"
					thumb-size="lg">
						<template v-slot:body>
							<text class="font1">{{serviceData.name}}</text>
						</template>
						<template v-slot:footer>
							<view class="box2" @click="dialog">
								<uni-icons type="info" size="20" color="#d2d2d2"></uni-icons>
								<text class="font2">服务内容</text>
							</view>
						</template> 
					</uni-list-item>
				</uni-list>
			</uni-card>
			<!-- 服务详情 -->
			<uni-card class="card2" v-if="serviceData.stype ==40 || serviceData.stype ==15">
				<uni-forms ref="serForm" :modelValue="serform" :rules="rules" class="uni-list">
					<uni-forms-item label="选择医院">
						<view class="uni-list-cell-db">
							<picker @change="hospitalChange" :value="hospitalIndex" :range="hosArray">
								<view class="hos-input">{{hosArray[hospitalIndex]}}</view>
							</picker>
							<uni-icons type="right" size="18"></uni-icons>
						</view>
					</uni-forms-item>
					<uni-forms-item label="选择日期">
						<view class="uni-list-cell-db">
							<uni-datetime-picker 
							returnType="timestamp" 
							v-model="serform.starttime" >
							<view class="hos-input" v-if="serform.starttime==0">请选择服务时间</view>
							<view class="hos-input" v-else>{{showDate}}</view>
							</uni-datetime-picker>
							<uni-icons type="right" size="18"></uni-icons>
						</view>
					</uni-forms-item>
					<!-- 代跑取药特有信息 -->
					<uni-forms-item label="收件信息"
					 v-if="serviceData.stype ==40">
						<view class="uni-list-cell-db" @click="showAddress">
							<view class="hos-input">{{AddressMsg}}</view>
							<uni-icons type="right" size="18"></uni-icons>
						</view>
					</uni-forms-item>
					<!-- 陪诊特有信息 -->
					<uni-forms-item label="就诊人"
					 v-if="serviceData.stype ==15">
						<view class="uni-list-cell-db" @click="showClient">
							<view class="hos-input">{{clientName}}</view>
							<uni-icons type="right" size="18"></uni-icons>
						</view>
					</uni-forms-item>
					<uni-forms-item label="接送地址"
					 v-if="serviceData.stype ==15">
						<view class="uni-list-cell-db">
							<uni-easyinput
							class="hos-input"
							placeholder="请输入接送地址"
							v-model="serform.receiveAddress"
							:inputBorder="false"
							:clearable="false">
							</uni-easyinput>
							<uni-icons type="right" size="18"></uni-icons>
						</view>
					</uni-forms-item>
					<uni-forms-item label="联系电话">
						<view class="uni-list-cell-db">
							<uni-easyinput
							class="hos-input"
							type="number"
							placeholder="请输入联系电话"
							v-model="serform.tel"
							:inputBorder="false" :clearable="false">
							</uni-easyinput>
							<uni-icons type="right" size="18"></uni-icons>
						</view>
					</uni-forms-item>
				</uni-forms>
			</uni-card> 
			<!-- 服务需求 -->
			<view class="box3">
				<view class="font3">服务需求</view>
				<uni-card class="card2"  v-if="serviceData.stype ==40 || serviceData.stype ==15">
					<textarea 
					v-model="serform.demand"
					placeholder-style="color:#d2d2d2" 
					placeholder="请简单描述您的需求"/>
				</uni-card> 
			</view>
		</view>
		<!-- 底部悬浮按钮 -->
		<view class="serFoot">
			<view class="xieyi">
				<checkbox value="cb" :checked="isxieyi" @click="isxieyi=!isxieyi"
				color="#FFCC33" style="transform:scale(0.7)" />
				<text>我已阅读并同意</text>
				<navigator url=''>《用户协议》</navigator>
				<text>和</text>
				<navigator url=''>《服务协议》</navigator>
			</view>
			<view class="btn">
				<button
				@click="submitForm"
				type="default"
				:style="isxieyi?'color:#ffffff;background-color:#1AAD19;border-color:#1AAD19;':''"
				>确认下单，支付{{serform.price}}元
				</button>
			</view>
			<!-- 防止fixed元素点击穿透 -->
			 <div style="position:absolute;pointer-events: none;color:transparent;">
			    随便写点什么，为空不出问题也可以不写
			</div>
		</view>
		<!-- 登录弹窗 -->
		<uni-popup ref="loginDialog" type="center" :is-mask-click="false" background-color="#fff" style="border-radius: 10rpx;padding: 20rpx;">
			<uni-forms ref="loginForm" :modelValue="loginForm" :rules="rules" class="uni-list">
				<uni-forms-item>
					<view class="uni-list-cell-db">
						<uni-easyinput
						class="hos-input"
						type="number"
						placeholder="请输入联系电话"
						v-model="loginForm.tel"
						:clearable="false">
						</uni-easyinput>
					</view>
				</uni-forms-item>
				<uni-forms-item>
					<view class="uni-list-cell-db">
						<uni-easyinput
						class="hos-input"
						type="text"
						placeholder="请输入验证码"
						v-model="loginForm.code"
						:clearable="false">
						</uni-easyinput>
						<view @click="getCode" style="color: #00aaff;padding:0 16rpx; text-align: center;border: 1rpx solid #00aaff;padding: 17rpx;">
						{{loginForm.codetext}}
						</view>
					</view>
				</uni-forms-item>
			</uni-forms>
			<view class="loginBtns">
				<view class="cancel" @click="cancel">取消</view>
				<view class="ok" @click="ok">确定</view>
			</view>
		</uni-popup>
		
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
	//生成二维码的插件
	import UQRCode from 'uqrcodejs'
	const app = getApp()
	const step = ref([])
	const active = ref(0)
	step.value=[{title: '填写订单'},{title: '在线支付'},{title: '专人服务'},{title: '服务完成'}]
	const serviceData = ref({})
	const h = ref(0)
	const setHeight = (height)=>{
		h.value = height
		console.log('h',h)
	}
	//创建弹窗实例
	const loginDialog = ref()
	const loginForm = reactive({
		tel:'',
		code:'',
		codetext:'点击获取验证码',
		time:60
	})
	//支付弹窗实例
	const payDialog = ref()
	//订单数据
	const serform =reactive({
	"price":'0',
    "address": {
        "cityName": "",
        "countyName": "",
        "detailInfo": "",
        "userName": ""
    },
    "demand": "",
    "hospital_id": 0,
    "hospital_name": "",
    "receiveAddress": "",
    "service_code": "",
    "service_id": 0,
    "service_name": "",
    "service_stype": "",
    "starttime": 0,
    "tel": "",
    "client": {
        "age": 0,
        "mobile": "",
        "name": "",
        "sex": 0
    },})
	const hospitalData = ref({})
	const hospitalIndex = ref(0)
	//医院数组
	let hosArray= computed({
	// 读取
	get(){
	  const re =  toRaw(hospitalData.value).map((item,index) => {return item.name})
	  console.log('re33',re)
	  return re
	}
	})
	//医院选择器
	const hospitalChange = (e) => {
		
        hospitalIndex.value = e.detail.value
		const hos = toRaw(hospitalData.value)
		serform.price = hos[hospitalIndex.value].service_price
		serform.hospital_id = hos[hospitalIndex.value].id
		serform.hospital_name = hos[hospitalIndex.value].name
		console.log('serform',serform)
    }
	//时间选择器
	const showDate = computed({
		// 读取
		get(){
			const re = app.globalData.common.toDate(serform.starttime)
			console.log('serform.starttime',serform.starttime)
		  return re
		}
	})
	//决定电话是否显示
	let isTel = ref(1)
	const showTel=()=>{
		isTel.value = (isTel.value==1?0:1)
	}
	//代跑取药功能——收件信息
	let AddressMsg= computed({
	// 读取
	get(){
		const re = serform.address.userName?`${serform.address.userName}(${serform.address.cityName}-${serform.address.countyName}-${serform.address.detailInfo}`:'请输入收件信息'
		return re
	}
	})
	const showAddress = ()=>{
		console.log(123)
		uni.chooseAddress({
			success:(res)=>{
				//对象解构赋值给新变量
				let {cityName,countyName,detailInfo,userName} = res
				serform.address.cityName = cityName
				serform.address.countyName = countyName
				serform.address.detailInfo = detailInfo
				serform.address.userName = userName
				console.log('信息',serform.address)
			}
		})
		
	}
	//同意协议
	const isxieyi = ref(false)
	//就诊人
	const clientName =computed({
	// 读取
	get(){
		const re = serform.client.name?`${serform.client.name}`:'请选择就诊人'
		return re
	}
	})
	const showClient=()=>{
		uni.navigateTo({
			url:'../client/client?act=select'
		})
	}
	//关闭弹窗
	 const cancel = ()=>{
		 loginDialog.value.close()
	 }
	 const payClose = ()=>{
		 payDialog.value.close()
		 //跳到订单详情页
		 uni.switchTab({
		 	url:'../order/order'
		 })
	 }
	//提交订单
	const submitForm =async()=>{
		//表单校验
		//先判断是否勾选协议
		if(!app.globalData.common.validateForm(!isxieyi.value,'请先勾选协议！')) return
		if(!app.globalData.common.validateForm(hospitalIndex.value==0,'请先选择医院！')) return
		if(!app.globalData.common.validateForm(serform.starttime==0,'请先选择日期！')) return
		if(serviceData.value.stype ==40 && (!app.globalData.common.validateForm(!serform.address.userName,'请先选择收件地址！'))) return
		if(serviceData.value.stype ==15 && (!app.globalData.common.validateForm(!serform.client.name,'请先选择就诊人！'))) return 
		if(serviceData.value.stype ==15 && (!app.globalData.common.validateForm(!serform.receiveAddress,'请先填写收件信息！'))) return 
		if(!app.globalData.common.validateForm(!serform.tel,'请先填写电话！',serform.tel)) return
		
		//判断用户是否手机号登录成功
		//未登录需弹窗提示登录
		if(!uni.getStorageSync('token')) {
			loginDialog.value.open('center')
			return
		}
		
		//调用订单接口
		const obj = toRaw(serform)
		try{
			const re = await app.globalData.apis.createOrder(obj,uni.getStorageSync('token'))
			console.log('创建订单',re)
			//二维码
			payDialog.value.open('center')
			// 获取uQRCode实例
			const qr = new UQRCode()
			// 设置二维码内容
			qr.data = re.wx_code
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
			
		}catch(error){
			uni.showToast({
				title:error,
				icon:'none'
			})
		}
	}
	//标识符
	let flag = false
	//验证码获取
	const getCode = async()=>{
		// 先验证手机号要填,然后倒计时,结束后复原,并且设置标识符防止频繁点击
		if(!app.globalData.common.validateForm(!loginForm.tel,'请先填写电话！',loginForm.tel)) return
		//标识符判断是否用户已经点击
		if(flag) return
		console.log('flag')
		//开启验证码倒计时
		let i = setInterval(()=>{
			if(loginForm.time<=0){
				flag=false
				loginForm.time = 60
				loginForm.codetext='重新获取验证码'
				clearInterval(i)
			}else{
				flag=true
				loginForm.time-=1
				loginForm.codetext=`剩余${loginForm.time}s`
			}
		},1000)
		//发送验证码
		try {
		  const re = await app.globalData.apis.sendCode(loginForm.tel)
		} catch (error) {
			uni.showToast({
				title:'发送过于频繁，请1小时后再试！',
				icon:'none'
			})
			flag=false
			loginForm.time = 60
			loginForm.codetext='点击获取验证码'
			clearInterval(i)
		}
		
	}
	const ok = async ()=>{
		//提交登录表单前先校验
		if(!loginForm.tel||!loginForm.code){
			return 	uni.showToast({
				title:'请填写手机号或验证码！',
				icon:'none'
			})
		}
		//检查验证码是否正确
		const re = await app.globalData.apis.checkCode(loginForm.tel,loginForm.code)
		//将登陆后的token缓存
		uni.setStorageSync('token',re.data.token)
		//关闭弹窗
		loginDialog.value.close()
	}
	//获取传入的参数color
	onLoad(async (obj)=>{
		console.log('obj',obj)
		//获取服务数据
		const res = await app.globalData.apis.serviceData(obj.svid)
		serviceData.value = res.data.service
		hospitalData.value = res.data.hospitals
		console.log('ser',serviceData)
		console.log('hos',hospitalData)
		const ser = toRaw(serviceData.value)
		serform.service_code = ser.code
		serform.service_id = ser.id
		serform.service_name = ser.name
		serform.service_stype = ser.stype
		
		// 根据传入的hid默认选中医院
		if(obj.hid > 0){
			const hos = toRaw(hospitalData.value)
			for (let i = 0;i++;i<hos.length){
				if(obj.hid==hos[i].id){
					hospitalIndex.value = i
					serform.price = hos[i].service_price
					serform.hospital_id = hos[i].id
					serform.hospital_name = hos[i].name
				}
			}
		}
		console.log('serform',serform)
		//自定义就诊人事件
		uni.$on('showClient',(obj)=>{
			console.log('就诊信息',obj)
			const {name,age,mobile,sex,user_id} = obj
			serform.client.age = age
			serform.client.mobile = mobile
			serform.client.name = name
			serform.client.sex = sex
			console.log(serform.client)
		})
	})
	
	//销毁自定义事件
	onUnload(()=>{
		uni.$off('showClient')
	})
	
	//弹出服务提醒
	const dialog = ()=>{
		
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
.box1 image{
	width:25rpx;
	height:25rpx;
}
.box2{
	margin-left: auto;
	display: flex;
	align-items: center;
}
.font1{
	font-size: 34rpx;
	font-weight: bold;
}
.font2{
	font-size: 30rpx;
	color:#d2d2d2;
}
.box3 .font3{
	margin-left: 30rpx;
	font-size: 30rpx;
	color:#888888;
}
.card1{
	margin-bottom: 30rpx;
}
.serFoot{
	position: fixed;
	z-index: 2;
	bottom: 0;
	width: -webkit-fill-available;
	background-color: #ffffff;
	padding: 20rpx;
	font-size:32rpx;
	text-align:center;
}
.xieyi{
	display: flex;
}
.loginBtns{
	display: flex;
	justify-content: center;
	font-size: 36rpx;
	color: #e0e0e0;
}
.loginBtns > view {
	text-align: center;
	border: 1rpx solid #d2d2d2;
	border-radius: 10rpx;
	padding:15rpx 20rpx;
	line-height: 36rpx;
	width:50%;
}
.ok{
	color: #00aa7f;
}
:deep(.uni-popup .uni-popup__wrapper){
	border-radius: 10rpx;
}
:deep(.hos-input){
	width: 400rpx;
    height: 60rpx;
    line-height: 60rpx;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
	overflow: hidden;
}
//伪元素增大点击范围
:deep(.hos-input::after){
	content: "";
    position: absolute;
    top: -10px;
    bottom: -10px;
    left: 200px;
    right: -20px;
}
//修改组件默认样式
:deep(.uni-list-item__container){
	padding:10px 0;
	align-items: center;
}
:deep(.uni-list--border-top){
	height:0px;
}
:deep(.uni-forms-item){
	margin-bottom: 0;
	justify-content: pace-between;
	align-items: center;
}
:deep(.uni-forms-item:not(:last-child)){
	border-bottom: solid 1px #eeeeee; 
}
:deep(.uni-forms-item__label){
	height:14px;
}
:deep(.uni-list-cell-db){
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
}
:deep(.uni-date-editor .hos-input){
	width:100%;
}
:deep(.uni-easyinput){
	text-align: right;
}
</style>
