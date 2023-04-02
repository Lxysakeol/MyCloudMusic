本次使用的是网络上的网易云音乐api，运行项目前需要在本地计算机终端
打开NeteaseCloudMusicApi-4.8.2文件夹，运行node app.js命令获取项目
所有API。原理：跨站请求伪造 (CSRF), 伪造请求头 , 调用官方 API
[获取地址](https://github.com/Binaryify/NeteaseCloudMusicApi)


# 发现页
1.请求组件promise封装

2.请求组件的使用

3.主入口模块的实现

4.推荐歌单模块

5.新碟新歌模块

6.精选视频模块

7.songList组件封装
减少代码冗余

8.下拉刷新
需要在pages.json中配置enablePullDownRefresh
[下拉刷新](https://uniapp.dcloud.io/api/ui/pulldown?id=onpulldownrefresh)

![1](https://user-images.githubusercontent.com/113192717/229362807-1b57d476-5970-41fa-bb53-402e9e5c3d36.png)

# 视频页
1.导航条实现
使用scroll-view组件实现
导航条高亮显示

2.需要计算每个项目下面的下划线位置
二个文字宽度===60rpx
最左边空隙16rpx
二个导航条之间50rpx

3.视频列表
仍然可以使用scroll-view上下滚动，
有个问题？是一个分页，向上滚动到要能加载下一页，向下滚动要能刷新当前页
推荐外部控件mescroll-uni

![2](https://user-images.githubusercontent.com/113192717/229362832-fcd6e217-5332-410e-95df-14f24a5327fb.png)

# 我的页
1.导航条

2.菜单列表  使用三方插件uni-list

3.推荐歌单

![3](https://user-images.githubusercontent.com/113192717/229362846-d9e0c3c7-308e-4217-b6bb-926784abe176.png)

# 云村页

1.导航栏 三方插件uni-nav-bar
1.1 兼容性
uniapp---兼容多个平台
<!-- #ifdef APP-PLUS || H5 -->
里面的内容会打包到h5中
<!-- #endif -->

2.滚动列表 三方插件mescroll

3.滚动列表包括：
  上下轮播
  二列视频列表(奇偶)
  
![4](https://user-images.githubusercontent.com/113192717/229362858-b15c0bc0-c9c1-41b3-bcf2-bdc318a06c4f.png)

# 账号页
1.导航栏

2.滚动列表
scroll-view
子列表uni-list

3.vuex状态控制
把store挂载到vue实例上

![5](https://user-images.githubusercontent.com/113192717/229362882-0cfd2f93-af59-4cfc-b272-8bc5832f0be2.png)

# 登录页
1.通过登录接口登录。

2.登录成功后，保存用户信息到vuex，便于账号页显示用户信息。

3.刷新后 用户信息丢失？
需要将用户信息保存到storage, 在app打开时，将用户信息取出并放到vuex中。
4.用户登出

4.0 跳用注销接口，清除服务端的用户缓存信息

4.1 将用户的数据从浏览器缓存和storage中清除



# 开屏页
1.app首次打开时显示

2.app后台运行超过一定时间，再切换时也显示

3.首选显示的是LOGO页,维持2秒

4.再显示广告页，维持7秒, 之后跳转首页(也可以跳过)

![7](https://user-images.githubusercontent.com/113192717/229362908-7eb00c5e-7264-46a4-ad2d-79aa74206cee.png)
![6](https://user-images.githubusercontent.com/113192717/229362912-7785edc7-96a3-40c5-8c69-9d99dd0ffc35.png)

# 搜索页
1.首页重构
增加导航栏，滚动组件mescroll-uni，相应的加载数据的方法
增加搜索页

2.二种下拉刷新方式
  uniapp提供的，pages.json可配置
  mescroll提供的。（使用这种，uniapp提供的关掉)
  
3.搜索页与首页切换
父子组件通信

4.搜索页面
未输入时
  展示广告位，搜索历史，热搜版
已输入时
  则显示搜索结果
  
5.搜索页面2
  防抖处理
  搜索结果展示
  搜索历史
  
![8](https://user-images.githubusercontent.com/113192717/229362936-753240dd-5598-463c-b1b1-d6d8bdb3c499.png

# 音乐页面
1. 从歌单中 点击 打开音乐页面

2. 音乐页面获取接口数据

![9](https://user-images.githubusercontent.com/113192717/229362957-7bf7a57e-2926-4ef2-bba8-532e8c149efc.png)

# 播放页面
1. 从音乐列表中  点击  跳转到播放页面

2. 音乐界面展示 背景图片 播放 暂停 进度条

3. 进度条的控制
   播放时 进度条的自动更新
   需要点击拖动
   进度条左右两边时间显示
   
4. 下一首 上一首 播放模式
   歌曲是一个数组 [1, 2, 3] 只需要改变播放的索引
   播放模式 【列表循环，随机播放，单曲循环】
   
5. 标题滚动，添加一个动画，并且判断标题的长度
   如果标题长度大于110则为滚动标题，小于110则为静态标题
   
![10](https://user-images.githubusercontent.com/113192717/229362970-6bc5ff16-0847-4c7a-b404-b8643b8e181e.png)

  
# 打包
1.下载hbuildx并注册账号
2.可运行uniapp项目
3.打开manifest.json获取appid
4.发行--原生app云打包--点击打包
5.打包完成会在控制台生成一个下载app的链接，复制到浏览器下载并安装
