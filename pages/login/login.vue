<template>
	<view>
		<view class="login-form">
			<input type="text" class="input-row" v-model="account" maxlength="11" placeholder="请输入手机号" />
			<input type="password" class="input-row" v-model="password" maxlength="11" placeholder="请输入密码">
			<button type="button" class="btn log-btn" @click="login">登陆</button>
			<view class="bot flex-box">
				<navigator url="" class="sign" hover-class="none">立即注册</navigator>
				<navigator url="" class="foget" hover-class="none">忘记密码？</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		reqLogin
	} from '@/apis/index.js'
	// import{ mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				account: '',
				password: '',
			};
		},
		methods: {
			login() {
				let account = this.account.trim(); //去掉两头空格
				let password = this.password.trim();
				if (!account) {
					uni.showModal({
						content: '请输入账号',
						showCancel: false
					})
					return false
				}
				if (!password) {
					uni.showModal({
						content: '请输入密码',
						showCancel: false
					})
					return false
				}
				uni.showLoading({
					title: '登陆中...'
				})
				let params = {
					phone: account,
					password: password
				}
				reqLogin(params).then(res => {
					// 登陆失败
					if (res.code != 200) {
						alert(res.msg)
						return false
					}
					//登陆成功,吧登陆信息保存并跳转
					if (res.code == 200) {
						const temp = {
							token: res.token,
							profile: res.profile
						}
						this.$store.commit('storeLogin', temp)
						uni.switchTab({
							url: '/pages/account/account'
						})
					}
				})
				uni.hideLoading();
			},
		}
	}
</script>

<style lang="scss">
	.input-row {
		width: 600rpx;
		height: 75rpx;
		margin: 0 auto;
		border: 1px solid #E04B28;
		color: #6c6c6c;
		border-radius: 75rpx;
		padding: 0 50rpx;
		line-height: 75rpx;
		margin-bottom: 45rpx;
		font-size: 26rpx;
	}

	.login-form {
		padding-top: 220rpx;
	}

	// .login-btn {
	// 	width: 600rpx;
	// 	height: 75rpx;
	// 	margin: 0 auto;
	// 	border: 1px solid #E04B28;
	// 	border-radius: 75rpx;
	// 	padding: 0 50rpx;
	// 	line-height: 75rpx;
	// 	margin-bottom: 45rpx;
	// 	font-size: 26rpx;
	// 	color: #fff;
	// 	background: #E04B28;
	// }

	.bot {
		width: 600rpx;
		padding: 0 17rpx;
		font-size: 26rpx;
		margin: 0 auto;
		justify-content: space-between;
	}

	.sign {
		color: #E04B28;
	}

	.auth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		bottom: 100rpx;
		left: 0;
		width: 100%;

		.auth-image {
			width: 50px;
			height: 50px;
			border: 1px solid #dddddd;
			border-radius: 50px;
			margin: 0 20px;
			background-color: #ffffff;
			overflow: hidden;
		}

		.img {
			width: 30px;
			height: 30px;
			margin: 10px;
		}

		input {
			outline: none;
			border: none;
			list-style: none;
		}
	}

	.log-btn {
		width: 600rpx;
		height: 75rpx;
		border-radius: 75rpx;
		color: #fff;
		margin: 0 auto;
		margin-bottom: 45rpx;
		padding: 0 50rpx;
		background: #333 !important;
		height: 48px;

		&::after {
			background-color: transparent;
			margin: 0;
			padding: 0;
			border: 0;
		}
	}
</style>
