import axios from './axios.js'
const http = (options) => {
	return new Promise((resolve, reject) => {
		if (options.loading) {
			uni.showLoading({
				title: options.tip == undefined ? '加载中...' : options.tip,
				mask: true
			})
		}
		let url = getApp().globalData.baseUrl + options.url
		if (options.cache == false) url = url + "?timestamp=" + new Date().getTime()
		let data = {
			method: options.method == undefined ? 'POST' : options.method,
			url: url,
			withCredentials: true, //关键
			data: options.data,
			header: {
				'token': getApp().globalData.token
			},
		}
		console.log("接口请求:", data);
		axios(data).then(function(res) {
			console.log("请求成功:", res);
			if (options.filter == false) {
				resolve(res.data)
			} else if (res.data.code == 200) {
				resolve(res.data)
			} else {
				let msg = res.data.msg
				let message = res.data.message
				let tip = msg ? msg : message ? message : '繁忙请重试!'
				uni.showToast({
					icon: 'none',
					title: tip,
					duration: 2500
				})
				reject(res.data)
			}
			if (options.loading) {
				uni.hideLoading()
			}
		}).catch(function(error) {
			console.log("请求失败:", error);
			let data = error.response.data
			if (options.filter == false) {
				reject(data)
			} else {
				let msg = data.msg
				let message = data.message
				let tip = msg ? msg : message ? message : '繁忙请重试!'
				uni.showToast({
					icon: 'none',
					title: tip,
					duration: 2500
				})
			}
			if (options.loading) {
				uni.hideLoading()
			}
		});
	})
}
export default http