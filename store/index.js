import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

let saveMusicList = []
try{
	const value = uni.getStorageSync("playMuscicList")
	if(value){
		saveMusicList = JSON.parse(value)
	}
}catch(e){
	//TODO handle the exception
}

const store = new Vuex.Store({
	state: {
		userInfo: {
			hasLogin: false,
		},
		leaveTime: 0,
		playMuscicList:saveMusicList
	},
	mutations: {
		// 用户长时间登陆
		storeLogin(state, payLoad) {
			const temp = {
				hasLogin: true,
				token: payLoad.token,
				profile: payLoad.profile
			}
			state.userInfo = temp;
			//对象要转换成JSON字符串,setStorage方法只能存储字符串数据，不会自动识别javaSrcipt对象并转换成字符串
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo));
		},
		// 用户登出
		storeLogOut(state) {
			const temp = {
				hasLogin: false,
				token: '',
				profile: {},
			}
			state.userInfo = temp;
			uni.removeStorageSync('userInfo');
		},
		storeLeaveTime(state, payLoad) {
			let curTime = (new Date()).getTime();
			state.leaveTime = curTime
		},
		//保存播放音乐列表
		savePlayMuscicList(state,payLoad){
			state.playMuscicList = payLoad;
			//持久化存储
			uni.setStorageSync("playMuscicList",JSON.stringify(payLoad))
		}
	},
	actions: {},
	modules: {}
})
export default store
