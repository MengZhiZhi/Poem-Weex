<template>
    <div class="wapper">
        <!-- 判断是否IOS版本 -->
      <div class="isTop"></div>
      <!-- 导航栏 -->
      <wxc-minibar title="标题"
                   background-color="#5fc1e3"
                   text-color="#FFFFFF"
                   leftButton=""
                   rightButton="https://www.easyicon.net/api/resizeApi.php?id=1223090&size=72"
                   @wxcMinibarRightButtonClicked="addPoem">
        <div slot="middle"><text class="nav-middle-text">诗社</text></div>
      </wxc-minibar>
      <!-- 内容主体 -->
      <list class="list" show-scrollbar="false">
          <!-- 下拉刷新 -->
          <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
              <text class="loadMore">Refreshing</text>
              <loading-indicator class="indicator"></loading-indicator>
          </refresh>
          <cell class="list-cell-topAndBottom"></cell>
          <cell class="list-cell" v-for="(value,index) in lists" :key="index">
              <div class="list-cell-div" @click="gotoCommDetail(value.id)">
                <!-- 标题和事件 -->
                <div class="list-cell-title">
                    <text class="list-cell-title-text">{{value.title}}</text>
                    <text class="list-cell-title-date">{{value.createTime*1000 | formatDate}}</text>
                </div>
                <!-- 内容 -->
                <text class="list-cell-content">{{value.content}}</text>
                <div class="list-cell-user">
                    <!-- 用户信息 -->
                    <image class="list-cell-user-icon" :src="value.user.avatar"></image>
                    <text class="list-cell-user-name">{{value.user.nickName}}</text>
                    <!-- 评论信息 -->
                    <image class="list-cell-user-comm" src="https://www.easyicon.net/api/resizeApi.php?id=1221019&size=64"></image>
                    <text class="list-cell-user-comm-num">{{value.commentCount}}</text>
                    <!-- 关注 -->
                    <image class="list-cell-user-follow" src="https://www.easyicon.net/api/resizeApi.php?id=1229334&size=64"></image>
                    <text class="list-cell-user-follow-num">{{value.likeCount}}</text>
                </div>
              </div>
          </cell>
          <cell class="list-cell-topAndBottom"></cell>
          <!-- 加载更多 -->
          <loading @loading="onloading" :display="loadinging ? 'show' : 'hide'">
              <text v-if="!lastPage" class="loadMore">Loading</text>
              <text v-else class="loadMore">No Data</text>
              <loading-indicator v-if="!lastPage" class="indicator"></loading-indicator>
          </loading>
      </list>
    </div>
</template>
<style scoped src="../../views/css/community.css">

</style>

<script>
var stream = weex.requireModule('stream');
var modal = weex.requireModule('modal');
var systemModule = weex.requireModule('systemModule');
import{WxcMinibar} from 'weex-ui';
import {formatDate} from '../../utils/date';
let self;
export default {
    components:{
        WxcMinibar
    },
    data(){
        return{
            lists:[],
            loadinging:false,
            page:1,
            totalPage:0,
            lastPage:false,
            refreshing:false
        };
    },
    created(){
        self = this;
        self.getData(self.page);
    },
    // 过滤器
    filters:{
        formatDate(time){
            var date = new Date(time);
            return formatDate(date,'MM-dd hh:mm');
        }
    },
    methods:{
        // 作诗
        addPoem(){
            self.$router.push('/addPoem');
        },
        //请求数据
        getData(page){
            systemModule.beginWait({message:'数据加载中'});
            var url = 'http://121.40.152.92:8080/gushici/api/userworks/works?page='+page;
            stream.fetch({
                method:'GET',
                url:url,
                type:'json'
            },function(ret) {
                systemModule.endWait();
                 if(!ret.ok){
                     modal.toast({message:'false',duration:0.3});
                 }else{
                     // 根据分页的页数判断是否是第一次加载数据,或者刷新数据
                     if(self.page == 1){
                         self.lists = null;
                         self.lists = ret.data.data.list;
                     }else{
                         var list = ret.data.data.list;
                         list.forEach(obj => {
                             self.lists.push(obj);
                         });
                     }
                     self.lastPage = ret.data.data.lastPage;
                     
                 }
            });
        },
        // 加载数据
        onloading(){
            if(!self.lastPage){
                self.page ++;
                // modal.toast({ message: 'Loading', duration: 1 });
                this.loadinging = true
                setTimeout(() => {
                    this.loadinging = false
                    self.getData(self.page);
                }, 300)
            }else{
                modal.toast({ message: '数据加载完成', duration: 1 });
            }

        },
        // 刷新数据
        onrefresh() {
            self.page = 1;
            // modal.toast({ message: 'Refreshing', duration: 1 });
            this.refreshing = true;
            setTimeout(() => {
                this.refreshing = false;
                self.getData(self.page);
            }, 300)
        },
        // 进入详情页
        gotoCommDetail(id){
            self.$router.push({
                name:'CommunityDetail',
                params:{
                    id:id
                }
            });
        }
    },

    
}
</script>

