<template>
	<view class="body">
		<swiper class="banner_swiper" :autoplay="true" :circular="true">
			<swiper-item class="banner_item" v-for="(item,index) in banners" :key="index">
				<view class="item">
					<image :src="item.pic"></image>
					<view class="tip" :style="'background:'+item.titleColor"><text style="transform: scale(0.9);">{{item.typeTitle}}</text></view>
				</view>
			</swiper-item>
		</swiper>

		<scroll-view scroll-x="true" style="white-space: nowrap;">
			<view class="menu_body">
				<view class="item" v-for="(item,index) in menus" :key="index" @click="clickMenu(item)">
					<view class="icon">
						<image :src="item.uiElement.image.imageUrl2"></image>
						<text class="day" v-if="item.resourceId == '-1'">{{new Date().getDate()}}</text>
					</view>
					{{item.uiElement.mainTitle.title}}
				</view>
			</view>
		</scroll-view>

		<view class="list_body">
			<view v-for="(item,index) in lists" :key="index" class="list">
				<view v-if="item.showType == 'HOMEPAGE_DOUBLE_PLAYLIST' || item.showType == 'HOMEPAGE_SLIDE_PLAYLIST'">
					<view class="row">
						<text class="title">{{item.uiElement.subTitle.title}}</text>
						<text class="right">更多</text>
					</view>
					<scroll-view scroll-x="true" style="white-space: nowrap;">
						<view style="display: flex;padding: 0 15rpx;">
							<view class="type1" v-for="(item,index) in item.creatives" :key="index">
								<image class="main_img" :src="item.resources[0].uiElement.image.imageUrl"></image>
								<view class="tip">
									<image src="../../static/play.png"></image><text>{{playCount(item.resources[0].resourceExtInfo.playCount)}}</text>
								</view>
								<text class="title text_over_2line">{{item.resources[0].uiElement.mainTitle.title}}</text>
							</view>
						</view>
					</scroll-view>
				</view>
