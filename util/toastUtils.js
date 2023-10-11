const toastUtils = {
	show: (title, duration = 2500) => {
		uni.showToast({
			icon: 'none',
			title: title,
			duration: duration
		})
	},

	showTimeout: (title, duration = 2500, time = 100) => {
		setTimeout(() => {
			uni.showToast({
				icon: 'none',
				title: title,
				duration: duration
			})
		}, time)
	},
}

export default toastUtils
