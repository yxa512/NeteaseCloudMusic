<template>
	<view>

		<image class="logo" src="../../static/logo_c.png"></image>

		<view class="bottom">

			<view v-if="o_phone" class="phone" @click="goPhoneLogin">{{o_phone}}
				<image src="../../static/edit.png"></image>
			</view>

			<u-button class="login" :hair-line="false" @click="login()">{{o_phone ? '一键登录' : '手机登录'}}</u-button>

			<view class="experience" @click="experience()">立即体验</view>

			<view class="third">
				<image src="../../static/wechat.png"></image>
				<image src="../../static/qq.png"></image>
				<image src="../../static/weibo.png"></image>
				<image src="../../static/netease.png"></image>
			</view>

			<view class="agreement flex-column center">
				<view class="flex-row center">
					<u-checkbox v-model="agree" active-color="red"><text style="color: #C0C0C0;">同意</text></u-checkbox>
					<navigator>《用户协议》</navigator>
					<navigator>《隐私政策》</navigator>
					<navigator>《儿童隐私政策》</navigator>
				</view>
				<navigator>《中国联通认证服务协议》</navigator>
			</view>

		</view>
	</view>
</template>

<script>
	import PhoneUtils from '../../util/PhoneUtils.js'
	export default {
		data() {
			return {
				agree: false,
				phone: '',
				o_phone: '',
				pwd: ''
			};
		},
		onLoad() {
			this.phone = uni.getStorageSync("phone")
			this.pwd = uni.getStorageSync("pwd")
			if (this.phone && this.pwd) {
				this.o_phone = PhoneUtils.omit(this.phone)
			}
		},
		methods: {
			login() {
				if (this.agree) {
					if (this.o_phone) {
						this.loginPhone()
					} else {
						this.goPhoneLogin()
					}
				} else {
					this.$toast.show('请先同意协议')
				}
			},
			loginPhone() {
				this.$http({
					url: 'login/cellphone',
					data: {
						phone: this.phone,
						password: this.pwd + "1"
					},
					cache: false
				}).then(res => {
					uni.navigateBack({
						delta: 10
					})
				}, error => {
					uni.removeStorageSync("pwd")
					this.o_phone = ''
				});
			},
			goPhoneLogin() {
				if (this.agree) {
					uni.navigateTo({
						url: './phoneLogin'
					})
				} else {
					this.$toast.show('请先同意协议')
				}
			},
			experience() {
				if (this.agree) {
					uni.navigateBack()
				} else {
					this.$toast.show('请先同意协议')
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(270deg, #D52D1E, #DD2A21)
	}

	.logo {
		width: 135rpx;
		height: 135rpx;
		margin-left: 50%;
		transform: translateX(-50%);
		margin-top: 220rpx;
	}

	.bottom {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		bottom: 30rpx;
		left: 50%;
		transform: translateX(-50%);

		.phone {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: #F0f0f0;
			margin-bottom: 40rpx;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-left: 15rpx;
			}
		}

		.login {
			width: 75%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			color: #f00;
			border: none;
			border-radius: 40rpx;
		}

		.experience {
			width: 75%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			color: #fff;
			border-radius: 40rpx;
			border: 1rpx solid #fff;
			margin-top: 30rpx;
		}

		.third {
			display: flex;
			margin-top: 50rpx;

			image {
				width: 70rpx;
				height: 70rpx;
				margin: 0 30rpx;
			}

		}

		.agreement {
			margin-top: 35rpx;
			font-size: 30rpx;
			color: rgba($color: #eee, $alpha: 0.8);
			transform: scale(0.6);
		}
	}
</style>
