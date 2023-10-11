<template>
	<view class="flex-column">
		<navigationBar title="验证码"></navigationBar>
		<text style="margin: 70rpx 0 0 30rpx;font-size: 36rpx;">请输入验证码</text>
		<view class="tip">
			<text>已发送至&nbsp;{{phone_o}}</text>
			<image src="../../static/edit2.png" @click="edit"></image>
			<countdownView class="send" ref="countdown" @state="countdownState" :time="120">
				{{tip}}
			</countdownView>
		</view>
		<u-message-input mode="bottomLine" :maxlength="4" width="90" font-size="50" @finish="finish" style="margin-top: 80rpx;"></u-message-input>
		<!-- <navigator class="pwd" :url="'./loginPwd?phone='+phone">密码登录</navigator> -->
	</view>
</template>

<script>
	import PhoneUtils from '../../util/PhoneUtils.js'
	export default {
		data() {
			return {
				type: 1, //1注册 2修改密码
				phone: '',
				phone_o: '',
				code: '',
				tip: '获取'
			};
		},
		methods: {
			getCode() {
				this.$http({
					url: 'captcha/sent',
					cache: false,
					data: {
						phone: this.phone
					}
				}).then(res => {
					this.$refs.countdown.start()
				});
			},
			verify() {
				this.$http({
					url: 'captcha/verify',
					cache: false,
					data: {
						phone: this.phone,
						captcha: this.code
					},
				}).then(res => {
					uni.redirectTo({
						url: `./forget?phone=${this.phone}&code=${this.code}`
					})
				});
			},
			edit() {
				uni.navigateBack({
					delta: this.type
				})
			},
			finish(e) {
				this.code = e
				this.verify()
			},
			countdownState(e) {
				if (e.state == 0) {
					this.tip = '获取'
				} else if (e.state == 1) {
					this.getCode()
				} else if (e.state == 2) {
					this.tip = e.time + "s"
				}
			},
		},
		onLoad(e) {
			this.type = e.type
			this.phone = e.phone
			this.phone_o = PhoneUtils.omit(this.phone)
			this.getCode()
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.tip {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 10rpx 40rpx 0 30rpx;
		box-sizing: border-box;
		font-size: 30rpx;
		color: #999;

		image {
			width: 35rpx;
			height: 35rpx;
			margin-left: 15rpx;
		}

		.send {
			font-size: 30rpx;
			color: #999;
			margin-left: auto;
		}
	}

	.pwd {
		width: 150rpx;
		height: 55rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		border: 1rpx solid #eee;
		border-radius: 30rpx;
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	}
</style>
