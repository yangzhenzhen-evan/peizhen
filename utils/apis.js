// 统一管理接口
import {request} from '../utils/utils.js'

//获取登录信息
const getUserInfo = ()=>{
	uni.login({
		success:(res)=>{
			return request({
				url:'/auth/wxLogin',
				data:{code:res.code}
			}).then(res=>{console.log('useMsg',res)})
		}
	})
}
//首页地区和初始化信息接口
const homeInit = ()=>{
	//默认中部地区
	return request({
		url:'/app/init',
	})
}
//通过id查询地区数据
const areaData = (id)=>{
	return request({
		url:'/Index/index',
		data:{aid:id},
	})
}
//根据传入参数获取服务详细数据
const serviceData = (id)=>{
	return request({
		url:'/Service/order',
		data:{
			svid:id
		}
	})
}
//就诊对象列表
const clientData = ()=>{
	return request({
		url:'/User/clients'
	})
}
//发送验证码
const sendCode = (phone)=>{
	return request({
		url:'/get/code',
		method:'POST',
		data:{
			tel:phone
		}
	})
}
//校验验证码
const checkCode = (telnumber,codenumber)=>{
	return request({
		url:'/user/authentication',
		method:'POST',
		data:{
			tel:telnumber,
			code:codenumber
		}
	})
}
//创建订单
const createOrder = (obj,tokenStr)=>{
	return request({
		url:'/pay/createOrder',
		method:'POST',
		data:obj,
		header:{
			token:tokenStr
		}
	})
}
//获取订单列表
const getOrderList = (stateNumber='',tokenNumber)=>{
	if(!tokenNumber){
		uni.showToast({
			title:'请先登录！',
			icon:'none'
		})
		return
	}
	return request({
		url:'/order/list',
		data:{
			state:stateNumber
		},
		header:{
			token:tokenNumber
		}
	})

}
//获取订单详情
const getOrdDetail = (orderID,tokenNumber)=>{
	return request({
		url:'/order/detail',
		data:{
			oid:orderID
		},
		header:{
			token:tokenNumber
		}
	})
}
//获取医院详情
const getHosData = (hidNumber)=>{
	return request({
		url:'/Hospital/index',
		data:{
			hid:hidNumber
		}
	})
}
//获取用户信息
const getUser = (tokenNumber)=>{
	return request({
		url:'/User/index',
		header:{
			token:tokenNumber
		}
	})
}
export default {
	getUserInfo,
	homeInit,
	areaData,
	serviceData,
	clientData,
	sendCode,
	checkCode,
	createOrder,
	getOrderList,
	getOrdDetail,
	getHosData,
	getUser
}