<template>
	<view class="flex-column hm">
		<view class="top">
			<image src="../../static/back.png" class="back" @click="back()"></image>
			<input :placeholder="showKeyword" maxlength="20" confirm-type="search" v-model="keyword" @confirm="search()" />
			<image src="../../static/clear.png" class="clear" @click="keyword=''" v-if="keyword"></image>
		</view>

		<view class="flex-column" v-show="!search_ing">
			<view class="history" v-show="historyKey.length > 0">
				<text>历史</text>
				<scroll-view scroll-x="true" style="white-space: nowrap;width: 0;flex: 1;margin: 0 15rpx;">
					<view class="history_list">
						<view v-for="(item,index) in historyKey" class="item" :key="index" @click="clickKey(item)">{{item}}</view>
					</view>
				</scroll-view>
				<image src="../../static/clear2.png" @click="show_clear = true"></image>
			</view>

			<view class="row">热搜榜</view>
			<view class="list">
				<view v-for="(item,index) in hotWord" :key="index" class="item" @click="clickKey(item.searchWord)">
					<text class="no" :style="index < 3 ? 'color:#f00;':''">{{index+1}}</text>
					<text class="title text_over" :style="index < 3 ? 'color:#333;font-weight:bold;':''">{{item.searchWord}}</text>
				</view>
			</view>
		</view>

		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :fixed="false" :enablePullDown="false" style="height: 0;flex: 1;"
		 v-show="search_ing">
			<view class="song_list">
				<view class="play" @click="playAll(0)">
					<image src="../../static/play3.png"></image>
					播放全部
				</view>
				<waves v-for="(item,index) in songs">
					<view class="item" @click="clickSong(item)">
						<view class="title">
							<view class="text_over" v-html="getName(item.name)"></view>
							<view class="text_over" style="color: #999999;" v-if="item.alias.length > 0">({{getAlias(item.alias)}})</view>
						</view>
						<view class="name text_over">
							<view class="sq">SQ</view>
							<text>{{getArtists(item.artists)}}</text>
							<view v-if="item.album" class="flex-row center">
								<text style="margin: 0 6rpx;">-</text>
								<view v-html="getName(item.album.name)"></view>
							</view>
						</view>
						<image class="more" src="../../static/more.png"></image>
					</view>
				</waves>
			</view>
			<!-- 使用插槽自定义空白布局 -->
			<div slot="empty">
				<emptyView></emptyView>
			</div>
		</s-pull-scroll>

		<view class="mask" @click.stop="show_suggest=false" @touchmove.stop.prevent="" v-if="show_suggest">
			<view class="suggest">
				<view class="item" style="color: #55aaff;">搜索 “{{keyword}}”</view>
				<view class="item" v-for="(item,index) in suggestData" @click="clickKey(item.keyword)">
					<image src="../../static/search.png"></image>
					<text class="text_over_2line">{{item.keyword}}</text>
				</view>
			</view>
		</view>

		<u-modal v-model="show_play_all" :show-cancel-button="true" :mask-close-able="true" content="“播放全部”将会替换当前的播放列表，是否继续?"
		 title="替换播放列表" @confirm="playAll(1)"></u-modal>

		<u-modal v-model="show_clear" :show-cancel-button="true" :mask-close-able="true" content="确定清空全部历史记录?" :show-title="false"
		 @confirm="clearHistory()"></u-modal>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				showKeyword: '',
				keyword: '',
				hotWord: '',
				search_ing: false,
				songs: [],
				search_key: '',
				suggestData: '',
				show_suggest: false,
				show_play_all: false,
				is_set_key: false,
				historyKey: [],
				show_clear: false
			};
		},
		watch: {
			keyword(v1, v2) {
				if (this.is_set_key) {
					this.is_set_key = false
					return
				}

				if (v1) {
					this.getSearchSuggest()
				} else {
					this.show_suggest = false
				}
			}
		},
		methods: {
			back() {
				if (this.search_ing) {
					this.keyword = ''
					this.search_ing = false
					this.songs = []
					this.search_key = ''
				} else {
					uni.navigateBack()
				}
			},
			getDefaultKeyword() {
				this.$http({
					url: 'search/default',
				}).then(res => {
					this.showKeyword = res.data.realkeyword
				})
			},
			getSearchHot() {
				this.$http({
					url: 'search/hot/detail',
				}).then(res => {
					this.hotWord = res.data
				})
			},
			getSearchSuggest() {
				this.$http({
					url: 'search/suggest',
					data: {
						keywords: this.keyword,
						type: 'mobile'
					},
					cache: false
				}).then(res => {
					this.suggestData = res.result.allMatch
					this.show_suggest = true
				})
			},
			search() {
				if (!this.keyword && !this.showKeyword) {
					this.$toast.show('请输入搜索关键字')
					return
				}

				this.$refs.pullScroll.page = 1
				this.search_key = this.keyword ? this.keyword : this.showKeyword
				this.search_ing = true
				this.show_suggest = false
				this.getData()
				this.saveKey()
			},
			getData() {
				this.$http({
					url: 'search',
					data: {
						limit: 20,
						keywords: this.search_key,
						offset: this.songs.length
					},
					cache: false
				}).then(res => {
					if (res.code == 200) {
						if (this.$refs.pullScroll.page == 1) {
							this.songs = res.result.songs
						} else {
							this.songs.push(...res.result.songs)
						}
						if (res.result.songCount > this.songs.length) {
							this.$refs.pullScroll.success()
						} else {
							this.$refs.pullScroll.finish()
						}
					} else {
						this.$refs.pullScroll.error()
					}

					if (this.songs.length == 0) {
						this.$refs.pullScroll.empty()
					}

				})
			},
			refresh() {
				this.$nextTick(() => {
					this.$refs.pullScroll.page = 1
					this.getData()
				});
			},
			pullDown(pullScroll) {
				setTimeout(() => {
					this.getData()
				}, 1000);
			},
			loadData(pullScroll) {
				setTimeout(() => {
					this.getData()
				}, 500);
			},
			clickKey(key) {
				this.search_ing = true
				this.is_set_key = true
				this.keyword = key
				this.search()
			},
			getName(name) {
				let n = ''
				let str = name
				while (str.indexOf(this.search_key) > -1) {
					let i = str.indexOf(this.search_key)
					if (i > 0) n = n + str.substring(0, i)
					n = n + '<text style="color:#55aaff">' + this.search_key + '</text>'
					str = str.substring(i + this.search_key.length)
				}

				n = n + str
				return n
			},
			getAlias(alias) {
				if (alias) {
					if (alias.length == 1) {
						return alias[0]
					} else if (alias.length > 1) {
						let names = ""
						alias.map(item => {
							names = names + "/" + item
						})
						return names.substring(1)
					}
				}
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
			clickSong(item) {
				this.$http({
					url: 'check/music',
					data: {
						id: item.id
					},
					filter: false,
					cache: false
				}).then(res => {
					if (res.success) {
						uni.navigateTo({
							url: '../music/playmusic?id=' + item.id
						})
					} else {
						this.$toast.show(res.message)
					}
				})
			},
			playAll(type) {
				if (type == 0) {
					if (getApp().globalData.local_songs.length == 0) {
						this.playAll(1)
					} else {
						this.show_play_all = true
					}
				} else {
					let list = []
					this.songs.forEach(item => {
						list.push({
							url: {
								id: item.id,
								url: "https://music.163.com/song/media/outer/url?id=" + item.id + ".mp3"
							},
							detail: null,
							lyric: null
						})
					})
					getApp().globalData.local_songs = list
					uni.navigateTo({
						url: '../music/playmusic'
					})
					uni.setStorage({
						key: 'local_songs',
						data: JSON.stringify(list)
					})
				}
			},
			clearHistory() {
				this.historyKey = []
				uni.removeStorage({
					key: "historyKey"
				})
			},
			saveKey() {
				let index = this.historyKey.indexOf(this.search_key)
				if (index > -1) {
					this.historyKey.splice(index, 1)
				}
				this.historyKey.splice(0, 0, this.search_key)

				uni.setStorage({
					key: "historyKey",
					data: JSON.stringify(this.historyKey)
				})
			}
		},
		onLoad() {
			this.getDefaultKeyword()
			this.getSearchHot()

			let that = this
			uni.getStorage({
				key: "historyKey",
				success: res => {
					let array = JSON.parse(res.data)
					if (array) {
						that.historyKey = array
					}
				}
			})
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
		height: 100%;
	}

	.top {
		display: flex;
		align-items: center;
		margin-top: 30rpx;
		position: relative;

		.back {
			width: 50rpx;
			height: 50rpx;
			margin-left: 20rpx;
		}

		.clear {
			width: 35rpx;
			height: 35rpx;
			position: absolute;
			right: 60rpx;
			top: 50%;
			transform: translateY(-50%);
		}

		input {
			width: 0;
			flex: 1;
			margin: 0 45rpx 0 20rpx;
			font-size: 32rpx;
			color: #333;
			border-bottom: 1rpx solid #666;
			padding: 15rpx 10rpx;
		}
	}

	.history {
		width: 90%;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-weight: bold;
		padding-top: 30rpx;
		margin-left: 50%;
		transform: translateX(-50%);
		align-items: center;

		.history_list {
			width: 100%;
			display: flex;

			.item {
				font-size: 28rpx;
				font-weight: normal;
				color: #666;
				padding: 3rpx 18rpx;
				box-sizing: border-box;
				background: #eee;
				border-radius: 20rpx;
				margin: 0 7rpx;
			}
		}

		image {
			width: 35rpx;
			height: 35rpx;
		}
	}

	.row {
		width: 90%;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		font-weight: bold;
		padding: 25rpx 0;
		border-bottom: 1rpx solid #eee;
		margin-left: 50%;
		transform: translateX(-50%);
		justify-content: space-between;

	}

	.list {
		display: flex;
		flex-wrap: wrap;
		width: 90%;
		margin-left: 50%;
		transform: translateX(-50%);
		padding-top: 10rpx;

		.item {
			width: 50%;
			height: 65rpx;
			display: flex;
			align-items: center;

			.no {
				width: 45rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: #999999;
			}

			.title {
				font-size: 30rpx;
				color: #666;
			}
		}
	}

	.song_list {
		display: flex;
		flex-direction: column;

		.play {
			display: flex;
			align-items: center;
			font-size: 32rpx;
			font-weight: bold;
			margin: 30rpx 0 10rpx;

			image {
				width: 50rpx;
				height: 50rpx;
				margin-left: 25rpx;
				margin-right: 15rpx;
			}
		}

		.item {
			width: 100%;
			height: 120rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 30rpx;
			padding-right: 70rpx;
			box-sizing: border-box;
			position: relative;

			.title {
				display: flex;
				font-size: 30rpx;
			}

			.more {
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 20rpx;
			}

			.name {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #999999;
				margin-top: 10rpx;

				.sq {
					padding: 1rpx 4rpx;
					border: 1rpx solid #f00;
					border-radius: 8rpx;
					box-sizing: border-box;
					color: #f00;
					transform: scale(0.7)
				}
			}
		}
	}

	.mask {
		position: fixed;
		left: 0;
		right: 0;
		top: 120rpx;
		bottom: 0;

		.suggest {
			width: 650rpx;
			min-height: 400rpx;
			max-width: 800rpx;
			background: #FFFFFF;
			border-radius: 5rpx;
			box-shadow: #ccc 0rpx 0rpx 10rpx;
			margin-left: 50rpx;
			display: flex;
			flex-direction: column;

			.item {
				width: 100%;
				height: 90rpx;
				display: flex;
				align-items: center;
				color: #666;
				font-size: 30rpx;
				padding: 0 35rpx;
				box-sizing: border-box;
				border-bottom: 1rpx solid #eee;

				image {
					width: 38rpx;
					min-width: 38rpx;
					height: 38rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
