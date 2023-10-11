<template>
	<view class="body">

		<image class="bg bg-blur" v-if="musicList[play_index].detail" :src="musicList[play_index].detail.al.picUrl"></image>

		<view class="content">
			<text class="title text_over" v-if="musicList[play_index].detail">{{musicList[play_index].detail.name}}</text>
			<text class="artistsname text_over" v-if="musicList[play_index].detail">{{getArtists(musicList[play_index].detail.ar)}}</text>

			<image :class="['cover',!innerAudio.paused ? 'rotate_run' : 'rotate_pause']" v-if="musicList[play_index].detail" :src="musicList[play_index].detail.al.picUrl"
			 ref="cover"></image>

			<view class="bottom">
				<view class="menu" style="width: 80%;">
					<view class="item">
						<image style="width: 40rpx;height: 40rpx;" :src="true ? '../../static/music/shoucang2.png' : '../../static/music/shoucang.png'"
						 @click="collect"></image>
					</view>
					<view class="item">
						<image style="width: 40rpx;height: 40rpx;" :src="true ? '../../static/music/xiazai2.png' : '../../static/music/xiazai.png'"
						 @click="downloadFile"></image>
					</view>
					<view class="item">
						<button class="share" open-type="share" :plain="true">
							<image style="width: 40rpx;height: 40rpx;" src="../../static/music/share.png"></image>
						</button>
					</view>
					<view class="item">
						<image style="width: 40rpx;height: 40rpx;" src="../../static/music/add.png" @click="getNewMusic"></image>
					</view>
					<view class="item">
						<image style="width: 40rpx;height: 40rpx;" src="../../static/music/more.png" @click="show_set = true"></image>
					</view>
				</view>

				<view class="progress">
					<text>{{timeFormat(duration)}}</text>
					<slider style="width: 0;flex: 1;" :value="currentTime/duration*100" blockSize="10" activeColor="#EB0165" @change="sliderChange"
					 @changing="sliderChanging" />
					<text>{{timeFormat(currentTime)}}</text>
				</view>

				<view class="menu">
					<view class="item">
						<image style="width: 40rpx;height: 40rpx;" :src="play_type == 1 ? '../../static/music/xunhuanbofang.png' : play_type == 2 ? '../../static/music/danquxunhuan.png' : '../../static/music/suijibofang.png'"
						 @click="musicType"></image>
					</view>
					<view class="item">
						<image style="width: 60rpx;height: 60rpx;" src="../../static/music/shangyishou.png" @click="musicLast"></image>
					</view>
					<view class="item">
						<image style="width: 80rpx;height: 80rpx;" :src="play_state == 1 ? '../../static/music/zanting.png' : '../../static/music/kaishi.png'"
						 @click="musicPlay"></image>
					</view>
					<view class="item">
						<image style="width: 60rpx;height: 60rpx;" src="../../static/music/xiayishou.png" @click="musicNext"></image>
					</view>
					<view class="item">
						<image style="width: 40rpx;height: 40rpx;" src="../../static/music/yinleliebiao.png" @click="show_music_list = true"></image>
					</view>
				</view>
			</view>
		</view>

		<image class="back" src="../../static/back_white.png" @click="back()"></image>

		<!-- <view class="music_list" v-if="show_music_list" @click.stop="show_music_list = !show_music_list">
			<view class="list_body" @click.stop="">
				<view class="item" v-for="(item,index) in musicList" :key="index" @click="musicSelect(index)">
					<image class="play" v-if="play_index == index" :src="play_state == 0 ? '../../static/music/kaishi2.png' : '../../static/music/zanting2.png'"></image>
					<text class="text text_over" :style="play_index == index ? 'color:#EB0165' : ''">{{item.name}}-<text :style="'font-size: 24rpx;'+(play_index == index ? 'color:#EB0165' : 'color: #666;')">{{item.artistsname}}</text></text>
					<image class="delete" src="../../static/delete.png" @click.stop="musicDelete(item,index)"></image>
				</view>
			</view>
		</view>

		<view class="music_list" v-if="show_set" @click.stop="show_set = !show_set">
			<view class="list_body" @click.stop="" style="height: 500rpx;">
				<text style="font-size: 28rpx;margin-left: 20rpx;">新增音乐类型</text>
				<radio-group @change="radioChange">
					<label v-for="(item, index) in music_types" :key="index">
						<radio :value="item.value" :checked="index === add_music_current" style="transform: scale(0.7);" />
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
 -->
	</view>

	</view>
