<template>
	<view class="play-page" :style="bgStyle">
		<view class="bg"></view>
		<view @click="goBackTo">
			<view class="iconfont back">
				&#xe600;
			</view>
		</view>
		<view class="songName">
			<view :class="{songTitle:isTitleRoll}">
				{{curSongItem.name}}
			</view>
		</view>
		<!-- 拔条 -->
		<!-- <view class="strip-box" :class="playState ? 'active' : ''">
			<image class="img"
				src="https://s3.music.126.net/mobile-new/img/needle-ip6.png?be4ebbeb6befadfcae75ce174e7db862=" mode="">
			</image>
		</view> -->
		<view class="content">
			<!-- 转盘图片 -->
			<view class="play-poster">
				<view class="poster-box" :class="playState ? 'play' : 'pause'">
					<image :src="curSongItem.picUrl" mode="widthFix" class="img"></image>
				</view>
			</view>
			<view class="bot">
				<!-- 上排图标 -->
				<view class="tool-groups flex-box">
					<!-- 收藏 -->
					<view class="flex-item">
						<text class="iconfont">&#xe659;</text>
					</view>
					<!-- 下载 -->
					<view class="flex-item">
						<text class="iconfont">&#xe67a;</text>
					</view>
					<!-- 分享 -->
					<view class="flex-item">
						<text class="iconfont">&#xe86e;</text>
					</view>
					<!-- 评论 -->
					<view class="flex-item">
						<text class="iconfont">&#xe6d3;</text>
					</view>
					<!-- 其他 -->
					<view class="flex-item">
						<text class="iconfont">&#xe612;</text>
					</view>
				</view>
				<!-- 进度条 -->
				<view class="slider-bar flex-box">
					<!-- 开始时间 -->
					<view class="time">
						{{curPlayTimeNum}}
					</view>
					<!-- 进度条 -->
					<slider class="line flex-item" :value="curPlayTime" :max="playTime" min="0" block-size="15"
						@change="sliderChange" block-color="rgba(255, 11, 64)" backgroundColor="rgba(255,255,255,.5)"
						activeColor="rgba(255, 12, 56, 0.5)" />
					<!-- 结束时间 -->
					<view class="time end">
						{{allTime}}
					</view>
				</view>
				<!-- 下排图标 -->
				<view class="btn-groups flex-box">
					<!-- 播放模式 -->
					<view class="flex-item" @click="setPlayModel">
						<view v-if="playModel==2" class="iconfont playStyle">
							&#xea76;
						</view>
						<view v-if="playModel==1" class="iconfont playStyle">
							&#xea77;
						</view>
						<view v-if="playModel==0" class="iconfont playStyle">
							&#xea75;
						</view>
					</view>
					<!-- 上一曲 -->
					<view class="flex-item" @click="prevPlay">
						<view class="iconfont">
							&#xe63c;
						</view>
					</view>
					<!-- 暂停\播放 -->
					<view class="play-btn" @click="play">
						<view v-if="playState===1" class="iconfont">
							&#xe629;
						</view>
						<view v-if="playState===0" class="iconfont">
							&#xe624;
						</view>
					</view>
					<!-- 下一曲 -->
					<view class="flex-item" @click="nextPlay">
						<view class="iconfont">
							&#xe63d;
						</view>
					</view>
					<!-- 菜单 -->
					<view class="flex-item" @click="goBackTo">
						<view class="iconfont menu">
							&#xea6f;
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		reqGetSongUrl,
		reqGetSongDetail
	} from '@/apis/index.js'
	import {
		mapState
	} from 'vuex'
	let innerAudioContext = null;
	export default {
		data() {
			return {
				playState: 0, //播放转态
				curPlayIndex: 0, //当前播放索引
				curPlayTime: 0, //当前播放时间
				curId: 0,
				curSongItem: {},
				playTime: 0, //音乐播放时长
				audioList: [], //音乐列表
				playModel: 0, //播放模式  0-列表循环 1-随机播放 2-单曲循环
				disabled: 0,
				isTitleRoll:false,
			};
		},
		computed: {
			...mapState(['playMuscicList']),
			bgStyle() {
				return `background-image:url(${this.curSongItem.picUrl})`
			},
			//进度条前面的时间,开始时间
			curPlayTimeNum() {
				return this.$pubFn.formatTime(this.curPlayTime)
			},
			//总时长
			allTime() {
				return this.$pubFn.formatTime(this.playTime)
			},

		},
		
		onLoad(option) {
			this.curPlayIndex = option.index;
			this.playInit();
			this.audioList = this.playMuscicList;		
		},
		methods: {
			//初始化
			playInit() {
				const curAudio = this.playMuscicList[this.curPlayIndex] || this.playMuscicList[0];
				this.curId = curAudio.id;
				this.curPlayTime = 0;
				//获取音乐文件
				this.getData();
				this.getTextWidth();
			},
			//获取文章标题的长度(px),长度大于110的设置为滚动标题，小于110的不滚动
			getTextWidth() {
				//初始化的时候可能会有一些加载顺序问题，获取到的标题长度不一样，所以设置一个定时器每0.1秒获取一次标题长度
				let timer = setInterval(()=>{
					let str = this.curSongItem.name;
					let width = 0;
					let html = document.createElement('span');
					html.innerText = str;
					html.className = 'getTextWidth';
					document.querySelector('body').appendChild(html);
					width = document.querySelector('.getTextWidth').offsetWidth;
					document.querySelector('.getTextWidth').remove();
					if (width >= 110) {
						this.isTitleRoll = true;
					} else {
						this.isTitleRoll = false;
					}
				},100)
				//一秒后清除定时器
				setTimeout(()=>{
					clearInterval(timer)
				},1000)		
			},
			//返回
			goBackTo() {
				uni.navigateBack()
			},
			//获取音乐url, 详情  同时调用多个接口
			async getData() {
				let [detail, url] = await Promise.all([
					//根据id获取详情
					reqGetSongDetail({
						ids: this.curId
					}).then(res => {
						//改造数据结构  把多个人名合并
						var songs = res.songs[0];
						var singer = songs.ar.map(art => {
							return art.name;
						})[0]
						return {
							name: songs.al.name,
							picUrl: songs.al.picUrl,
							singer: singer
						}
					}),
					//根据id获取url
					reqGetSongUrl({
						id: this.curId,
						level: 'higher'
					}).then(res => {
						// console.log("url:", res)
						let src = res.data[0].url;
						if (!src) {
							uni.showToast({
								title: "歌曲已下架"
							})
							return false;
						}
						return {
							src: res.data[0].url
						}
					})
				]);
				this.curSongItem = {
					...detail,
					...url
				}
				if (url) {
					this.setAudio();
				} else {
					uni.showToast({
						title: '歌曲已下架'
					})
				}

			},
			// 设置播放文件
			setAudio() {
				//如果之前存在实例，则销毁
				if (innerAudioContext) {
					// #ifdef H5
					innerAudioContext.destroy();
					// #endif
					innerAudioContext = '';
				}
				// 创建实例 H5中
				// #ifdef H5
				innerAudioContext = uni.createInnerAudioContext()
				// #endif
				// 创建实例 非H5中
				// #ifndef H5
				innerAudioContext = uni.getBackgroundAudioManager() //App在后台时，仍然在播放音乐,如果你不需要在App切后台时继续播放，那么不应该使用本API
				innerAudioContext.title = this.curSongItem.name;
				innerAudioContext.singer = this.curSongItem.singer;
				innerAudioContext.coverImgUrl = this.curSongItem.picUrl;
				//#endif
				innerAudioContext.src = this.curSongItem.src;
				innerAudioContext.autoplay = true;
				// 获取音乐时长,可能读的时候音乐还没准备好，所以要一直进行读取
				let timer = setInterval(() => {
					this.playTime = Math.floor(innerAudioContext.duration || 0); //获取歌曲时长(取整)
					if (this.playTime) {
						clearInterval(timer) //清除定时器
					}
				}, 100)
				//监听事件
				innerAudioContext.onPlay(() => {
					this.playState = 1;
				})
				innerAudioContext.onPause(() => {
					this.playState = 0;
				})
				innerAudioContext.onEnded(() => {
					if (this.playModel == 0) {
						this.nextPlay();
					} else if (this.playModel == 1) {
						this.curPlayIndex = Math.floor(Math.random() * 10) % this.audioList.length;
						this.playInit();
					} else {
						this.playInit();
					}
					// console.log("播放结束，自动播放下一首")
				})
				//监听进度条,使用的是自带的onTimeUpdate方法
				innerAudioContext.onTimeUpdate(() => {
					this.curPlayTime = Math.floor(innerAudioContext.currentTime)
				})
			},
			// 播放暂停
			play() {
				if (this.playState === 1) {
					innerAudioContext.pause();
				}
				if (this.playState === 0) {
					innerAudioContext.play();
				}
			},
			//控制进度条
			sliderChange(e) {
				this.curPlayTime = e.detail.value;
				innerAudioContext.seek(this.curPlayTime);
			},
			//下一首
			nextPlay() {
				if (this.curPlayIndex >= (this.audioList.length - 1)) {
					this.curPlayIndex = 0
				} else {
					this.curPlayIndex++;
				}
				this.playInit();
			},
			//上一首
			prevPlay() {
				if (this.curPlayIndex < 1) {
					this.curPlayIndex = this.audioList.length - 1
				} else {
					this.curPlayIndex = this.curPlayIndex - 1
				}
				this.playInit();
			},
			//播放模式
			setPlayModel() {
				this.playModel = this.playModel > 1 ? 0 : this.playModel + 1;
				uni.showToast({
					icon: 'none',
					title: ['列表循环', '随机播放', '单曲循环'][this.playModel]
				});
			},

		}
	}
