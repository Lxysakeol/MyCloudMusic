import request from './request.js'
//获取轮播图数据请求
export const reqGetBanner = (data) => request.request({
	url: '/banner',
	method: 'GET',
	data
})
//获取推荐歌单数据
export const reqGetRecommendSong = (data) => request.request({
	url: '/personalized',
	method: 'get',
	data
})
//新碟新歌
export const reqGetTopAlbum = (data)=>request.request({
	url:'/album/newest',
	method:'get',
	data
})
//精选视频
export const reqGetRelateVideo = (data)=>request.request({
	url:'/related/allvideo',
	method:'get',
	data
})
