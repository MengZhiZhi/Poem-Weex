<template>
  <div class="wapper">
    <!-- 判断是否是IOS -->
    <div class="isTop"></div>
    <!-- 添加导航栏 -->
    <wxc-minibar class="nav"
                 title="" 
                 background-color="#5fc1e3"
                 show="true"
                 text-color="#FFFFFF"
                 @wxcMinibarRightButtonClicked="rightSearch">
        <div slot="left"></div>
        <div slot="middle"><text class="nav-middle-text">我的</text></div>
    </wxc-minibar>
    <!-- 登录模块 -->
    <div class="login" v-if="!isLogin" @click="goToLogin">
      <image class="login-icon" src="https://www.easyicon.net/api/resizeApi.php?id=1108447&size=128"></image>
      <text class="login-text">点击头像登录</text>
    </div>
    <!-- 个人信息模块 -->
    <div class="user" v-else>
      <div class="user-header">
        <image class="user-header-icon" :src="user.avatar"></image>
        <text class="user-header-name">{{user.nickName}}</text>
      </div>
      <div class="user-info">
        <div class="user-info-content">
          <text class="user-info-content-text">{{info.fansCount}}</text>
          <text class="user-info-content-title">粉丝</text>
        </div>
        <div class="user-info-content">
          <text class="user-info-content-text">{{info.followsCount}}</text>
          <text class="user-info-content-title">关注</text>
        </div>
        <div class="user-info-content">
          <text class="user-info-content-text">{{info.worksCount}}</text>
          <text class="user-info-content-title">创作</text>
        </div>
        <div class="user-info-content">
          <text class="user-info-content-text">{{info.likedCount}}</text>
          <text class="user-info-content-title">收藏</text>
        </div>
      </div>
    </div>
    <!-- 内容模块 -->
    <scroller class="content">
      <div class="content-cell" v-for="(value,index) in configList" :key="index" @click="tapMethod(index)">
        <image class="content-cell-icon" :src="value.icon"></image>
        <text class="content-cell-title">{{value.title}}</text>
        <image class="content-cell-inter" src="https://www.easyicon.net/api/resizeApi.php?id=1225491&size=64"></image>
      </div>
    </scroller>
  </div>
</template>
<style scoped src='../css/person.css'>
</style>

<script>
var storage = weex.requireModule("storage");
var navigator = weex.requireModule('navigator');
var modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
import{WxcMinibar} from 'weex-ui';

// 注册全局监听事件
var globalEvent = weex.requireModule('globalEvent');
globalEvent.addEventListener('refreshPage',function(e) {
    modal.toast({message:'12345',duration:1});
});
// globalEvent.addEventListener('WXApplicationDidBecomeActiveEvent', function(e) {
//   modal.toast({message:'WXApplicationDidBecomeActiveEvent',duration:1});
// });

export default {
  components:{
      WxcMinibar
  },
  data(){
    return{
      evn:'',
      configList:[
      ],
      user:{},
      isLogin:false,
      info:{}
    };
  },
  created(){
    var self = this;
    this.evn = weex.config.env.osName;
    // 获取本地存储的用户数据
    storage.getItem('data',event=>{

      var themom = {title:'更换主题',icon:'https://www.easyicon.net/api/resizeApi.php?id=1143831&size=64'};
      var aboutUs = {title:'关于我们',icon:'https://www.easyicon.net/api/resizeApi.php?id=1143831&size=64'};
      var open = {title:'打开微信小程序员',icon:'https://www.easyicon.net/api/resizeApi.php?id=1143831&size=64'};

      this.configList.push(themom);
      this.configList.push(aboutUs);
      this.configList.push(open);

      if(event.result == 'success'){
          var data = JSON.parse(event.data);
          this.user = data.user;
          this.isLogin = true;
          // 添加数据
          var myInfo = {title:'我的消息',icon:'https://www.easyicon.net/api/resizeApi.php?id=1143831&size=64'};
          this.configList.unshift(myInfo);

          var loginOut = {title:'退出登录',icon:'https://www.easyicon.net/api/resizeApi.php?id=1143831&size=64'};
          this.configList.push(loginOut);
          //获取信息数据
          self.getInfoData(data.token);
      }
    });

  },
  methods:{
    // 进入登录页面
    goToLogin(){
      // 使用路由方式进入
      this.$router.push('/login');

      // 使用 nav 的方式进入
      // var path = this.getPath('login');
      // // 使用 navigator进行跳转
      // navigator.push({
      //   url:path,
      //   animated:'true'
      // },function(event){
      //     //modal.toast({message:'123',duration:1});
      // });
    },
    // 退出登录的方法
    tapMethod(index){
      var self = this;
      if(self.isLogin){
        if(index == 0){
          modal.toast({message:'我的消息',duration:1});
          return;
        }
        if(index == 4){
          modal.confirm({
            message:'真的要退出登录吗?',
            okTitle:'确定',
            cancelTitle:'取消'
          },function(params) {
            // modal.toast({message:params,duration:0.3});
            if(params == "确定"){
              // 1. 删除本地的缓存的用户信息
              storage.removeItem('data',evetn=>{
                if(evetn.result == "success"){
                  modal.toast({message:'退出成功',duration:1});
                  // 1.隐藏我的消息按钮
                  self.configList.splice(0,1);
                  // 2. 隐藏退出登录按钮
                  self.configList.splice(3,1);
                  // 3. 设置 isLogin 为 false
                  self.isLogin = false;
                }
              });
            }
          });
        }
        index--;
      }
      // 更换主题
      if(index == 0){
        modal.toast({message:'更换主题',duration:1});
      }
      // 关于我们
      if(index == 1){
         modal.toast({message:'关于我们',duration:1});
      }
      // 打开微信小程序
      if(index == 2){
        modal.toast({message:'打开微信小程序',duration:1});
      }
    },
    // 拼接链接
    getPath(pathWithoutSuffix, params){
      var path = '';
      let platform = weex.config.env.platform;
      let bundleUrl = weex.config.bundleUrl;
      var exp = new RegExp(".+/");
      var baseUrl = exp.exec(bundleUrl);

      path = baseUrl;

      if (platform.toLowerCase() === 'web') {
        path += pathWithoutSuffix + '.html'
      }else {
        path += pathWithoutSuffix + '.js'
      }
      if (params) {
        path += '?' + params
      }
      return path;
    },
    // 获取用户 粉丝 关注 创作 收藏的数据
    getInfoData(token){
      var self = this;
      var url = "http://121.40.152.92:8080/gushici/api/my/info?token="+token;
      stream.fetch({
        method:'GET',
        url:url,
        type:'json'
      },function(ret) {
        if(!ret.ok){
          modal.toast({message:'数据请求失败',duration:1});
        }else{
          if(ret.data.code == 0){
            // 获取用户信息数据
            self.info = ret.data.data;
          }else{
            modal.toast({message:ret.data.msg,duration:1});
          }
        }
      });
    }  
  },
}
</script>

