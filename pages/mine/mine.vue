<template>
	<view>
		这是我的页面
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.top-img {
		width: 50rpx;
		height: 40rpx;

		&.left {
			margin-left: 10rpx;
		}
	}

	.page-content {
		position: fixed;
		top: 44px;
		left: 0;
		right: 0;
		bottom: 0px;
	}

	.nav-list {
		height: 220rpx;
		padding-top: 70rpx;
		padding-bottom: 14rpx;
		white-space: nowrap;
		text-align: center;
		line-height: 76rpx;
		color: #666;
		border-bottom: 1rpx solid #e6e6e6;
		font-size: 24rpx;
		background: #fff;

		.item {
			position: relative;
			display: inline-block;
			height: 210rpx;
			width: 166rpx;

		}

		.img {
			display: block;
			width: 70rpx;
			height: 70rpx;
			margin: 0 auto;
			border-radius: 50%;
		}
	}

	.line-item {
		.icon {
			float: left;
			width: 70rpx;
			height: 70rpx;
			margin-top: 24rpx;
			margin-right: 36rpx;
		}

		.lab {
			font-size: 32rpx;
			color: #444;
		}

		.con {
			position: relative;
			height: 100rpx;
			overflow: hidden;

			&:before {
				position: absolute;
				content: "";
				right: 0;
				bottom: 0;
				width: 100%;
				border-bottom: 1rpx solid #e6e6e6;
			}
		}
	}

	.recommend-list {
		border-top: 16rpx solid #f8f8f8;
	}
</style>
