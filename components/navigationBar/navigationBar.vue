<template>
	<view style="width: 100%;">

		<view class="n_bar" :style="'background:'+bgColor">
			<view class="n_bottom">
				<view class="n_click_view" @click="left()">
					<image class="n_back" src="./back.png"></image>
				</view>
				<text class="n_title">{{title}}</text>
				<view class="n_click_view"></view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			bgColor: {
				type: String,
				default: '#D52D1E'
			},
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		},
		methods: {
			left() {
				uni.navigateBack()
			}
		},
	}
</script>

<style lang="scss">
	.n_bar {
		width: 100%;
		height: 128rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.n_bottom {
		width: 100%;
		height: 70rpx;
		display: flex;
		justify-content: space-between;

		.n_click_view {
			width: 100rpx;
			height: 100%;
		}

		.n_title {
			font-size: 36rpx;
			font-weight: 500;
			color: #FFFFFF;
		}

		.n_back {
			width: 50rpx;
			height: 50rpx;
			margin-left: 10rpx;
		}
	}
</style>