</template>

<script>
	import StringUtils from '../../util/StringUtils.js'
	export default {
		data() {
			return {
				innerAudio: null,
				musicList: [],
				play_index: -1,
				expect_index: -1,
				duration: 0, //歌曲时间
				currentTime: 0, //当前时间
				play_type: 1, //1循环 2单曲 3随机
				play_state: 0, //播放状态
				slider_Changing: false, //拖动进度条
				show_set: false,
			};
		},
		methods: {
			timeFormat(time) {
				time = parseInt(time)
				let z = parseInt(time / 60)
				if (z < 10) z = "0" + z
				let y = time % 60
				if (y < 10) y = "0" + y

				return z + ":" + y
			},
			sliderChange(e) {
				this.slider_Changing = false
				this.currentTime = this.duration * e.detail.value / 100
				this.innerAudio.seek(this.currentTime)
			},
			sliderChanging(e) {
				this.slider_Changing = true
				this.currentTime = this.duration * e.detail.value / 100
			},
			musicPlay() {
				if (!this.innerAudio.paused) {
					this.play_state = 0
					this.innerAudio.autoplay = false
					this.innerAudio.pause()
				} else {
					this.play_state = 1
					this.innerAudio.autoplay = true
					this.innerAudio.play()
				}
			},
			musicType() {
				if (this.play_type == 1) {
					this.play_type = 2
					this.innerAudio.loop = true
				} else if (this.play_type == 2) {
					this.play_type = 3
					this.innerAudio.loop = false
				} else {
					this.play_type = 1
					this.innerAudio.loop = false
				}
			},
			musicLast() {
				if (this.play_index < 0) return
				if (this.play_type != 3) {
					if (this.play_index == 0) {
						this.play_index = this.musicList.length - 1
					} else {
						this.play_index--
					}
				} else {
					this.play_index = this.getRandom(this.musicList.length, this.play_index)
				}

				this.cleckSong(this.play_index)
			},
			musicNext() {
				if (this.play_index < 0) return
				if (this.play_type != 3) {
					if (this.play_index == this.musicList.length - 1) {
						this.play_index = 0
					} else {
						this.play_index++
					}
				} else {
					this.play_index = this.getRandom(this.musicList.length, this.play_index)
				}

				this.cleckSong(this.play_index)
			},
			collect() {
				return
				if (this.play_index < 0) return
				this.musicList[this.play_index].like = !this.musicList[this.play_index].like
			},
			back() {
				uni.navigateBack()
			},
			getRandom(max, except) {
				let e = Math.floor(Math.random() * max)
				if (e == except) return this.getRandom(max, except)
				else return e
			},
			downloadFile() {
				return
				if (this.play_index < 0) return
				new Promise(() => {
					let that = this
					let item = that.musicList[that.play_index]
					uni.getSavedFileInfo({
						filePath: item.savePath,
						success: res => {
							that.$toast.show('已下载')
						},
						fail: err => {
							item.savePath = ''
							uni.downloadFile({
								url: StringUtils.https(item.url),
								success: (res) => {
									if (res.statusCode === 200) {
										that.$toast.show('下载成功')
										let tempFilePath = res.tempFilePath
										console.log('下载成功', tempFilePath);

										uni.saveFile({
											tempFilePath: tempFilePath,
											success: function(res) {
												var savedFilePath = res.savedFilePath;
												console.log('savedFilePath', savedFilePath);
												item.savePath = savedFilePath
												that.saveData()
											}
										});
									}
								}
							});
						},
					});
				})
			},
			saveData(index) {
				if (index > -1) {
					if (!this.musicList[index].url || !this.musicList[index].detail || !this.musicList[index].lyric) {
						return
					}
				}
				getApp().globalData.local_songs = this.musicList
				uni.setStorage({
					key: 'local_songs',
					data: JSON.stringify(this.musicList)
				})
			},
			musicSelect(index) {
				if (this.play_index == index) {
					this.musicPlay()
				} else {
					this.play_index = index
					this.innerAudio.src = this.musicList[this.play_index].url.url
				}
			},
			musicDelete(item, index) {
				let that = this
				uni.showModal({
					content: '删除歌曲 ' + item.name + '-' + item.artistsname + " ?",
					success: function(res) {
						if (res.confirm) {
							that.musicList.splice(index, 1)
							if (index == that.play_index) {
								that.play_index--
								that.musicNext()
							} else if (index < that.play_index) {
								that.play_index--
							}
						}
					}
				})
			},
			getSongUrl(id, index) {
				this.$http({
					url: 'song/url',
					data: {
						id: id
					},
					cache: false
				}).then(res => {
					if (res.data.length > 0) {
						this.musicList[index].url = res.data[0]
						if (this.expect_index == index) {
							this.expect_index = -1
							this.play_state = 1
							this.play_index = index
							this.innerAudio.src = this.musicList[this.play_index].url.url
							this.innerAudio.autoplay = true
							this.innerAudio.play()
						}
						this.saveData(index)
					}
				})
			},
			getSongDetail(id, index) {
				this.$http({
					url: 'song/detail',
					data: {
						ids: id + ""
					},
					cache: false
				}).then(res => {
					if (res.songs.length > 0) {
						this.musicList[index].detail = res.songs[0]
						this.saveData(index)
					}
				})
			},
			getSongLyric(id, index) {
				this.$http({
					url: 'lyric',
					data: {
						id: id
					},
					cache: false
				}).then(res => {
					//this.musicList[index].lyric = res.lrc.lyric.split("\n")
					this.saveData(index)
				})
			},
			getArtists(artists) {
				if (artists) {
					if (artists.length == 1) {
						return artists[0].name
					} else if (artists.length > 1) {
						let names = ""
						artists.map(item => {
							names = names + "/" + item.name
						})
						return names.substring(1)
					}
				}
			},
			cleckSong(index) {
				this.play_index = index
				this.innerAudio.src = this.musicList[index].url.url
				this.innerAudio.autoplay = true
				this.innerAudio.play()

				if (!this.musicList[index].detail) this.getSongDetail(this.musicList[index].url.id, index)
				if (!this.musicList[index].lyric) this.getSongLyric(this.musicList[index].url.id, index)
			}
		},
		onLoad(e) {

			this.innerAudio = uni.createInnerAudioContext();
			this.innerAudio.onError((res) => {
				console.log(res.errCode, res.errMsg);
				if (10004 == res.errCode) {
					this.$toast.show("格式错误")
					setTimeout(() => {
						this.musicNext()
					}, 1500)
				}
			});
			this.innerAudio.onEnded(() => {
				if (this.play_type != 2) {
					this.musicNext()
				}
			})
			this.innerAudio.onCanplay(() => {
				this.duration = this.innerAudio.duration
			})
			this.innerAudio.onTimeUpdate(() => {
				if (this.slider_Changing) return
				this.currentTime = this.innerAudio.currentTime
			})

			this.musicList = getApp().globalData.local_songs
			let id = e.id
			console.log("musicList.length = " + this.musicList.length + "  id = " + id);
			if (id > 0) {
				let exist = -1
				this.musicList.map((item, index) => {
					//判断该音乐是否存在列表中
					if (item.url && item.url.id == id) {
						exist = index
					}
				})
				if (exist > -1) {
					//存在直接播放
					this.cleckSong(exist)
				} else {
					//不存在网络请求url详情等
					this.musicList.push({
						url: {
							id: id,
							url: "https://music.163.com/song/media/outer/url?id=" + id + ".mp3"
						},
						detail: null,
						lyric: null
					})
					this.cleckSong(this.musicList.length - 1)
				}
			} else {
				this.expect_index = 0;
				this.musicList.forEach((item, index) => {
					if (this.expect_index == index) {
						this.cleckSong(index)
					} else {
						this.getSongDetail(item.url.id, index)
						this.getSongLyric(item.url.id, index)
					}
				})
			}

		},
		onUnload() {
			this.innerAudio.destroy()
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background: #000;
	}

	.body {
		height: 100%;

		.bg {
			width: 100%;
			height: 100%;
		}

		.bg-blur {
			float: left;
			width: 100%;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			-webkit-filter: blur(15px);
			-moz-filter: blur(15px);
			-o-filter: blur(15px);
			-ms-filter: blur(15px);
			filter: blur(15px);
		}
	}

	.content {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20rpx;

		.title {
			font-size: 34rpx;
			color: #FFFFFF;
			text-align: center;
			width: 70%;
			margin-top: 40rpx;
		}

		.artistsname {
			font-size: 28rpx;
			color: #FFFFFF;
			margin-top: 10rpx;
			text-align: center;
			width: 70%;
		}

		.cover {
			width: 600rpx;
			height: 600rpx;
			border-radius: 50%;
			margin-top: 100rpx;
			box-shadow: #666 0 0 15rpx;
			animation: rotate 10s linear infinite;
		}

		.rotate_pause {
			animation-play-state: paused;
		}

		.rotate_run {
			animation-play-state: running;
		}

		.bottom {
			width: 100%;
			height: 0;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-end;
			padding-bottom: 55rpx;

			.progress {
				width: 90%;
				display: flex;
				align-items: center;
				font-size: 20rpx;
				margin-top: 20rpx;
				color: #FFFFFF;
			}

			.menu {
				width: 100%;
				display: flex;
				align-items: center;

				.item {
					width: 0;
					flex: 1;
					display: flex;
					justify-content: center;
				}

				.share {
					border: none;
					box-shadow: none;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}

	}

	.back {
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		left: 30rpx;
		top: 60rpx;
	}

	.music_list {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba($color: #000000, $alpha: 0.5);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		padding-bottom: 30rpx;

		.list_body {
			width: 88%;
			height: 700rpx;
			padding: 20rpx 10rpx;
			background: #FFFFFF;
			box-shadow: #666 0 0 10rpx;
			border-radius: 30rpx;

			.item {
				width: 94%;
				height: 80rpx;
				margin-left: 3%;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				border-bottom: 1rpx solid rgba($color: #eee, $alpha: 0.5);

				.play {
					width: 30rpx;
					height: 30rpx;
					margin-left: 10rpx;
				}

				.text {
					flex: 1;
					width: 0;
					font-size: 28rpx;
					color: #333;
					padding: 0 15rpx;
					font-weight: 500;
				}

				.delete {
					width: 35rpx;
					height: 35rpx;
					padding: 10rpx;
				}
			}
		}
	}

	radio-group {
		display: flex;
		padding-top: 10rpx;
		flex-wrap: wrap;

		label {
			padding: 0 10rpx;
			font-size: 26rpx;
			color: #777;
			display: flex;
			align-items: center;
		}
	}

	/* 
	  rotate : 定义的动画名称
	  1s : 动画时间
	  linear : 动画以何种运行轨迹完成一个周期
	  infinite :规定动画应该无限次播放
	 */
	@keyframes rotate {
		0% {
			-webkit-transform: rotate(0deg);
		}

		25% {
			-webkit-transform: rotate(90deg);
		}

		50% {
			-webkit-transform: rotate(180deg);
		}

		75% {
			-webkit-transform: rotate(270deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
		}
	}
</style>
