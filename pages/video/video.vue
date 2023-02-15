<template>
	<view class="video">
		<view class="topbar">
			<scroll-view class="scroll-view" scroll-x="true" :show-scrollbar="false">
				<view class="rel">
					<!-- 导航条 -->
					<view class="item" v-for="(item,index) in navList" :key="index" :class="{active:curNav==index}"
						@click="switchNav(index)">
						<view class="desc">
							{{item.name}}
						</view>
					</view>
					<!-- 导航条下划线 -->
					<view class="slide" :style="`width:${sildeWidth}rpx;transform:translateX(${sildeOffset}rpx)`">
					</view>
				</view>
			</scroll-view>
		</view>
		<mescroll-uni :down="downOption" :up="upOption" @down="downcallback" @up="upcallBack">
			<view class="video-list">
				<view class="video-item" v-for="(item,index) in relateVideo" :key="index">
					<view class="video-wrap">
						<image :src="item.coverUrl" class="img"></image>
						<view class="desc ellipsis">
							{{item.title}}
						</view>
						<view class="creater-bar flex-box">
							<view class="name">
								{{item.creator[0].userName}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import Mescrolluni from '@/components/mescroll-uni/mescroll-uni.vue'
	import {
		reqGetRelateVideo
	} from '@/apis/index.js'
	export default {
		data() {
			return {
				navList: [{
						name: '推荐',
						id: 1
					},
					{
						name: 'Lock直播',
						id: 2
					},
					{
						name: '翻唱',
						id: 3
					},
					{
						name: '广场',
						id: 4
					},
					{
						name: '舞蹈',
						id: 5
					},
					{
						name: '游戏',
						id: 6
					},
					{
						name: '现场',
						id: 7
					},
				],
				curNav: 0,
				sildeWidth: 60, //导航条默认宽度
				sildeOffset: 30, //导航条偏移度
				relateVideo: [], //视频列表
				downOption: {
					auto: false
				},
				upOption: {
					auto: false,
				}

			}
		},
		onLoad() {
			this.getList(1, 5, res => {
				this.relateVideo = res
			})
		},
		methods: {
			// 导航条下划线、高亮切换
			switchNav(index) {
				if (index == 1) {
					this.sildeWidth = 140
				} else {
					this.sildeWidth = 60
				}
				if (index > 1) {
					this.sildeOffset = index * 123 + 80
				} else {
					this.sildeOffset = index * 124 + 30
				}
				this.curNav = index;
				this.getList(1, 5, res => {
					console.log(res)
					this.relateVideo = res
				});
			},
			//视频列表
			getList(pageNum, pageSize, successCallback, errCallback) {
				const params = {
					id: this.curNav + 1,
					pageNum,
					pageSize
				}
				reqGetRelateVideo(params).then(res => {
					if (successCallback) {
						successCallback(res.data)
					}
				}, err => {
					if (errCallback) {
						errCallback(err)
					}
				})
			},
			//下拉刷新列表
			downcallback(mescroll) {
				//重置列表为第一页
				mescroll.resetUpScroll();
			},
			// 上拉加载数据
			upcallBack(mescroll) {
				this.getList(mescroll.num, mescroll.size, res => {
					if (mescroll.num == 1) {
						// 第一页就先清楚数据
						this.relateVideo = [];
					}
					//累加数据
					this.relateVideo = this.relateVideo.concat(res)
					mescroll.endSuccess()
				}, () => {
					mescroll.endErr();
				})
			},

		}
	}
</script>

<style lang="scss">
	.topbar {
		.h86 {
			height: 86rpx;
		}
	}

	.scroll-view {
		position: fixed;
		top: 0;
		width: 100%;
		height: 86rpx;
		white-space: nowrap;
		text-align: center;
		line-height: 86rpx;
		color: #333;
		font-weight: 600;
		border-bottom: 1rpx solid #e6e6e6;
		z-index: 10;
		background: #fff;

		.item {
			position: relative;
			display: inline-block;
			min-width: 126rpx;
			height: 86rpx;
			line-height: 86rpx;
			padding: 0 20rpx;

			&.active {
				color: #f32628;
			}
		}
	}

	.slide {
		position: absolute;
		width: 60rpx;
		height: 4rpx;
		left: 0;
		bottom: 0rpx;
		background: #f32628;
		transition: transform 0.3s;
		z-index: 2;
		/* #ifdef MP-WEIXIN */
		bottom: 2rpx;
		/* #endif */
	}

	.video-list {
		color: #333;
		background: #f8f8f8;

		.tit-bar {
			padding-left: 32rpx;
		}

		.video-item {
			padding-top: 32rpx;
			background: #fff;
			border-bottom: 24rpx solid #f8f8f8;
		}

		.video-wrap {
			width: 686rpx;
			margin: 0 auto;
		}

		.img {
			display: block;
			width: 686rpx;
			height: 390rpx;
			border-radius: 10rpx;
			background: #eee;
		}

		.desc {
			font-size: 30rpx;
			font-weight: 600;
			line-height: 84rpx;
			border-bottom: 1rpx solid #e6e6e6;
		}
	}

	.creater-bar {
		height: 100rpx;
		justify-content: space-between;
		align-items: center;

		.avactor-box {
			align-items: center;
		}

		.avactor {
			width: 66rpx;
			height: 66rpx;
			margin-right: 10rpx;
			border-radius: 66rpx;
			background: #eee;
		}

		.name {
			line-height: 100rpx;
		}
	}
</style>
