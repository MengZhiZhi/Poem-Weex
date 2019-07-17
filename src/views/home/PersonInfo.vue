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
                 :right-button='followIcon'
                 @wxcMinibarRightButtonClicked="goFllow"
                 @wxcMinibarLeftButtonClicked="goBack">
        <div slot="middle">
            <text class="nav-middle-text">{{name}}</text>
        </div>
    </wxc-minibar>
    <!-- 内容 -->
    <scroller class="bottom-scroller" show-scrollbar="false">
      <div class="content" >
        <image class="content-icon" src="https://www.easyicon.net/api/resizeApi.php?id=1225562&size=128"></image>
        <text class="content-num">共收录{{datas.counts}}首>></text>
        <text class="content-text">{{datas.descDetail}}</text>
      </div>
    </scroller>

  </div>
</template>
<style scoped src='../css/personInfo.css'>
</style>

<script>
var modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
var systemModule = weex.requireModule('systemModule');
var self;
import{WxcMinibar} from 'weex-ui';
export default {
  components:{
      WxcMinibar
  },
  data(){
    return{
      evn:'',
      name:'',
      token:'',
      datas:{},
      followIcon:'https://www.easyicon.net/api/resizeApi.php?id=1229334&size=72',
      isFollow:false
    };
  },
  created(){
      self = this;
      this.evn = weex.config.env.osName;
      self.name = self.$route.params.name;
      self.token = self.$route.params.token;
      //获取数据
      self.getData();
  },
  methods:{
      // 返回上一页
      goBack(){
          self.$router.go(-1);
      },
      // 获取数据
      getData(){
        systemModule.beginWait({message:'数据加载中'});
        var url = "http://121.40.152.92:8080/gushici/api/poem/authorDetail?name="+self.name+"&token="+self.token;
        stream.fetch({
          method:'GET',
          url:url,
          type:'json'
        },function(ret) {
          systemModule.endWait();
          if(!ret.ok){
            modal.toast({message:"网络请求失败",duration:1});
          }else{
            if(ret.data.code != 0){
              modal.toast({message:ret.data.msg,duration:1});
            }else{
              self.datas = ret.data.data;
              // 判断是否已经关注
              if(self.datas.like){
                self.followIcon = "https://www.easyicon.net/api/resizeApi.php?id=1229846&size=72";
                self.isFollow = true;
              }
            }
          }
        });
      },
      // 关注或取消关注
      goFllow(){
        if(self.isFollow){
          // 取消关注
          var url = "http://121.40.152.92:8080/gushici/api/user/unLikeAuthor?token="+self.token+"&author_id="+self.datas.id;
        }else{
          // 关注
          var url = "http://121.40.152.92:8080/gushici/api/user/likeAuthor?token="+self.token+"&author_id="+self.datas.id;
        }
        // 发送网络请求
        stream.fetch({
          method:'GET',
          url:url,
          type:'json'
        },function(ret){
          if(!ret.ok){
            modal.toast({message:'操作失败!',duration:1});
          }else{
            if(ret.data.code != 0){
              modal.toast({message:ret.msg,duration:1});
            }else{
              self.isFollow = ret.data.data.status;
              if(self.isFollow){
                modal.toast({message:'收藏成功',duration:1});
                self.followIcon = "https://www.easyicon.net/api/resizeApi.php?id=1229846&size=72";
              }else{
                modal.toast({message:'取消收藏',duration:1});
                self.followIcon = "https://www.easyicon.net/api/resizeApi.php?id=1229334&size=72";
              }
            }
          }
        });

      }
  }
}
</script>

