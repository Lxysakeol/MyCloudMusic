const request = ({url, data, method = "GET", contentType = 1}) => {
	let header = {
		'content-type': contentType === 1 ? 'application/json' : 'application/x-www-form-urlencoded'
	}
	let baseUrl = "http://localhost:3000";

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			data,
			method,
			header,
			success: (res) => {
				if (res.statusCode == 200) {
					resolve(res.data)
				} else if (statusCode == 401) {
					uni.showToast({
						icon: 'none',
						title:'未登录或登陆状态已超时',
						duration:1500
					})
				}else if(statusCode==405){
					uni.showToast({
						icon: 'none',
						title:'请求方法错误',
						duration:1500
					})
				}else {
					uni.showToast({
						icon: 'none',
						title:'请求错误:' + statusCode,
						duration:1500
					})
				}
			},
			fail: (err) => {
				console.log("错误",err)
				uni.showToast({
					icon:'none',
					title:err.errMsg,
					duration:1500
				})
				reject(err)
			}
		})
	})
}
export default {request}