<!--
				<view v-if="item.showType == 'HOMEPAGE_SLIDE_SONGLIST_ALIGN'" style="padding-top: 10rpx;">
					<text style="color: #999999;font-size: 20rpx;margin-left: 30rpx;">{{item.uiElement.mainTitle.title}}</text>
					<view class="row" style="margin-top: -10rpx;">
						<view class="flex-row center">
							<image style="height: 40rpx;width: 40rpx;margin-right: 10rpx;" src="../../static/refresh.png"></image>
							<text class="title">{{item.uiElement.subTitle.title}}</text>
						</view>
						<text class="right">更多</text>
					</view>
					<swiper style="height: 360rpx;" next-margin="60rpx">
						<swiper-item class="type5" v-for="(item,index) in item.creatives" :key="index">
							<view class="item" v-for="(item,index) in item.resources" :key="index">
								<view class="img_body">
									<image class="main_img" :src="item.uiElement.image.imageUrl"></image>
									<image class="play" src="../../static/play2.png"></image>
								</view>
								<view class="content">
									<view class="title text_over">
										<text class="song">{{item.uiElement.mainTitle.title}}</text>
										<view class="author ">{{getAuthor(item.resourceExtInfo.artists)}}</view>
									</view>
									<text class="sub" v-if="item.uiElement.subTitle">{{item.uiElement.subTitle.title}}</text>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>

				<view v-if="item.showType == 'SHUFFLE_MUSIC_CALENDAR'">
					<view class="row">
						<text class="title">{{item.uiElement.subTitle.title}}</text>
						<text class="right">今日{{item.creatives.length}}条</text>
					</view>
					<view class="type4">
						<view class="item" v-for="(item,index) in item.creatives" :key="index">
							<view class="column">
								<view class="date">
									{{getDateDetails(item.resources[0].resourceExtInfo.startTime)}}
									<view class="flex-row" v-if="item.resources[0].uiElement.labelTexts">
										<text class="great" v-for="(label,index) in item.resources[0].uiElement.labelTexts" :key="index">{{label}}</text>
									</view>
								</view>
								<text class="event">{{item.resources[0].uiElement.mainTitle.title}}</text>
							</view>
							<image class="main_img" :src="item.resources[0].uiElement.image.imageUrl"></image>
						</view>
					</view>
				</view>

				<view v-if="item.showType == 'HOMEPAGE_NEW_SONG_NEW_ALBUM'">
					<view class="row2">
						<view class="flex-row">
							<text :class="['title',index == album_index ? '' : 'active']" v-for="(item,index) in item.creatives" :key="index" @click="clickAlbum(index)">{{item.typeName}}</text>
						</view>
						<text class="right">更多</text>
					</view>
					<swiper style="height: 360rpx;" next-margin="60rpx" v-for="(item,index) in item.creatives" :key="index" v-show="index == album_index">
						<swiper-item class="type5" v-for="(item2,index) in item.creatives" :key="index">
							<view class="item" v-for="(item,index) in item2" :key="index">
								<view class="img_body">
									<image class="main_img" :src="item.uiElement.image.imageUrl"></image>
									<image class="play" src="../../static/play2.png"></image>
								</view>
								<view class="content">
									<view class="title text_over">
										<text class="song">{{item.uiElement.mainTitle.title}}</text>
										<view class="author">{{getAuthor(item.resourceExtInfo.artists)}}</view>
									</view>
									<text class="sub text_over_2line" v-if="item.uiElement.subTitle">{{item.uiElement.subTitle.title}}</text>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>

				<view v-if="item.showType == 'SLIDE_SINGLE_SONG'">
					<view class="row">
						<text class="title">{{item.uiElement.subTitle.title}}</text>
						<text class="right">更多</text>
					</view>
					<swiper style="height: 120rpx;" next-margin="60rpx">
						<swiper-item class="type5" v-for="(item,index) in item.creatives" :key="index">
							<view class="item" v-for="(item,index) in item.resources" :key="index">
								<view class="img_body">
									<image class="main_img" :src="item.uiElement.image.imageUrl"></image>
									<image class="play" src="../../static/play2.png"></image>
								</view>
								<view class="content">
									<view class="title">
										<text class="song">{{item.uiElement.mainTitle.title}}</text>
										<view class="author">{{getAuthor(item.resourceExtInfo.artists)}}</view>
									</view>
									<text class="sub" v-if="item.uiElement.subTitle">{{item.uiElement.subTitle.title}}</text>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>

				<view v-if="item.showType == 'SLIDE_PLAYABLE_DRAGON_BALL'">
					<view class="row">
						<text class="title">{{item.uiElement.subTitle.title}}</text>
						<text class="right">更多</text>
					</view>
					<scroll-view scroll-x="true" style="white-space: nowrap;">
						<view style="display: flex;padding: 0 15rpx;">
							<view class="type3" v-for="(item,index) in item.creatives" :key="index">
								<image class="main_img" :src="item.resources[0].uiElement.image.imageUrl" mode="aspectFill"></image>
								<text class="title">{{item.resources[0].uiElement.mainTitle.title}}</text>
								<image class="play" src="../../static/play2.png"></image>
							</view>
						</view>
					</scroll-view>
				</view>

				<view v-if="item.showType == 'SHUFFLE_MLOG'">
					<view class="row">
						<text class="title">{{item.uiElement.subTitle.title}}</text>
						<text class="right">更多</text>
					</view>
					<scroll-view scroll-x="true" style="white-space: nowrap;">
						<view style="display: flex;padding: 0 15rpx;">
							<view class="type6" v-for="(item,index) in item.extInfo" :key="index">
								<image class="main_img" :src="item.resource.mlogBaseData.coverUrl" mode="aspectFill"></image>
								<view class="tip">
									<image src="../../static/play.png"></image><text>{{playCount(item.resource.mlogExtVO.playCount)}}</text>
								</view>
								<text class="title text_over_2line">{{item.resource.mlogBaseData.text}}</text>
							</view>
						</view>
					</scroll-view>
				</view>

				<view v-if="item.showType == 'SLIDE_VOICELIST'">
					<view class="row">
						<text class="title">{{item.uiElement.subTitle.title}}</text>
						<text class="right">更多</text>
					</view>
					<scroll-view scroll-x="true" style="white-space: nowrap;">
						<view style="display: flex;padding: 0 15rpx;">
							<view class="type1" v-for="(item,index) in item.creatives" :key="index">
								<image class="main_img" :src="item.uiElement.image.imageUrl"></image>
								<view class="tip">
									<image src="../../static/play.png"></image><text>{{playCount(item.creativeExtInfoVO.playCount)}}</text>
								</view>
								<text class="title text_over_2line">{{item.uiElement.mainTitle.title}}</text>
							</view>
						</view>
					</scroll-view>
				</view>
				-->
			</view>

		</view>
	</view>
