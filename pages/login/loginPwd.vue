<template>
	<view>
		
		<navigationBar title="密码登录"></navigationBar>

		<view class="input">
			<input placeholder="请输入密码" v-model="pwd" maxlength="30" confirm-type="done" @confirm="next()" :password="true" />
			<navigator class="forget" :url="'./loginCode?type=2&phone='+this.phone">忘记密码?</navigator>
		</view>

		<u-button class="button" :hair-line="false" @click="login()" type="error" shape="circle" :disabled="!checkPwd(pwd)">登录</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				pwd: '',
				code: ''
			};
		},
		methods: {
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

	.input {
		width: 90%;
		height: 80rpx;
		margin-top: 80rpx;
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

		.forget {
			font-size: 24rpx;
			color: #55aaff;
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
