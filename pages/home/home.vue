<template>
	<view>

		<view class="top">
			<view class="item" @click="show_left = true">
				<image src="../../static/category.png"></image>
			</view>
			<text :class="['item',current == 0 ? 'active' : '']" @click="current = 0">发现</text>
			<text :class="['item',current == 1 ? 'active' : '']" @click="current = 1">我的</text>
			<text :class="['item',current == 2 ? 'active' : '']" @click="current = 2">视频</text>
			<text :class="['item',current == 3 ? 'active' : '']" @click="current = 3">云村</text>
			<navigator class="item" url="../find/search">
				<image src="../../static/search.png"></image>
			</navigator>
		</view>

		<find v-show="current == 0"></find>
		<mine v-show="current == 1"></mine>

		<u-popup v-model="show_left" width="650rpx">
			<view class="left">
				<view class="head" @click="clickHead()">
					<image class="head_img" :src="isLogin ? profile.avatarUrl : '../../static/home_left/people.png'"></image>
					<text style="margin-right: 5rpx;">{{isLogin ? profile.nickname : '立即登录'}}</text>
					<u-icon name="arrow-right" color="#333" :top="2"></u-icon>
				</view>

				<scroll-view scroll-y="true" style="height: 0;flex: 1;">

					<view class="flex-column wm" style="align-items: center;padding-bottom: 50rpx;">

						<view class="menu">
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/message.png"></image>
										<text>我的消息</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/shell.png"></image>
										<text>云贝中心</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/create.png"></image>
										<text>创作者中心</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
						</view>

						<view class="menu">
							<text class="title">音乐服务</text>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/ticket.png"></image>
										<text>云村有票</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/mall.png"></image>
										<text>商城</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/game.png"></image>
										<text>游戏专区</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/bell.png"></image>
										<text>口袋彩铃</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
						</view>

						<view class="menu">
							<text class="title">其他</text>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/set.png"></image>
										<text>设置</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/night_mode.png"></image>
										<text>夜间模式</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/timing.png"></image>
										<text>定时关闭</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/dress.png"></image>
										<text>个性装扮</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/headset.png"></image>
										<text>边听边存</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/flow.png"></image>
										<text>在线听歌免流量</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/ban.png"></image>
										<text>音乐黑名单</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/teenagers.png"></image>
										<text>青少年模式</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/clock.png"></image>
										<text>音乐闹钟</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
						</view>

						<view class="menu">
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/order.png"></image>
										<text>我的订单</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/coupon.png"></image>
										<text>优惠券</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/help.png"></image>
										<text>帮助与反馈</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/share.png"></image>
										<text>分享网易云音乐</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
							<waves>
								<navigator class="item" hover-class="none">
									<view class="row">
										<image class="icon" src="../../static/home_left/about.png"></image>
										<text>关于</text>
									</view>
									<u-icon name="arrow-right" color="#999" :top="2"></u-icon>
								</navigator>
							</waves>
						</view>

						<u-button class="exit" :hair-line="false" @click="show_logout = true" v-if="isLogin">退出登录</u-button>

					</view>
				</scroll-view>
			</view>
		</u-popup>
		<u-modal v-model="show_logout" :show-cancel-button="true" :mask-close-able="true" content="确定退出当前账号吗?" :show-title="false"
		 @confirm="logout()"></u-modal>
	</view>
</template>

<script>
	import find from '../find/find.vue'
	import mine from '../mine/mine.vue'
	export default {
		components: {
			find,
			mine
		},
		data() {
			return {
				current: 0,
				show_left: false,
				isLogin: false,
				show_logout: false
			};
		},
		methods: {
			clickHead() {
				if (this.isLogin) {
					uni.navigateTo({
						//url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			},
			refresh() {
				this.$http({
					url: 'login/refresh',
					cache: false,
					filter: false
				}).then(res => {
					if (res.code == 200) {
						this.account()
					} else {
						this.isLogin = false
					}
				});
			},
			account() {
				this.$http({
					url: 'user/account'
				}).then(res => {
					this.isLogin = true
					this.profile = res.profile
				});
			},
			logout() {
				this.show_logout = false
				this.$http({
					url: 'logout'
				}).then(res => {
					this.isLogin = false
					this.profile = ''
				});
			},
			clickClose(index) {
				if (index == -1) {
					if (this.isLogin) {
						this.show_close = true
					} else {
						this.clickClose(0)
					}
				} else if (index == 1) {
					this.show_logout = true
				} else if (index == 0) {
					window.opener = null;
					window.close();
				}
			}
		},
		onLoad() {

		},
		onShow() {
			//this.refresh()
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
		width: 100%;
		height: 80rpx;

		.item {
			width: 0;
			flex: 1;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			color: #888;
			font-weight: 600;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.active {
			font-size: 38rpx;
			color: #333333;
			font-weight: bold;
			margin-top: -4rpx;
		}

	}

	.left {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #f0f0f0;
		align-items: center;

		.head {
			width: 100%;
			height: 100rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			font-size: 32rpx;

			.head_img {
				width: 60rpx;
				height: 60rpx;
				margin-left: 30rpx;
				margin-right: 20rpx;
				border-radius: 50%;
			}
		}

		.menu {
			width: 90%;
			background: #FFFFFF;
			border-radius: 20rpx;
			margin-top: 35rpx;

			.title {
				width: 100%;
				height: 80rpx;
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #999999;
				padding-left: 30rpx;
				border-bottom: 1rpx solid #eee;
			}

			.item {
				width: 100%;
				height: 90rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 25rpx 0 30rpx;
				box-sizing: border-box;
				font-size: 30rpx;

				.row {
					display: flex;
					align-items: center;
				}

				.icon {
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
			}
		}

		.exit {
			width: 90%;
			height: 80rpx;
			font-size: 30rpx;
			color: #f00;
			margin-top: 35rpx;
			border: none;
		}
	}
</style>
