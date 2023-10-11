<template>
	<view style="display: flex;" @click="send()">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			time: {
				type: Number,
				default: 60
			},
			auto: { //点击发送按钮后是否自动倒计时，预防需要进行手机号码判断
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				sending: 0, //1开始  2倒计时
				count: 60,
				interval: null,
			};
		},
		watch: {
			time: {
				handler(val, old) {
					this.count = val
				},
				immediate: true
			}
		},
		methods: {
			send() {
				if (this.sending == 2) return
				this.sending = 1
				this.state()
				if (this.auto) this.start()
			},
			start() {
				this.sending = 2
				this.state()
				this.interval = setInterval(() => {
					this.count--
					this.state()
					if (this.count == 0) {
						clearInterval(this.interval)
						this.count = this.time
						this.sending = 0
						this.state()
					}
				}, 1000)
			},
			state() {
				this.$emit("state", {
					'state': this.sending,
					'time': this.count
				})
			}
		},
		onUnload() {
			clearInterval(this.interval)
		}
	}
</script>

<style lang="scss">
</style>
