/**
 * for vue: 日期格式化
 **/
const DateUtils = {
	dateFormat(value, format) {
		var date
		if (typeof(value) == "undefined" || value == null || value == '') {
			date = new Date();
		} else {
			date = new Date(value);
		}

		format = format || 'yyyy-MM-dd hh:mm:ss';
		var o = {
			"M+": date.getMonth() + 1, //month
			"d+": date.getDate(), //day
			"h+": date.getHours(), //hour
			"m+": date.getMinutes(), //minute
			"s+": date.getSeconds(), //second
			"q+": Math.floor((date.getMonth() + 3) / 3), //quarter
			"S": date.getMilliseconds(), //millisecond
			"w+": this.getWeek(date), //week
			"W+": this.getWeekDetails(date) //week
		}
		if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
			(date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] :
					("00" + o[k]).substr(("" + o[k]).length));
		return format;
	},

	getWeek(date) {
		switch (date.getDay()) {
			case 1:
				return '星期一';
			case 2:
				return '星期二';
			case 3:
				return '星期三';
			case 4:
				return '星期四';
			case 5:
				return '星期五';
			case 6:
				return '星期六';
			default:
				return '星期日';
		}
	},

	getWeekDetails(date) {
		//1970-01-01 08:00:00
		var now = new Date();
		var d1 = Math.ceil((date - 28800000) / 86400000)
		var d2 = Math.ceil((new Date().getTime() - 28800000) / 86400000)
		if (d1 == d2) {
			return '今天'
		} else if (d1 == d2 - 1) {
			return '昨天'
		} else if (d1 == d2 + 1) {
			return '明天'
		} else {
			return this.getWeek(date)
		}
	}
}

export default DateUtils