</script>

<style lang="scss">
	.bg {
		position: fixed;
		z-index: 0;
		right: 0;
		left: 0;
		height: 100%;
		width: 100%;
		filter: blur(40rpx);
		background: inherit;
		z-index: -1;
		transform: scale(1.5);
	}

	.back {
		z-index: 999;
		position: fixed;
		top: 10rpx;
		left: 10rpx;
		font-size: 50rpx;
		color: #fff;
	}

	.songName {
		text-align: center;
		width: 200rpx;
		height: 50rpx;
		line-height: 50rpx;
		white-space: nowrap;
		overflow: hidden;
		font-size: 30rpx;
		position: fixed;
		top: 15rpx;
		left: 275rpx;
		color: #fff;


	}

	.songTitle {
		animation: wordsLoop 5s linear infinite;
		-webkit-animation: wordsLoop 5s linear infinite;
	}

	@keyframes wordsLoop {
		0% {
			transform: translatex(100%);
			-webkit-transform: translatex(100%);
		}

		100% {
			transform: translatex(-100%);
			-webkit-transform: translatex(-100%);
		}
	}

	.play-page {
		position: fixed;
		right: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.slider-bar {
		color: rgba(255, 255, 255, .6);
		padding: 20rpx 0;
		justify-content: space-between;

		.line {
			margin: 0;
			border-radius: 2rpx;
		}

		.time {
			height: 36rpx;
			width: 80rpx;
			margin-right: 10rpx;
			font-size: 36rpx;
			line-height: 76rpx;
			transform: scale(0.5) translateY(-50%);
		}
	}

	.strip-box {
		position: absolute;
		width: 100%;
		top: 142rpx;
		/* #ifdef H5 */
		top: 0rpx;
		/* #endif */
		height: 329rpx;
		z-index: 100;
		transform: rotate(-30deg);
		transform-origin: center 0;
		transition: transform 0.3s;

		&:before {
			position: absolute;
			content: "";
			top: -20rpx;
			left: 350rpx;
			width: 48rpx;
			height: 48rpx;
			border-radius: 48rpx;
			background: #fff;
			z-index: 100;
		}

		&.active {
			transform: rotate(0deg);
		}

		.img {
			width: 220rpx;
			height: 330rpx;
			margin-left: 340rpx;
		}
	}

	.play-poster {
		margin: 310rpx auto 0;
		/* #ifdef H5 */
		margin-top: 130rpx;

		/* #endif */
		.poster-box {
			display: flex;
			width: 616rpx;
			height: 616rpx;
			margin: 0 auto;
			background: url(https://s3.music.126.net/mobile-new/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48=) center center no-repeat;
			background-size: 100%;
			align-items: center;
			justify-content: center;
			animation: circling 20s linear infinite;

			&.pause {
				animation-play-state: paused;
			}
		}

		.img {
			display: block;
			margin: 0 auto;
			width: 382rpx;
			height: 382rpx;
			border: solid 16rpx rgba(0, 0, 0, .15);
			border-radius: 50%;
		}
	}

	@-webkit-keyframes circling {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(1turn);
		}
	}

	.btn-groups {
		align-items: center;
		text-align: center;

		.iconfont {
			font-size: 40rpx;
		}

		.playStyle {
			font-weight: 550;
			font-size: 55rpx !important;
		}

		.menu {
			font-weight: 600;
		}



		.play-btn {
			position: relative;
			width: 120rpx;
			height: 120rpx;
			line-height: 120rpx;

			.iconfont {
				font-size: 120rpx;
			}


			// &:before {
			// 	position: absolute;
			// 	content: "";
			// 	width: 240rpx;
			// 	height: 240rpx;
			// 	border: 1px solid #fff;
			// 	border-radius: 240rpx;
			// 	transform: scale(0.5) translate(-100%, -50%);
			// 	z-index: -1;
			// }
		}
	}

	.tool-groups {
		margin-bottom: 20rpx;
		text-align: center;

		.iconfont {
			font-size: 40rpx;
		}
	}

	.title-bar {
		position: fixed;
		top: 0;
		width: 100%;
		height: 44px;
		margin-top: 20px;
		text-align: center;
		line-height: 44px;
		color: #fff;
		z-index: 100;

		.name {
			line-height: 50rpx;
			font-size: 28rpx;
		}

		.author {
			line-height: 1;
			font-size: 24rpx;
			color: rgba(255, 255, 255, .8);
		}

		.iconfont {
			width: 110rpx;
			font-size: 44rpx;
		}
	}

	.content {
		position: fixed;
		z-index: 1;
		right: 0;
		left: 0;
		height: 100%;
		width: 100%;
		color: #FFFDEF;

		.bot {
			position: fixed;
			bottom: 40rpx;
			left: 0;
			width: 100%;
			padding: 0 26rpx;
		}
	}

	.album-list {
		position: absolute;
		bottom: 0;
		background: #fff;
		border-radius: 36rpx 36rpx 0 0;
		z-index: 100;
		transition: transform 0.3s;
		transform: translateY(100%);

		&.active {
			transform: translateY(0);
		}

		.list {
			height: 500rpx;
			overflow-y: scroll;
		}

		.tit-bar {
			padding: 10rpx;
			justify-content: space-between;

			.iconfont {
				margin-left: 16rpx;
				margin-right: 16rpx;
				font-size: 40rpx;
			}

			.play {
				line-height: 80rpx;
				color: #252621;
				font-weight: 600;
				font-size: 32rpx;
			}

			.collect {
				width: 228rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 80rpx;
				color: #fff;
				background: #fb2b21;
			}
		}

		.item {
			align-items: center;
			height: 120rpx;
		}

		.con {
			padding-right: 40rpx;
			align-items: center;
			justify-content: space-between;
		}

		.num {
			width: 84rpx;
			text-align: center;
			line-height: 120rpx;
			color: #999;
			font-size: 24rpx;

			&.on {
				color: #ff3a3a;
			}
		}

		.tit {
			margin-right: 20rpx;
			color: #333;
			line-height: 48rpx;
			font-size: 32rpx;
		}

		.count {
			margin-right: 20rpx;
			color: #ccc;
			line-height: 48rpx;
			font-size: 24rpx;
			transform: scale(0.84);
		}

		.icon {
			width: 56rpx;
			height: 20rpx;
		}

		.desc {
			color: #999;
			font-size: 24rpx;
			line-height: 40rpx;
		}

		.close {
			position: relative;
			height: 50px;
			line-height: 50px;
			text-align: center;

			&:before {
				position: absolute;
				content: "";
				top: 0;
				left: 0;
				width: 100%;
				border-top: 1px solid #ddd;
				transform: scaleY(0.5);
			}
		}
	}
</style>
