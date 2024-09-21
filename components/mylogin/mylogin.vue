<template>
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
</template>

<script setup>
	import {ref,reactive,defineProps,watch,nextTick,defineEmits} from 'vue'
	import {onShow,onUnload} from '@dcloudio/uni-app'
	const app = getApp()
	const prop = defineProps({
		token:{
			type:String,
			default:'0'
		},
		isShow:{
			type:Boolean,
			default:false
		}
	})
	//创建弹窗实例
	const loginDialog = ref()
	//	检测开/关
	watch(() => prop.isShow, (newValue, oldValue) => {
		if(newValue){
			nextTick(()=>{
				loginDialog.value.open("center")
				console.log('开了')
			})
		}else{
			nextTick(()=>{
				loginDialog.value.close()
				console.log('关了')
			})
		}
	},{immediate: true})
	
	const loginForm = reactive({
		tel:'',
		code:'',
		codetext:'点击获取验证码',
		time:60
	})
	let emit = defineEmits(['close','open'])
	//关闭弹窗
	 const cancel = ()=>{
		 emit('close')
	 }
	//标识符
	let flag = false
	//定时器
	let i 
	//验证码获取
	const getCode = async()=>{
		// 先验证手机号要填,然后倒计时,结束后复原,并且设置标识符防止频繁点击
		if(!app.globalData.common.validateForm(!loginForm.tel,'请先填写电话！',loginForm.tel)) return
		//标识符判断是否用户已经点击
		if(flag) return
		console.log('flag')
		//开启验证码倒计时
		i = setInterval(()=>{
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
		try {
			const re = await app.globalData.apis.checkCode(loginForm.tel, loginForm.code);
			uni.setStorageSync('token', re.data.token);
			// 关闭弹窗
			emit('close')
		} catch (error) {
			console.error("Error during login:", error)
			uni.showToast({
				title: '登录失败，请重试！',
				icon: 'none'
			});
		} finally {
			flag = false
			loginForm.time = 60
			loginForm.codetext = '点击获取验证码'
			clearInterval(i)
		}
	}
</script>

<style lang="scss" scoped>
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
:deep(.uni-popup .uni-popup__wrapper){
	width:600rpx;
}
</style>