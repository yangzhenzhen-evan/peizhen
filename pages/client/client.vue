<template>
	<view class="">
		<navbar :title="cliTile"></navbar>
		<view class="body">
			<uni-list>
				<uni-list-item v-for="(item,index) in cliData" :key="index"
				@click="changeClient(index)" clickable>
					<template v-slot:body>
						<view class="mainMsg">
							<text>{{item.name}}</text>
						</view>
						<view class="otherMsg">
							<text :style="'color:'+(item.sex==1?'#4881df':'#df4872')">{{item.sex==1?'男':'女'}}</text>
							<text>{{item.age}}周岁</text>
							<text>{{item.mobile}}</text>
						</view>
					</template>
					<template v-slot:footer>
						<view class="box2">
							<text class="font2" v-if="act=='select'">选择</text>
							<text class="font3" v-else>移除</text>
						</view>
					</template> 
				</uni-list-item>
			</uni-list>
		</view>	
	</view>
</template>

<script setup>
	import {ref,toRaw} from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	
	let cliTile = ref('')
	let cliData = ref([])
	const app = getApp()
	const act = ref('')
	onLoad(async(obj)=>{
		console.log(obj)
		//根据传入参数判断来自哪个页面，设置标题和样式
		if(obj.act=='select'){
			cliTile.value = '请选择服务对象'
		}else{
			cliTile.value = '服务对象管理'
		}
		act.value = obj.act
		//调用服务对象接口
		const res = await app.globalData.apis.clientData()
		cliData.value = res.data.clients
		console.log('服务对象',cliData)
	})
	//选中服务对象进行操作
	const changeClient = (index)=>{
		//对参数判断决定是选择or删除
		//选择功能
		console.log('99')
		if(act.value=='select'){
			//某就诊人信息
			const data = cliData.value[index]
			uni.$emit('showClient',toRaw(data))
			uni.navigateBack()
		}
	}
</script>

<style lang="scss" scoped>
:deep(page){
	background-color: #f4f4f4;
}
.body{
	margin-top:130rpx;
}
.mainMsg{
	font-weight: bold;
}
.otherMsg text{
	margin-right: 10rpx;
}
.box2{
	position: relative;
    right: -240rpx;
}
.box2 text{
	display: inline-block;
	padding:15rpx 30rpx;
	font-weight: bold;
	overflow: hidden;
	border-radius: 10rpx;
}
.font2{
	color:#0bb584;
	border:1rpx solid #0bb584;
}
.font3{
	color:#f13e6d;
	border:1rpx solid #f13e6d;
}
:deep(.uni-list-item__container){
	justify-content: pace-between;
	align-items: center;
	font-size: 30rpx;
}

</style>
