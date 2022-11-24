import request from './request.js'
//获取轮播图数据请求

export const reqGetBanner = (data)=>request.request({
	url:'/banner',
	method:'GET',
	data
})
	
