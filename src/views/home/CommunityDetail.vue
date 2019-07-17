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
                 @wxcMinibarLeftButtonClicked="goBack">
        <div slot="middle">
            <text class="nav-middle-text">{{datas.work.title}}</text>
        </div>
    </wxc-minibar>
    <!-- 内容 -->
    <scroller class="scroller" show-scrollbar="false">
        <!-- 下拉刷新 -->
        <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
            <text class="loadMore">Refreshing</text>
            <loading-indicator class="indicator"></loading-indicator>
        </refresh>
        <!-- 详情内容 -->
        <div class="head">
            <div class="head-bottom">
                <div class="head-bottom-div">
                    <image class="head-icon" :src="datas.work.user.avatar"></image>
                    <text class="head-title">{{datas.work.user.nickName}}</text>
                    <image class="head-fllow" :src="headFllow" @click="likeBtn"></image>
                </div>
                <text class="head-content">{{datas.work.content}}</text>
                <!--  -->
                <text class="head-time">{{createTime*1000 | formatDate}}</text>
            </div>
            <div class="comment">
                <div class="comment-head">
                    <text class="comment-title">评论列表</text>
                    <text class="comment-num">{{datas.comments.totalRow}}评论</text>
                </div>
                <!-- 评论内容 -->
                <div class="comment-list">
                    <div class="comment-cell" v-for="(value,index) in commentsList" :key="index">
                        <div class="comment-content-bottom">
                            <image class="comment-content-icon" :src="value.user.avatar"></image>
                            <text class="comment-content-title">{{value.user.nickName}}</text>
                            <text class="comment-content-time">{{value.prettyTime}}</text>
                        </div>
                        <text class="comment-content-text">{{value.content}}</text>
                    </div>
                </div>
            </div>
        </div>
        <!-- 上拉加载 -->
        <loading v-if="!lastPage" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
            <text class="loadMore">Loading</text>
            <loading-indicator class="indicator"></loading-indicator>
        </loading>
    </scroller>
    <!-- 输入框 -->
    <div class="input-bottom">
        <input class="input-text" type="text" ref="inputSend" v-model="inputValue" placeholder="写点什么吧!" @input="changeValue" />
        <text class="input-send" @click="sendInfo">发送</text>
    </div>

  </div>
</template>
<style scoped src='../css/communityDetail.css'>
</style>

