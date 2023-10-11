<template>
	<view class="flex-column">

		<navigationBar title="重置密码"></navigationBar>

		<text class="tip">请设置登录密码，8-20位字符，至少包含字母/数字/符号2种组合</text>

		<view class="input">
			<input placeholder="请输入密码" v-model="pwd" maxlength="30" confirm-type="done" @confirm="next()" :password="true" />
			<image src="../../static/delete.png" v-show="pwd" @click="pwd = ''"></image>
		</view>

		<u-button class="button" :hair-line="false" @click="next()" type="error" shape="circle" :disabled="!checkPwd(pwd)">{{type == 1 ? '注册' : '重置'}}</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1, //1注册 2修改密码
				phone: '',
				pwd: '',
				code: ''
			};
		},
		methods: {
			next() {
				this.$http({
					url: 'register/cellphone',
					cache: false,
					data: {
						captcha: this.code,
						phone: this.phone,
						password: this.pwd
					}
				}).then(res => {
					this.login()
				});
			},
			login() {
				this.$http({
					url: 'login/cellphone',
					cache: false,
					data: {
						phone: this.phone,
						password: this.pwd
					}
				}).then(res => {
					uni.setStorageSync("phone", this.phone)
					uni.setStorageSync("pwd", this.pwd)

					uni.navigateBack({
						delta: 10
					})
				});
			},
			checkPwd: (pwd) => {
				if (!(/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,}$/.test(pwd))) {
					return false;
				} else {
					return true
				}
			}
		},
		onLoad(e) {
			this.code = e.code
			this.phone = e.phone
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.tip {
		width: 90%;
		margin-left: 50%;
		transform: translateX(-50%);
		margin-top: 80rpx;
		font-size: 28rpx;
		color: #999999;
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
