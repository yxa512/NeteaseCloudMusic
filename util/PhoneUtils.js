const PhoneUtils = {
	omit(phone, style = "$1****$2") {
		var reg = new RegExp("(\\d{3})\\d{4}(\\d{4})", "g")
		return phone.replace(reg, style);
	}
}

export default PhoneUtils
