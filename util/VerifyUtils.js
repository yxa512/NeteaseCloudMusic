const VerifyUtils = {
	// 手机号码验证
	checkPhone: (phone) => {
		if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
			return false;
		} else {
			return true
		}
	},
	// 邮箱验证
	checkEmail: (email) => {
		if (!(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email))) {
			return false;
		} else {
			return true
		}
	},
	//密码验证
	checkPwd: (pwd) => {
		if (!(/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{6,}$/.test(pwd))) {
			return false;
		} else {
			return true
		}
	}
}

export default VerifyUtils
