const StringUtils = {

	//处理富文本图片和p标签间距问题
	modifyRichText(description) {
		//修改富文本内容增加图片显示模式
		/* var regex = new RegExp('<img', 'gi');
		description = description.replace(/\<img/gi, "<img style='max-width:100%;height:auto;display: block'"); */

		var img_num = description.split("<img").length - 1
		for (var i = 1; i <= img_num; i++) {
			var index = this.find(description, '<img', i)
			var index_end = description.indexOf('>', index)
			description = this.insertStr(description, index_end - 1, " style='max-width:100%;height:auto;display: block;'")
		}

		var regex = new RegExp('<video', 'gi');
		description = description.replace(/\<video/gi, "<video style='width:100%;' ");

		regex = new RegExp('<p', 'gi');
		description = description.replace(/\<p/gi, "<p style='max-width:100%;margin:0px;padding:0px;' ");
		console.log(description);

		return description
	},

	find(str, cha, num) {
		var x = str.indexOf(cha);

		for (var i = 1; i < num; i++) {
			x = str.indexOf(cha, x + 1);
		}
		return x;
	},

	insertStr(soure, start, newStr) {
		return soure.slice(0, start) + newStr + soure.slice(start);
	},

	https(url) {
		let strs = url.split("://")
		if (strs.length == 2) {
			return "https://" + strs[1]
		} else {
			return url
		}
	}
}

export default StringUtils
