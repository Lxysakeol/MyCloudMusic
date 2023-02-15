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
export const reqGetTopAlbum = (data) => request.request({
	url: '/album/newest',
	method: 'get',
	data
})
//精选视频
export const reqGetRelateVideo = (data) => request.request({
	url: '/related/allvideo',
	method: 'get',
	data
})
//视频
export const reqGetNavList = (data) => request.request({
	url: '/video/timeline/all',
	method: 'get',
	data
})
//登陆
export const reqLogin = (data) => request.request({
	url: '/login/cellphone',
	method: 'post',
	data
})
// 获取用户详情
export const reqGetUserDetail = (data) => request.request({
	url: '/user/detail',
	method: 'get',
	data
})
// 用户退出登陆
export const reqUserLogOut = () => request.request({
	url: '/logout',
	method: 'get',
})
//热搜榜的接口
export const reqGetHotList = () => request.request({
	url: '/search/hot/detail',
	method: 'get',
})
//搜索建议接口
export const reqSearchSuggest = (data)=> request.request({
	url:'/search/suggest',
	method:'get',
	data
})
//歌单详情
export const reqGetAlbumDetail = (data)=> request.request({
	url:'/playlist/detail',
	method:'get',
	data
})

//获取歌曲链接
export const reqGetSongUrl = (data)=> request.request({
	url:'/song/url/v1',
	method:'get',
	data
})

//获取歌曲详情
export const reqGetSongDetail = (data) => request.request({
	url:'/song/detail',
	method:'get',
	data
})
