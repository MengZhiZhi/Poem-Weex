<template>
  <wxc-tab-bar class="tabbar"
               :tab-titles="tabTitles"
               :tab-styles="tabStyles"
               title-type="text"
               :title-use-slot="true"
               ref="wxctabbar"
               @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
               <div class="tabbarDiv" slot="tab-title-0">
                 <image class="tabbarImage" src="https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png"></image>
                 <text v-if="selectIndex == 0" class="tabbarSelectText">日推</text>
                 <text v-else class="tabbarText">日推</text>
               </div>
              <div class="tabbarDiv" slot="tab-title-1">
                <image class="tabbarImage" src="https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png"></image>
                <text v-if="selectIndex == 1" class="tabbarSelectText">诗库</text>
                <text v-else class="tabbarText">诗库</text>
               </div>
               <div class="tabbarDiv" slot="tab-title-2">
                 <image class="tabbarImage" src="https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png"></image>
                <text v-if="selectIndex == 2" class="tabbarSelectText">诗社</text>
                <text v-else class="tabbarText">诗社</text>
               </div>
               <div class="tabbarDiv" slot="tab-title-3">
                 <image class="tabbarImage" src="https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png"></image>
                <text v-if="selectIndex == 3" class="tabbarSelectText">我的</text>
                <text v-else class="tabbarText">我的</text>
               </div>
    <!-- 第一个页面内容-->
    <div class="item-container" :style="contentStyle">
      <div class="isTop"></div>
      <!-- 添加导航栏 -->
      <wxc-minibar class="nav"
                  title="日推"
                  background-color="#5fc1e3"
                  leftButton=""
                  rightButton="https://www.easyicon.net/api/resizeApi.php?id=1183577&size=72"
                  text-color="#FFFFFF"
                  @wxcMinibarRightButtonClicked="gotoSearch">
        <div slot="middle"><text class="nav-middle-text">日推</text></div>          
      </wxc-minibar>
      <!-- 日推模块 -->
      <scroller show-scrollbar="false">
        <!-- 每日一首模块 -->
        <div class="bestDay" @click="gotoTest">
          <image class="bestImage" style="width:750px;height:400px;opacity:0.5;" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562059307&di=8c6194e070fe510a854ef6d8cd2fc670&src=http://img.sanhao.com/community_news/10020/20161017112208423.jpg"></image>
          <div class="best-div-content">
              <text class="best-title">每日一首</text>
              <text class="best-num">{{dayYY}}</text>
              <text class="best-content">{{bestContent}}</text>
          </div>
          <div class="best-div-content">
            <text class="best-year">{{bestYear}}</text>
            <text class="best-date">{{bestDate}}</text>
          </div>
        </div>
        <div class="home-search" @click="gotoSearch">
          <image class="home-search-image" src="https://www.easyicon.net/api/resizeApi.php?id=1183577&size=72"></image>
          <text class="home-search-text">搜索词诗/诗人</text>
        </div>
        <!-- 列表详情 -->
        <div v-for="(value,key) in homeLists" :key="key">
          <div class="list-content" @click="gotoPoetryDetail(value.id)">
            <text class="list-content-title">{{value.title}}</text>
            <text class="list-content-yautour">{{value.dynasity}} | {{value.author}}</text>
          </div>
        </div>
      </scroller>
    </div>

    <!-- 第二个页面内容-->
    <div class="item-container" :style="contentStyle"><PoetryLibrary /></div>

    <!-- 第三个页面内容-->
    <div class="item-container" :style="contentStyle"><Community /></div>

    <!-- 第四个页面内容-->
    <div class="item-container" :style="contentStyle"><Person /></div>
  </wxc-tab-bar>
</template>


<style src='../css/home.css'>

</style>


<script>
var self;
var moadl = weex.requireModule('modal');
var stream = weex.requireModule('stream');
var storage = weex.requireModule('storage');
var systemModule = weex.requireModule('systemModule');
import PoetryLibrary from './PoetryLibrary';
import Community from './Community';
import Person from './Person';
import { WxcTabBar,WxcMinibar, Utils } from 'weex-ui';
import Config from '../../utils/config';

  export default {
    components: { WxcTabBar,WxcMinibar,PoetryLibrary,Community,Person},
    data(){
      return{
        env:'',
        contentStyle:{
          height:'1204px'
        },
        selectIndex:0,
        tabTitles: Config.tabTitles,
        tabStyles: Config.tabStyles,
        dayYY:'',
        bestContent:'',
        bestYear:'',
        bestDate:'',
        homeLists:[
        ]
      };
    },
    created () {
      self = this;

      //获取 selectIndex 值
      storage.getItem('selectIndex',function(ret) {
        if(ret.data == undefined){
          return;
        }
        if(ret.data != 0){
          self.selectIndex = ret.data;
          self.$refs['wxctabbar'].setPage(self.selectIndex,null,false);
        }
      });

      // 获取系统
      this.env = weex.config.env.osName;

      // moadl.toast({message:this.env,duration:0.3});

      // 加载头部数据
      this.getHeaderData();
      // 加载列表数据
      this.getListData();

    },
    methods: {
      // tabbar 切换
      wxcTabBarCurrentTabSelected (e) {
        const index = e.page;
        this.selectIndex = index;
        self.saveSelectIndex(index);
      },
      // 跳转到搜索页面
      gotoSearch(){
        this.$router.push('/search');
      },
      //获取每日一首的数据
      getHeaderData(){
          // systemModule.beginWait({message:'数据加载中'});
          stream.fetch({
              method: 'GET',
              url: 'http://121.40.152.92:8080/gushici/api/poem/dailySen',
              type:'json'
            }, function(ret) {
              setTimeout(() => {
                // systemModule.endWait();
              }, 2000);
              
              if(!ret.ok){
                moadl.toast({
                  message: 'Network Error!',
                  duration: 3
                });
              }else{
                
                // 日期
                self.dayYY = ret.data.data.date.dayYY;
                //名句
                self.bestContent = ret.data.data.mingju.content;
                //年分
                self.bestYear = ret.data.data.date.month + ret.data.data.date.day;
                //具体时间
                self.bestDate = ret.data.data.date.mmdd;

                // moadl.toast({message:ret.data.data.date.dayYY,duration:3});
              }
            });
      },
      // 列表数据
      getListData(){
        // systemModule.beginWait({message:'数据加载中'});
        stream.fetch({
          method:'GET',
          url:'http://121.40.152.92:8080/gushici/api/poem/random10',
          type:'json'
        },function(ret){
          // systemModule.endWait();
          if(! ret.ok){
            moadl.toast({message:'请求失败',duration:0.3});
          }else{
            self.homeLists = ret.data.data;
          }
        })
      },
      // 跳转到内容详情页面
      gotoPoetryDetail(id){
        this.$router.push({
          name:'PoetryDetails',
          params:{
            uid:id
          }
        });
      },
      // 将选择的selectIndex值保存下来
      saveSelectIndex(index){
        storage.setItem('selectIndex',index,function(ret){
          if(ret.result != 'success'){
            self.saveSelectIndex(index);
          }
        });
      },
      // 进入 测试模块
      gotoTest(){
        self.$router.push('/test');
      }
    }
  };
</script>