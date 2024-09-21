<template>
	<view class="headline">{{title}}</view>
</template>

<script setup>
	import {ref,defineProps} from 'vue'
	let defaultStyle = defineProps({
		title:{
			type:String,
			default:''
		},
	})
</script>

<style lang="scss" scoped>
.headline{
	font-size: 30rpx;
	width:100%;
	height:32rpx;
	line-height: 32rpx;
	padding-left: 20rpx;
	position: relative;
}
.headline::before{
	content: "";
	width: 3px;
	height:32rpx;
	position: absolute;
	left:0;
	top:0;
	background: #16a676;
}
</style>