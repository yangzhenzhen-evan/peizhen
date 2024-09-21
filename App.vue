<script>
	import apis from './utils/apis.js'
	import common from './utils/utils.js'
	export default {
	
		onLaunch: function() {
			this.globalData.apis.getUserInfo()
		},
		onShow: function() {

		},
		onHide: function() {
		
		},
		//全局变量
		globalData:{
			apis:apis,
			common:common,
			// 订单索引，用于页面传递参数
			globalIndex:0,
			hi:0
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import url('./utils/common.css');
</style>
