<script>
	export default {
		onLaunch: function() {
			uni.getStorage({
				key:'userInfo',
				success:(res) => {
					this.$store.commit('storeLogin',JSON.parse(res.data))
				}
			})
		},
		onShow: function() {
			console.log('App Show')
			//离开多久之后重新进入app会显示广告
			let showTime = 10*60*1000 //10分钟
			let nowTime = (new Date()).getTime();   //进入app的时间
			let leaveTime = this.$store.state.leaveTime  //离开时间
			if((nowTime - leaveTime)>=showTime){
				uni.navigateTo({
					url:'/pages/advertise/advertise'
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
			this.$store.commit('storeLeaveTime');
		}
	}
</script>

<style lang="scss">
	@import "./common/css/common.scss";
	@import "./common/css/iconfont.css";
</style>
