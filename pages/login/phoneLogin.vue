<template>
	<view class="flex-column">
		
		<navigationBar title="手机登录"></navigationBar>
		
		<text style="margin: 50rpx 0 0 30rpx;font-size: 36rpx;">登录体验更多精彩</text>
		<text style="margin: 10rpx 0 0 30rpx;font-size: 28rpx;color: #666;">未注册手机登录后将自动创建账号</text>

		<view class="input">
			<input placeholder="请输入手机号码" type="number" v-model="phone" maxlength="11" confirm-type="next" @confirm="next()" />
			<image src="../../static/delete.png" v-show="phone" @click="phone = ''"></image>
		</view>

		<u-button class="button" :hair-line="false" @click="next()" type="error" shape="circle" :disabled="!checkPhone(phone)">下一步</u-button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				verifyPhone: false
			};
		},
		methods: {
			next() {
				this.$http({
					url: 'cellphone/existence/check',
					cache:false,
					data: {
						phone: this.phone
					}
				}).then(res => {
					if (res.exist == 1) {
						//登录
						uni.navigateTo({
							url: './loginPwd?phone=' + this.phone
						})
					} else {
						//注册
						uni.navigateTo({
							url: `./loginCode?type=1&phone=${this.phone}`
						})
					}
				});
			},
			checkPhone: (phone) => {
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
					return false;
				} else {
					return true
				}
			},
		},
		onLoad() {
			let phone = uni.getStorageSync("phone")
			if (phone) this.phone = phone
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.input {
		width: 90%;
		height: 80rpx;
		margin-top: 50rpx;
		margin-left: 50%;
		transform: translateX(-50%);
		border-bottom: 1rpx solid #666;
		display: flex;
		justify-content: space-between;
		align-items: center;

		input {
			font-size: 32rpx;
			padding-left: 10rpx;
		}

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.button {
		width: 90%;
		height: 80rpx;
		margin-top: 80rpx;
		margin-left: 50%;
		transform: translateX(-50%);
	}
</style>
