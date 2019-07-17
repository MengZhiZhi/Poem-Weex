<template>
  <div class="wapper">
    <!-- 判断是否是IOS -->
    <div class="isTop"></div>
    <!-- 添加导航栏 -->
    <wxc-minibar class="nav"
                 title="日推" 
                 background-color="#5fc1e3"
                 show="true"
                 text-color="#FFFFFF"
                 use-default-return='true'
                 @wxcMinibarLeftButtonClicked="goBack"
                 @wxcMinibarRightButtonClicked="rightSearch">
        <div slot="middle"><text class="nav-middle-text">登录</text></div>
    </wxc-minibar>
    <!-- 账户 -->
    <div class="account">
      <text class="account-title">账户:</text>
      <input class="account-input" placeholder="请输入您的账户名称" @input="getAccountValue" />
    </div>

    <!-- 密码 -->
    <div class="password">
      <text class="password-title">密码:</text>
      <input class="password-input" type="password" placeholder="请输入您的账户密码" @input="getPasswordValue" />
    </div>
 
    <text class="login-btn" @click="login">登录</text>
    <text class="qq-login-btn" @click="QQLogin">没有账户,使用QQ登录</text>

  </div>
</template>
<style scoped src='../css/login.css'>
</style>

<script>
var modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
var storage = weex.requireModule('storage');
var navigator = weex.requireModule('navigator');
var systemModule = weex.requireModule('systemModule');
import{WxcMinibar} from 'weex-ui';
// 不同页面通讯
const LoginInfo = new BroadcastChannel('LoginInfo');
export default {
  components:{
      WxcMinibar
  },
  data(){
    return{
      evn:'',
      passwordValue:'',
      accountValue:''
    };
  },
  created(){
    this.evn = weex.config.env.osName;
  },
  methods:{
    // 回到上一页
    goBack(){
      this.$router.go(-1);
      // navigator.pop({
      //   animated:'true'
      // },event=>{
        
      // });
    },
    // QQ 第三方登录
    QQLogin(){

    },
    // 登录请求
    login(){
      var self = this;
      if(this.accountValue.length == 0){
        modal.toast({message:'账户名称不能为空',duration:1});
        return;
      }

      if(this.passwordValue.length == 0){
        modal.toast({message:'账户密码不能为空',duration:1});
        return;
      }

      storage.setItem('account',this.accountValue,event=>{
        //modal.toast({message:event.result,duration:1});
      });

      storage.setItem('password',this.passwordValue,event=>{
        //modal.toast({message:event.result,duration:1});
      });

      var url = "http://121.40.152.92:8080/gushici/api/auth/login?username="+this.accountValue+"&password="+this.passwordValue;
      // 登录的网络请求
      stream.fetch({
        method:'GET',
        url:url,
        type:'json'
      },function(ret) {
          if(!ret.ok){
            modal.toast({message:'请求失败',duration:1});
          }else{
            if(ret.data.code == 0){
              var data = JSON.stringify(ret.data.data);
              // 存储账户信息
              storage.setItem('data',data,event=>{
                modal.toast({message:'登录成功',duration:1});
                // 触发全局事件监听
                systemModule.fireNativeGlobalEvent({event:'refreshPage'},function(ret){
                    if(ret.ok){
                      // 回到上一页
                      // self.$router.go(-1);
                    }
                });
                //返回上一页
                self.goBack();
              });
            }else{
              var msg = ret.data.msg;
              modal.toast({message:msg,duration:0.5});
            }
          }
      });
    },
    // 获取账户名称
    getAccountValue(param){
      this.accountValue = param.value;
    },
    // 获取账户密码
    getPasswordValue(param){
      this.passwordValue = param.value;
    }
  }
}
</script>

