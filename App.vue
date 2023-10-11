<script>
	export default {
		globalData: {
			baseUrl: 'https://163api.yxa512.top/',
			token: uni.getStorageSync("token"),
			lng: 0,
			lat: 0,
			local_songs: [], //本地音乐播放列表
		},

		onLaunch: function() {
			console.log('App Launch')
			uni.getStorage({
				key: "local_songs",
				success: res => {
					console.log("local_songs success")
					let array = JSON.parse(res.data)
					if (array) {
						getApp().globalData.local_songs = array
					}
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	/*每个页面公共css */
	@import url("/util/general.css");

	page {
		background: #f3f3f3;
	}
</style>