<script>
var modal = weex.requireModule('modal');
var storage = weex.requireModule('storage');
var stream = weex.requireModule('stream');
var systemModule = weex.requireModule('systemModule');
import{WxcMinibar} from 'weex-ui';
import {formatDate} from '../../utils/date';
var self;
export default {
  components:{
      WxcMinibar
  },
  data(){
    return{
      evn:'',
      headIcon:'https://www.easyicon.net/api/resizeApi.php?id=1225562&size=128',
      headFllow:'https://www.easyicon.net/api/resizeApi.php?id=1229334&size=72',
      isFllow:false,
      workId:'',
      token:'',
      datas:'',
      createTime:0,
      inputValue:'',
      commentsList:[],
      avatar:'',
      nickName:'',
      prettyTime:'片刻之前',
      refreshing:false,
      loadinging:false,
      lastPage:false,
      pageNumber:1

    };
  },
  // 过滤器
  filters:{
      formatDate(time){
            var date = new Date(time);
            return formatDate(date,'MM月dd日 hh:mm');
      }
  },
  // 生命周期: 创建
  created(){
      self = this;
      this.evn = weex.config.env.osName;
      storage.getItem('data',function(ret) {
          if(ret.result == "success"){
              var data = JSON.parse(ret.data);
            //   modal.toast({message:ret.data,duration:10});
              self.token = data.token;
              self.avatar = data.user.avatar;
              self.nickName = data.user.nickName;
              // 请求数据
              self.getData(self.pageNumber);
          }else{
              modal.toast({message:'token 获取失败!'});
          }
      });
      self.workId = self.$route.params.id;
  },
  methods:{
      // 返回上一页
      goBack(){
          self.$router.go(-1);
      },
      // 获取数据
      getData(page){
          systemModule.beginWait({message:'数据加载中'});
          var url = "http://121.40.152.92:8080/gushici/api/userworks/detail?work_id="+self.workId+"&page="+page+"&token="+self.token;
          stream.fetch({
              method:'GET',
              url:url,
              type:'json'
          },function(ret) {
              systemModule.endWait();
              if(!ret.ok){
                  modal.toast({message:'请求失败!',duration:1});
              }else{
                  if(ret.data.code != 0){
                      modal.toast({message:'数据请求失败!',duration:1});
                  }else{
                      self.datas = ret.data.data;
                      // 判断是否是第一次加载数据
                      if(self.pageNumber == 1){
                          self.commentsList = null;
                          self.commentsList = ret.data.data.comments.list;
                      }else{
                          var commData = ret.data.data.comments.list;
                          commData.forEach(obj => {
                              self.commentsList.push(obj);
                          });
                      }
                      // 创建时间
                      self.createTime = ret.data.data.work.createTime;
                      // 是否关注
                      self.isFllow = ret.data.data.work.like;
                      // 是否是最后一页
                      self.lastPage = ret.data.data.comments.lastPage;
                      if(self.isFllow){
                          self.headFllow = "https://www.easyicon.net/api/resizeApi.php?id=1229846&size=72";
                      }
                  }
              }
          });
      },
      // 关注按钮响应
      likeBtn(){
          if(self.isFllow){
              var url = "http://121.40.152.92:8080/gushici/api/userworks/unLikeWorks?token="+self.token+"&work_id="+self.workId;
          }else{
              var url = "http://121.40.152.92:8080/gushici/api/userworks/likeWorks?token="+self.token+"&work_id="+self.workId;
          }
          stream.fetch({
              method:'GET',
              url:url,
              type:'json'
          },function(ret) {
              if(!ret.ok){
                  modal.toast({message:"网络请求失败!",duration:1});
              }else{
                  if(ret.data.code != 0){
                      modal.toast({message:ret.msg,duration:1});
                  }else{
                      if(!self.isFllow){
                          modal.toast({message:"收藏成功!",duration:1});
                          self.isFllow = true;
                          self.headFllow = "https://www.easyicon.net/api/resizeApi.php?id=1229846&size=72";
                      }else{
                          modal.toast({message:"取消关注!",duration:1});
                          self.isFllow = false;
                          self.headFllow = "https://www.easyicon.net/api/resizeApi.php?id=1229334&size=72";
                      }
                  }
              }
          });
      },
      // input改变值
      changeValue(e){
          self.inputValue = e.value;
      },
      //发送按钮响应
      sendInfo(){
          systemModule.beginWait({message:'数据加载中'});
          var url = "http://121.40.152.92:8080/gushici/api/userworks/addComment?work_id="+self.workId+"&content="+self.inputValue+"&token="+self.token;
          stream.fetch({
              method:'GET',
              url:url,
              type:'json'
          },function(ret) {
              
              if(!ret.ok){
                  modal.toast({message:"网络请求失败!",duration:1});
              }else{
                  if(ret.data.code != 0){
                      modal.toast({message:ret.data.msg,duration:1});
                  }else{
                      systemModule.endWait();
                      modal.toast({message:"发送成功!",duration:1});
                      
                      // 构造数据,添加评论
                      var data = {
                          user:{
                            avatar:self.avatar,
                            nickName:self.nickName,
                          },
                          prettyTime:self.prettyTime,
                          content:self.inputValue
                      }
                      self.commentsList.unshift(data);
                      // 清空输入框数据
                      self.inputValue = "";

                  }
              }
          });          
      },
      //下拉刷新响应
      onrefresh(){
          self.pageNumber = 1;
          this.refreshing = true;
          setTimeout(() => {
              this.refreshing = false;
              self.getData(self.pageNumber);
          }, 300);
      },
      //上拉加载响应
      onloading(){
          if(!self.lastPage){
                self.pageNumber ++;
                this.loadinging = true;
                setTimeout(() => {
                    this.loadinging = false;
                    //modal.toast({message:self.pageNumber,duration:1});
                    self.getData(self.pageNumber);

                }, 1000);
          }else{
              modal.toast({message:'没有更多数据了!'});
          }

      }
  }
}
</script>