</template>

<script>
	import DateUtils from '../../util/DateUtils.js'
	export default {
		data() {
			return {
				banners: [],
				lists: [],
				menus: [],
				album_index: 0,
			};
		},
		methods: {
			//获取 APP 首页信息
			getHomePage() {
				this.$http({
					url: 'homepage/block/page',
				}).then(res => {
					res.data.blocks.map(item => {
						console.log(item.showType);
						if (item.showType == 'BANNER') {
							this.banners = item.extInfo.banners
						} else if (item.showType == 'DRAGON_BALL') {
							this.menus = item.creatives[0].resources
						} else if(item.showType == 'HOMEPAGE_DOUBLE_PLAYLIST' || item.showType == 'HOMEPAGE_SLIDE_PLAYLIST'){
							this.lists.push(item)
						}
						// else if (item.showType == 'HOMEPAGE_NEW_SONG_NEW_ALBUM') {
						// 	item.creatives = this.getNewAlbumNewSong(item.creatives)
						// 	this.lists.push(item)
						// } else {
						// 	this.lists.push(item)
						// }
					})
				})
			},
			getBanner() {
				this.$http({
					url: 'banner',
				}).then(res => {
					this.banners = res.banners
					// res.data.blocks.map(item => {
					// 	console.log(item.showType);
					// 	if (item.showType == 'BANNER') {
					// 		this.banners = item.extInfo.banners
					// 	} else if (item.showType == 'HOMEPAGE_NEW_SONG_NEW_ALBUM') {
					// 		item.creatives = this.getNewAlbumNewSong(item.creatives)
					// 		this.lists.push(item)
					// 	} else {
					// 		this.lists.push(item)
					// 	}
					// })
				})
			},
			getMenus() {
				this.$http({
					url: 'homepage/dragon/ball',
				}).then(res => {
					this.menus = res.data
				})
			},
			playCount(num) {
				if (num < 10000) {
					return num
				} else if (num < 100000000) {
					return Math.floor(num / 10000) + "万"
				} else {
					return Math.floor(num / 100000000) + "亿"
				}
			},
			getDateDetails(date) {
				var now = new Date();
				var d1 = Math.ceil((date - 28800000) / 86400000)
				var d2 = Math.ceil((new Date().getTime() - 28800000) / 86400000)
				if (d1 == d2) {
					return '今天'
				} else if (d1 == d2 + 1) {
					return '明天'
				} else if (d1 == d2 + 2) {
					return '后天'
				} else {
					return DateUtils.dateFormat(date, 'yyyy-MM-dd')
				}
			},
			getAuthor(artists) {
				if (artists) {
					if (artists.length == 1) {
						return '-' + artists[0].name
					} else if (artists.length > 1) {
						let names = ""
						artists.map(item => {
							names = names + "/" + item.name
						})
						return '-' + names.substring(1)
					}
				}
			},
			getNewAlbumNewSong(creatives) {
				let list = []
				let child = {
					creativeType: '',
					typeName: '',
					creatives: []
				}

				creatives.map((item, index) => {
					if (item.creativeType != child.creativeType) {
						if (child.creativeType != '') {
							list.push(child)
						}

						child = {
							creativeType: '',
							typeName: '',
							creatives: []
						}
					}

					child.creativeType = item.creativeType
					child.typeName = item.uiElement.mainTitle.title
					child.creatives.push(item.resources)
				})

				if (child.creativeType != '') {
					list.push(child)
				}

				return list
			},
			clickAlbum(index) {
				this.album_index = index
			},
			clickMenu(item) {
				if (item.url.startsWith('orpheus://')) {
					uni.navigateTo({
						url: './menus/' + item.url.substring('orpheus://'.length)
					})
				} else {
					//#ifdef H5
					window.open(item.url)
					//#endif

					//#ifndef H5
					uni.navigateTo({
						url: '../webView/webView?name=' + item.name + '&url=' + item.url
					})
					//#endif

				}

			}
		},
		created() {

		},
		mounted() {
			//this.getBanner()
			//this.getMenus()
			this.getHomePage()
		},
		onLoad() {
			console.log('find onload');
		},
		onshow() {
			console.log('find onshow');
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background: #FFFFFF;
	}

	.body {
		height: 100%;
		padding-top: 20rpx;
		padding-bottom: 50rpx;
	}

	.banner_swiper {
		width: 100%;
		height: 262.5rpx;

		.banner_item {
			display: flex;
			justify-content: center;

			.item {
				width: 90%;
				height: 100%;
				position: relative;

				image {
					width: 100%;
					height: 100%;
					border-radius: 25rpx;
				}

				.tip {
					font-size: 22rpx;
					color: #FFFFFF;
					background: #f00;
					padding: 5rpx 12rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					right: 0;
					bottom: 0;
					border-radius: 25rpx 0;
				}
			}
		}

	}

	.menu_body {
		display: flex;
		border-bottom: 1rpx solid #eee;

		.item {
			min-width: 19%;
			height: 180rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			font-weight: 500;

			.icon {
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				margin-bottom: 10rpx;
				position: relative;

				image {
					width: 90rpx;
					height: 90rpx;
					background-blend-mode: lighten;
					background-size: cover;
				}

				.day {
					font-size: 22rpx;
					color: #f00;
					font-weight: bold;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -45%);
				}
			}

		}
	}

	.list_body {
		background: #eee;
		display: flex;
		flex-direction: column;
	}

	.list {
		width: 100%;
		border-radius: 20rpx;
		background: #FFFFFF;
		padding: 30rpx 0;
		box-sizing: border-box;
		margin-bottom: 20rpx;

		.row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;
			box-sizing: border-box;

			.title {
				font-size: 34rpx;
				font-weight: bold;
			}

			.right {
				font-size: 26rpx;
				padding: 4rpx 15rpx;
				border-radius: 30rpx;
				border: 1rpx solid #eee;
			}

		}

		.row2 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 10rpx;
			box-sizing: border-box;

			.title {
				font-size: 34rpx;
				font-weight: bold;
				margin: 0 20rpx;
				position: relative;

				&::after {
					content: '';
					display: inline-block;
					width: 1rpx;
					height: 30rpx;
					background: #999;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: -20rpx;
				}

				&:nth-last-of-type(1)::after {
					display: none;
				}
			}

			.active {
				color: #999;
			}

			.right {
				font-size: 26rpx;
				padding: 4rpx 15rpx;
				border-radius: 30rpx;
				border: 1rpx solid #eee;
				margin-right: 20rpx;
			}

		}

		.type1 {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 10rpx;
			position: relative;

			.title {
				width: 200rpx;
				font-size: 22rpx;
				margin-top: 5rpx;
				white-space: normal;
			}

			.main_img {
				width: 200rpx;
				height: 200rpx;
				border-radius: 20rpx;
				border: 1rpx solid #eee;
			}

			.tip {
				position: absolute;
				right: -10rpx;
				top: 2rpx;
				background: rgba(#000, 0.5);
				display: flex;
				align-items: center;
				border-radius: 30rpx;
				padding: 2rpx 15rpx 2rpx 10rpx;
				box-sizing: border-box;
				transform: scale(0.7);

				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 5rpx;
				}

				text {
					font-size: 30rpx;
					color: #FFFFFF;
				}
			}
		}

		.type2 {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 10rpx;
			position: relative;

			.main_img {
				width: 200rpx;
				height: 300rpx;
				border-radius: 20rpx;
				border: 1rpx solid #eee;
			}

			.tip {
				position: absolute;
				right: -10rpx;
				top: 7rpx;
				background: rgba(#000, 0.5);
				display: flex;
				align-items: center;
				border-radius: 30rpx;
				padding: 2rpx 15rpx 2rpx 10rpx;
				box-sizing: border-box;
				transform: scale(0.7);

				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 5rpx;
				}

				text {
					font-size: 30rpx;
					color: #FFFFFF;
				}
			}

			.title {
				width: 200rpx;
				font-size: 30rpx;
				color: #FFFFFF;
				position: absolute;
				left: 0rpx;
				top: 55rpx;
				padding: 0 20rpx;
				box-sizing: border-box;
				white-space: normal;
			}

			.online {
				display: flex;
				position: absolute;
				left: 10rpx;
				bottom: 20rpx;

				image {
					width: 35rpx;
					height: 35rpx;
					border-radius: 50%;
					border: 1rpx solid #FFFFFF;
					margin-right: -15rpx;
				}
			}
		}

		.type3 {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 20rpx;
			position: relative;

			.main_img {
				width: 180rpx;
				height: 180rpx;
				border-radius: 50%;
				border: 1rpx solid #eee;
			}

			.play {
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				left: 70rpx;
				top: 70rpx;
			}

			.title {
				width: 180rpx;
				font-size: 28rpx;
				display: flex;
				justify-content: center;
			}

		}

		.type4 {
			display: flex;
			flex-direction: column;
			border-top: 1rpx solid #eee;
			padding: 0 30rpx;

			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #eee;
				padding: 20rpx 0;
				box-sizing: border-box;

				.column {
					display: flex;
					flex-direction: column;

					.date {
						display: flex;
						align-items: center;
						color: #999;
						font-size: 24rpx;

						.great {
							font-size: 20rpx;
							padding: 3rpx 10rpx;
							box-sizing: border-box;
							background: rgba($color: #eee, $alpha: 0.5);
							color: #ffaa00;
							margin-left: 5rpx;
							border-radius: 5rpx;
							transform: scale(0.8);
						}
					}

					.event {
						margin-top: 10rpx;
						font-size: 28rpx;
					}
				}

				.main_img {
					width: 80rpx;
					height: 80rpx;
					border-radius: 20rpx;
				}

				&:nth-last-of-type(1) {
					border: none;
					padding-bottom: 10rpx;
				}
			}
		}

		.type5 {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 30rpx;
			box-sizing: border-box;

			.item {
				width: 100%;
				display: flex;
				align-items: center;
				height: 120rpx;
				position: relative;

				.img_body {
					position: relative;
					display: flex;

					.main_img {
						width: 100rpx;
						height: 100rpx;
						border-radius: 20rpx;
					}

					.play {
						width: 30rpx;
						height: 30rpx;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}

				.content {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-left: 30rpx;
					margin-top: -10rpx;

					.title {
						display: flex;
						align-items: center;

						.song {
							font-size: 30rpx;
						}

						.author {
							font-size: 24rpx;
							color: #999999;
						}
					}

					.sub {
						color: #999999;
						font-size: 20rpx;
						margin-top: 5rpx;
					}
				}

				&::after {
					content: '';
					display: inline-block;
					height: 0.5rpx;
					background: #eee;
					position: absolute;
					left: 130rpx;
					right: 30rpx;
					bottom: 0rpx;
				}

				&:nth-last-of-type(1)::after {
					display: none;
				}
			}
		}

		&:nth-of-type(1) {
			border-top-left-radius: 0;
			border-top-right-radius: 0;
			padding-top: 10rpx;
		}
	}

	.type6 {
		display: flex;
		flex-direction: column;
		margin: 0 10rpx;
		align-items: center;
		position: relative;

		.title {
			width: 300rpx;
			font-size: 22rpx;
			margin-top: 5rpx;
			white-space: normal;
		}

		.main_img {
			width: 300rpx;
			height: 400rpx;
			border-radius: 20rpx;
			border: 1rpx solid #eee;
		}

		.tip {
			position: absolute;
			right: -10rpx;
			top: 2rpx;
			background: rgba(#000, 0.5);
			display: flex;
			align-items: center;
			border-radius: 30rpx;
			padding: 2rpx 15rpx 2rpx 10rpx;
			box-sizing: border-box;
			transform: scale(0.7);

			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 5rpx;
			}

			text {
				font-size: 30rpx;
				color: #FFFFFF;
			}
		}
	}
</style>