//常用函数
const PubFn = {
	//格式化00:00格式
	formatTime(second){
		let sec = second % 60; //求秒
		let min = Math.floor(second / 60);  //求分
		if(min.toString().length < 2){
			min = '0' + min;
		}
		if(sec.toString().length < 2){
			sec = '0' + sec;
		}
		return min + ':' + sec;
	}
}

export default PubFn