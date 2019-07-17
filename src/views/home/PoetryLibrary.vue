<template>
    <div class="wapper">
      <div class="isTop"></div>
      <!-- 添加导航栏 -->
      <wxc-minibar title="标题"
                   background-color="#5fc1e3"
                   text-color="#FFFFFF"
                   leftButton=""
                   rightButton="https://www.easyicon.net/api/resizeApi.php?id=1183577&size=72"
                   @wxcMinibarRightButtonClicked="gotoSearch">
        <div slot="middle"><text class="nav-middle-text">诗库</text></div>
      </wxc-minibar>
      <!-- 内容视图 -->
      <wxc-tab-page :tab-titles="tabTitles" 
                    :tab-styles="tabStyles" 
                    title-type="text"
                    ref="wxctabpage"
                    @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
            <list v-for="(v,index) in tabList"
                :key="index"
                show-scrollbar="false"
                class="content-list"
                :style="{ height:'948px'}">
              <cell v-for="(demo,key) in v"
                      class="content-list-cell"
                      :key="key">
                  <div class="content-list-cell-div" @click="gotoLibDetail(demo['title'],index)">
                      <text class="content-list-cell-div-title">{{demo['title']}}</text>
                      <text class="content-list-cell-div-text" v-if="demo['desc'] != null">{{demo['desc']}}</text>
                  </div>
              </cell>
            </list>
      </wxc-tab-page>
    </div>
</template>

<style scoped src="../css/poetryLibrary.css">
</style>

<script>
const modal = weex.requireModule('modal');
var navigator = weex.requireModule('navigator');
var storage = weex.requireModule('storage');
var self;
import { WxcMinibar,WxcTabPage,Utils } from 'weex-ui';
import AuthorInfo from '../../utils/authorInfo';
export default {
    components:{
        WxcMinibar,
        WxcTabPage
    },
    data(){
        return{
            tabTitles:[
                {title:'作者'},
                {title:'朝代'},
                {title:'诗集'},
                {title:'类型'}
            ],
            tabStyles:{
                bgColor: '#FFFFFF',
                titleColor: '#666666',
                activeTitleColor: 'rgb(29,178,223)',
                activeBgColor: '#FFFFFF',
                isActiveTitleBold: true,
                iconWidth: 70,
                iconHeight: 70,
                width: 187.5,
                height: 120,
                fontSize: 30,
                hasActiveBottom: true,
                activeBottomColor: 'rgb(29,178,223)',
                activeBottomHeight: 6,
                activeBottomWidth: 120,
                textPaddingLeft: 10,
                textPaddingRight: 10,
                normalBottomColor: 'rgb(200,200,200)',
                normalBottomHeight: 2,
                hasRightIcon: true,
                rightOffset: 100
            },
            tabList:[],
            demoList: [
              AuthorInfo.authorInfo,
              AuthorInfo.dynasty,
              AuthorInfo.poetryAnthology,
              AuthorInfo.poetrytype
            ],
            libSelectIndex:0
        };
    },
    created(){
      self = this;
      //this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);

      Vue.set(self.tabList, 0, self.demoList[0]);
    },
    methods: {
      gotoSearch () {
        modal.toast({ 'message': 'click rightButton!', 'duration': 1 });
      },
      // tabbar 滑动切换响应
      wxcTabPageCurrentTabSelected (e) {
        const self = this;
        const index = e.page;
        if (!Utils.isNonEmptyArray(self.tabList[index])) {
          setTimeout(() => {
            Vue.set(self.tabList, index, self.demoList[index]);
          }, 100);
        }
        //self.saveLibSelectIndex(index);
      },
      // 进入列表页
      gotoLibDetail(value,index){
        // modal.toast({message:value,duration:1});
        this.$router.push({
          name:'PoetryLibDetail',
          params:{
            value:value,
            index:index
          }
        });
      },
      //存储选择的值
      saveLibSelectIndex(index){
        storage.setItem('libSelectIndex',index,function(ret){
          if(ret.result != 'success'){
            self.saveSelectIndex(index);
          }
        });
      }
    }
}
</script>

