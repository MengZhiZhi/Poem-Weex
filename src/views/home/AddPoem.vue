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
                 @wxcMinibarLeftButtonClicked="goBack"
                 @wxcMinibarRightButtonClicked="submit">
        <div slot="middle">
            <text class="nav-middle-text">作诗</text>
        </div>
        <div slot="right">
            <text class="submit">提交</text>
        </div>
    </wxc-minibar>
    <!-- 内容 -->
    <div class="content">
        <text class="content-title">题目</text>
        <input class="content-input-title" placeholder="请输入诗句标题" @input="getInputValue" />
        <text class="content-title">内容</text>
        <textarea class="content-text" placeholder="请输入诗句" @input="getTextareaValue"></textarea>
    </div>
  </div>
</template>
<style scoped src='../css/addPoem.css'>
</style>

<script>
var modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
var storage = weex.requireModule('storage');
import{WxcMinibar} from 'weex-ui';
var self;
export default {
  components:{
      WxcMinibar
  },
  data(){
    return{
      evn:'',
      token:'',
      inputValue:'',
      textAreaValue:''
    };
  },
  created(){
      self = this;
      this.evn = weex.config.env.osName;
      storage.getItem('data',function(ret){
          if(ret.result != 'success'){
              modal.toast({message:'token 获取失败',duration:1});
          }else{
              self.token = JSON.parse(ret.data).token;
          }
      });

  },
  methods:{
      goBack(){
          self.$router.go(-1);
      },
      getInputValue(e){
          self.inputValue = e.value;
      },
      getTextareaValue(e){
          self.textAreaValue = e.value;
      },
      postSubmit(){
          // 拼接参数
          var param = {
              title:self.inputValue,
              content:self.textAreaValue,
              token:self.token
          };
          var body = JSON.stringify(param);
        //   modal.toast({message:body,duration:1});
          stream.fetch({
              method:'POST',
              url:'http://121.40.152.92:8080/gushici/api/userworks/createPoem',
              type:'json',
              body:body
          },function(ret) {
              if(!ret.ok){
                  modal.toast({message:'网络请求失败',duration:1});
              }else{
                  if(ret.data.code != 0){
                      modal.toast({message:ret.data.msg,duration:1});
                  }else{
                      modal.toast({message:'发送成功!',duration:1});
                  }
              }
          });
      },
      submit(){
          var self = this;
          var url = "http://121.40.152.92:8080/gushici/api/userworks/createPoem?title="+self.inputValue+"&content="+self.textAreaValue+"&token="+self.token;
          
          stream.fetch({
              method:'GET',
              url:url,
              type:'json'
          },function(ret) {
              if(!ret.ok){
                  modal.toast({message:'网络请求失败',duration:1});
              }else{
                  if(ret.data.code != 0){
                      modal.toast({message:ret.data.msg,duration:1});
                  }else{
                      modal.toast({message:'发送成功!',duration:1});
                      setTimeout(() => {
                          self.goBack();
                      }, 700);
                      
                  }
              }
          });
      }
  }
}
</script>