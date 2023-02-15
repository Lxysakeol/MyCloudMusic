<template>
	<view class="ad-page">
		<!-- logo页 -->
		<view class="logo-bg">
			<image src="../../static/image/ad/1.png" class="top-logo" mode="widthFix"></image>
			<image src="../../static/image/ad/2.png" class="bot-logo" mode="widthFix"></image>
		</view>
		<!-- 广告页 -->
		<view class="ad-bg" :class="{active:isShowAd}">
			<image :src="picture" mode="widthFix" class="ad"></image>
			<view class="ad-logo">
				<image src="../../static/image/ad/3.png" class="img" mode="widthFix"></image>
			</view>
			<view class="close" @click="close">
				跳过
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowAd: false, //控制广告页显示
				picture: '', //请求的图片
				startTime: 0, //开始计算时间
				waitTime: 2000, //logo等待时间
				showTime: 7000, //广告显示时间
				adTimer: null
			};
		},
		methods: {
			// 显示广告页
			getAd() {
				// this.isShowAd = false
				// let nowTime = (new Date()).getTime()
				// let questTime = nowTime - this.startTime
				// let wait = questTime < this.waitTime ? (this.waitTime - questTime) : 0;
				// setTimeout(()=>{
				// 	this.isShowAd = true
				// },questTime)
				// 这里需要调用获取广告页的接口,没接口所以不需要等待异步的时间,logo页面直接等待2S就可以跳走了
				setTimeout(() => {
					this.isShowAd = true
					this.picture =
						'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fddrvcn.oss-cn-hangzhou.aliyuncs.com%2F2019%2F5%2FjQRze2.jpg&refer=http%3A%2F%2Fddrvcn.oss-cn-hangzhou.aliyuncs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673531608&t=bf9fdfb6f3978c2eb8f9158ffc4a5445'
				}, 2000)
				this.adTimer = setTimeout(() => {
					this.close();
				}, 7000)
			},
			// 关闭广告页
			close() {
				clearTimeout(this.adTimer);
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
		},
		onShow() {
			this.getAd()
			// this.startTime = (new Date()).getTime();
		}

	}
</script>

<style lang="scss">
	.ad-page {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: #da2d1f;
		z-index: 1000;

		.top-logo {
			position: absolute;
			top: 423rpx;
			left: 50%;
			width: 450rpx;
			height: 93rpx;
			transform: translateX(-50%);
		}

		.bot-logo {
			position: absolute;
			bottom: 40rpx;
			left: 50%;
			width: 220rpx;
			height: 43rpx;
			transform: translateX(-50%);
		}

		.ad {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 2;
			background: #fff;
		}

		.logo-bg {
			opacity: 1;
			transition: opacity 0.3s;

			&.active {
				opacity: 0;
				display: none;
			}
		}

		.ad-bg {
			opacity: 0;
			transition: opacity 0.3s;

			&.active {
				opacity: 1;
				display: block;
			}
		}

		.ad-logo {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 168rpx;
			background: #fff;
			z-index: 3;

			.img {
				display: block;
				width: 258rpx;
				height: 86rpx;
				margin: 40rpx auto 0;
			}
		}
	}

	.close {
		position: absolute;
		right: 20rpx;
		bottom: 190rpx;
		width: 146rpx;
		height: 62rpx;
		color: #fff;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 62rpx;
		text-align: center;
		line-height: 62rpx;
		z-index: 101;
	}
</style>
