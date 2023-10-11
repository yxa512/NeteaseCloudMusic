<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				url: ''
			};
		},
		onLoad(e) {
			this.name = e.name
			this.url = e.url

			uni.setNavigationBarTitle({
				title: this.name
			})
		}
	}
</script>

<style lang="scss">

</style>
