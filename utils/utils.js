// 封装公共方法
//配置公共网络请求
const baseURL = 'https://code.itndedu.com/pz'
export const request = function(option){
	//确保url存在
	if(!option.url)
	return false
	//解构
	let {
		url,
		data={},
		header={},
		method="GET"
	} = option
	
	return new Promise((resolve,reject)=>{
		//发起网络请求
		uni.request({
			url:baseURL+url,
			data:data,
			header:header,
			method:method,
			//网络请求成功
			success:(res)=>{
				//根据不同状态码作错误处理
				if(res.data.code===10000){
					resolve(res.data)
				}else{
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
					reject(new Error(res.data.msg))
				}
			},
			//网络请求失败
			fail:(error)=>{
				reject(new Error(error))
			}
		})
	})
	
}

//时间戳转成日期显示
const toDate = (time)=>{
  //将时间戳格式转换成年月日时分秒
  const date = new Date(time);
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';

  const h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
  const m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
  const s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
  const strDate = Y + M + D + h + m + s;
  return strDate
}

//表单验证
const validateForm = (obj,title, tel='')=>{
	if(obj){
		uni.showToast({
			title:title,
			icon:'none'
		})
		return false
	}else{
		if(title=='请先填写电话！'&& !(/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(tel))){
			uni.showToast({
				title:'请输入正确格式的手机号码!',
				icon:'none'
			})
			return false
		}else{
			return true	
		}
	}
}

export default {
	toDate,
	validateForm
}
