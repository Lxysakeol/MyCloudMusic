<template>
	<view>
		<uni-nav-bar>
			<!-- 导航条 -->
			<block slot="left">
				<image src="/static//image//cloud/y_03.png" mode="" class="top-img"></image>
			</block>
			<view class="top-tab flex-box">
				<view :class="{active: curNav == index}" v-for="(item,index) in navList" :key="index"
					@click="switchNav(index)">
					{{item.name}}
				</view>
			</view>
			<!-- 只在app-plus||H5中显示、解决兼容问题 -->
			<!-- #ifdef APP-PLUS || H5 -->
			<block slot="right">
				<image src="/static//image//mine/r.png" mode="" class="top-img"></image>
			</block>
			<!-- #endif -->
		</uni-nav-bar>
		<!-- 滚动列表 -->
		<view class="page-content">
			<mescroll-uni :down="downOption" :up="upOption" @down="downcallback" @up="upcallBack" :fixed="false">
				<view class="date-bar flex-box">
					<view class="date-bar-left">
						云村热评墙<text class="iconfont">&#xe605;</text>
						<!-- 上下文字轮播 -->
						<swiper class="date-bar-swiper" autoplay="true" duration="500" circular="true" vertical="true">
							<swiper-item v-for="(item,index) in msgList" :key="index">
								{{item.name}}
							</swiper-item>
						</swiper>
					</view>
					<view>
						<view>
							{{curDate[1]}}
						</view>
						<view class="date-bar-num">
							{{curDate[2]}}
						</view>
					</view>
				</view>
				<view class="list-content flex-box">
					<view class="video-list flex-box">
						<view class="video-item" v-for="(item,index) in splitList.list1" :key="index">
							<view class="video-wrap">
								<image :src="item.coverUrl" mode="widthFix" class="img"></image>
								<view class="video-con">
									<view class="desc">{{item.title}}</view>
									<view class="creater-bar flex-box">
										<view class="name">{{item.creator[0].userName}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="video-list flex-box">
						<view class="video-item" v-for="(item,index) in splitList.list2" :key="index">
							<view class="video-wrap">
								<image :src="item.coverUrl" mode="widthFix" class="img"></image>
								<view class="video-con">
									<view class="desc">{{item.title}}</view>
									<view class="creater-bar flex-box">
										<view class="name">{{item.creator[0].userName}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>

	</view>
</template>

<script>
	import uniNavBar from "@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"
	import Mescrolluni from '@/components/mescroll-uni/mescroll-uni.vue'
	import {
		reqGetRelateVideo
	} from "@/apis/index.js"
	export default {
		components: {
			uniNavBar,
			Mescrolluni
		},
		data() {
			return {
				navList: [{
						name: '广场',
						id: 3452
					},
					{
						name: '动态',
						id: 3462
					},
				],
				curNav: 0,
				downOption: {
					auto: false
				},
				upOption: {
					auto: false,
				},
				msgList: [{
						name: '他是我见过最年少有为的人',
						id: ''
					},
					{
						name: '因为一个人而失眠，这真的好吗',
						id: ''
					},
					{
						name: '花开花落，没有悲愁怎么是少年？',
						id: ''
					},
				],
				curDate: String(new Date()).split(' '),
				videoList: [], //总视频
				splitList: {} //拆开的视频
			}
		},
		onLoad() {
			this.switchNav(0);
		},
		methods: {	
			switchNav(index) {
				// 切换导航栏
				this.curNav = index;
				this.getList(1, 5, res => {
					this.videoList = res
					this.splitVideoList()
				});
			},
			getList(pageNo, pageSize, successCallback, errCallback) {
				const params = {
					id: this.curNav + 1,
					pageNo,
					pageSize
				}
				reqGetRelateVideo(params).then(res => {
					if (successCallback) {
						return successCallback(res.data)
					}
					if (errCallback) {
						return errCallback(err)
					}
				})
			},
			splitVideoList() {
				// 按奇偶拆分视频为两列
				let i = 0,
					list1 = [],
					list2 = [];
				while (i < this.videoList.length) {
					list1.push(this.videoList[i++])
					if (i < this.videoList.length) {
						list2.push(this.videoList[i++])
					}
				}
				this.splitList = {
					list1,
					list2
				}
			},
			downcallback(mescroll) {
				//重置列表为第一页
				mescroll.resetUpScroll();
			},
			upcallBack(mescroll) {
				this.getList(mescroll.num, mescroll.size, res => {
					if (mescroll.num == 1) {
						// 第一页就先清楚数据
						this.videoList = [];
					}
					//累加数据
					this.videoList = this.videoList.concat(res)
					this.splitVideoList()
					mescroll.endSuccess()
				}, () => {
					mescroll.endErr();
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #f8f8f8;
	}

	.page-content {
		position: fixed;
		top: 64px;
		left: 0;
		right: 0;
		bottom: 0;
		/* #ifdef H5 */
		top: 44px; // h5 无状态栏
		/* #endif */
	}

	.top-img {
		width: 50rpx;
		height: 40rpx;

		&.left {
			margin-left: 10rpx;
		}
	}

	.top-tab {
		width: 310rpx;
		/* #ifdef MP-WEIXIN */
		width: 250rpx;
		/* #endif */
		margin: 0 auto;
		justify-content: space-between;

		.active {
			position: relative;
			color: #f32628;

			&:after {
				position: absolute;
				content: '';
				left: 50%;
				width: 94rpx;
				height: 4rpx;
				bottom: 0rpx;
				transform: translateX(-50%);
				background: #f32628;
				border-radius: 4rpx;
			}
		}
	}

	.date-bar {
		width: 686rpx;
		height: 160rpx;
		padding: 20rpx 34rpx;
		margin: 20rpx auto;
		border-radius: 14rpx;
		color: #fff;
		background: rgba(0, 0, 0, .7);
		line-height: 70rpx;
		font-weight: 600;
		justify-content: space-between;

		.date-bar-left {
			font-size: 34rpx;
			font-weight: 600;
		}

		.date-bar-num {
			margin-top: -20rpx;
			font-size: 44rpx;
		}
	}

	.list-content {
		padding-left: 30rpx;
		flex-direction: row; // 主轴方向设置为水平方向
	}

	.video-list {
		flex-direction: column; // 主轴方向设置为垂直方向
	}

	.video-item {
		width: 334rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 14rpx;
		overflow: hidden;
		color: #353536;
		background: #fff;
		line-height: 36rpx;

		.img {
			display: block;
			width: 100%;
			min-height: 188rpx;
		}

		.avactor {
			width: 28rpx;
			height: 28rpx;
			margin-right: 10rpx;
			border-radius: 28rpx;
			background: #ddd;
		}

		.video-con {
			padding: 16rpx 16rpx 30rpx;
		}

		.avactor-box {
			align-items: center;
		}

		.creater-bar {
			margin-top: 10rpx;
			align-items: center;
			color: #999;
			font-size: 20rpx;
		}
	}

	.date-bar-swiper {
		width: 430rpx;
		height: 40rpx;
		line-height: 40rpx;
		color: #d0d2d3;
		font-size: 24rpx;
	}
</style>
