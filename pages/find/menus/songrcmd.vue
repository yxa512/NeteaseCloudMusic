<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			ddw(){
				this.$http({
					url: 'recommend/resource',
				}).then(res => {
					
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
