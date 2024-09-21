<template>
	<!-- 倒计时，结束后触发自定义事件 -->
	<uni-countdown :show-day="false" :hour="h" :minute="m" :second="s" @timeup="emit('onTimeUp',defaultStyle.option)"/>
</template>

<script setup>
	import {ref,defineProps,computed,defineEmits} from 'vue'
	import {onLoad,onShow} from '@dcloudio/uni-app'
	
	let defaultStyle = defineProps({
		//时间戳
		time:{
			type:Number,
			default:0
		},
		//自定义事件的参数
		option:{
			type:String,
			default:''
		}
	})
	//自定义事件
	let emit = defineEmits(['onTimeUp'])
	
	let h = ref(0)
	let m = ref(0)
	let s = ref(0)
	onLoad(()=>{
		console.log('传入的参数',defaultStyle)
	})
	//将传入的时间戳分别获取到时，分，秒
	onShow(() => {
	  const date = new Date(defaultStyle.time)
	  h.value = date.getHours()
	  m.value = date.getMinutes()
	  s.value = date.getSeconds()
	  console.log('hms',h,m,s)
	})
</script>

<style lang="scss" scoped>
:deep(.uni-countdown){
	display: inline-block;
}
</style>