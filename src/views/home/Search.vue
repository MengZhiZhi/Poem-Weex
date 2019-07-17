<template>
    <div class="wapper">
      <div class="isTop"></div>
      <!-- 添加导航栏 -->
      <wxc-minibar class="nav"
                  title="日推"
                  background-color="#5fc1e3"
                  text-color="#FFFFFF"
                  @wxcMinibarLeftButtonClicked="gotoBack">
        <div class="search-middle" slot="middle">
            <input class="search-middle-input" ref="searchInput" :value="inputValue" type="text" placeholder="搜索关键字" @input="changeValue" />
        </div> 
        <div class="search-right" slot="right">
            <image class="search-right-seabtn" @click="clearInput" src="https://www.easyicon.net/api/resizeApi.php?id=1199468&size=72"></image>
            <image class="search-right-clear"  @click="searchBtn" src="https://www.easyicon.net/api/resizeApi.php?id=1183577&size=72"></image>
        </div>         
      </wxc-minibar>
      <scroller class="scroller" show-scrollbar="false">
        <!-- 推荐关键词模块 -->
        <div class="tips" v-if="isShowHotKey">
            <text class="tips-title">大家都在搜</text>
            <div class="tips-content">
                <div v-for="(value,index) in tipsList" :key='index'>
                    <text class="tips-content-text" @click="tipsSearch(value['searchKey'])">{{value['searchKey']}}</text>
                </div>
            </div>

        </div>
        
        <!-- 诗人信息 -->
        <div class="res-author" v-if="isShowAuthor">
            <div  class="res-author-title"><text class="res-author-title-text">诗人</text></div>
            <div class="res-author-content" v-for="(value,index) in resultAuthors" :key="index">
                <text class="res-author-content-title">{{value['name']}}</text>
                <text class="res-author-content-text">{{value['descDetail']}}</text>
            </div>
        </div>

        <!-- 诗词信息 -->
        <div class="res-poem" v-if="isShowPoems">
            <div  class="res-poem-title"><text class="res-poem-title-text">诗词</text></div>
            <div class="res-poem-content" v-for="(value,index) in resultPoems" :key="index" >
                <div class="res-poem-content-bottom" @click="gotoPoetryDetail(value.id)">
                    <text class="res-poem-content-title">{{value['title']}}</text>
                    <text class="res-poem-content-year">{{value['dynasity']}}| {{value['author']}}</text>
                    <text class="res-poem-content-text">{{value['zhaiyao']}}</text>
                </div>
            </div>
            <div class="res-poem-more">
                <image class="res-poem-more-icon" src="https://www.easyicon.net/api/resizeApi.php?id=1183577&size=72"></image>
                <text class="res-poem-more-title">查看更多结果</text>
            </div>
        </div>

      </scroller>
    </div>
</template>
<style src="../css/search.css">

</style>

<script>
var modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
import{WxcMinibar} from 'weex-ui';
var self;
export default {
    components:{
        WxcMinibar
    },
    data(){
        return{
            inputValue:'陶渊明',
            isShowHotKey:false,
            tipsList:[], //热门词汇
            resultPoems:[], //搜索诗词
            isShowPoems:false,
            resultAuthors:[], //搜索诗人信息
            isShowAuthor:false
        };
    },
    created(){
        self = this;
        // 获取热门推荐词
        this.getHotKeys();
    },
    mounted(){
        this.$refs['searchInput'].focus();
    },
    methods:{
        // 返回上一页
        gotoBack(){
            this.$router.go(-1);
        },
        // 清空 input 值
        clearInput(){
            this.inputValue = "";
            self.isShowHotKey = true;
            self.isShowPoems = false;
            self.isShowAuthor = false;
        },
        // input 值改变回调方法
        changeValue(param){
            this.inputValue = param.value;
        },
        // 搜索按钮响应方法
        searchBtn(){
            self.getSearchData(self.inputValue);
            this.$refs['searchInput'].blur();
        },
        // 热门推荐值回调
        tipsSearch(value){
            self.getSearchData(value);
            this.$refs['searchInput'].blur();
            self.inputValue = value;
            this.$refs['searchInput'].value = value;

        },
        // 获取热门词汇
        getHotKeys(){
            stream.fetch({
                method:'GET',
                url:'http://121.40.152.92:8080/gushici/api/search/hotKeys',
                type:'json'
            },function(ret){
                if(! ret.ok){
                    moadl.toast({message:'请求失败',duration:0.3});
                }else{
                    self.tipsList = ret.data.data.keys;
                    self.isShowHotKey = true;
                }
            });
        },
        // 获取查询数据
        getSearchData(value){
            var url = "http://121.40.152.92:8080/gushici/api/search/wxsearch?key="+value;
            stream.fetch({
                method:'GET',
                url:url,
                type:'json'
            },function(ret){

                if(! ret.ok){
                    moadl.toast({message:'请求失败',duration:0.3});
                }else{
                    // 获取相关作者信息
                    self.resultAuthors = ret.data.data.authors;

                    setTimeout(() => {
                        // 获取相关诗词信息
                        self.resultPoems = ret.data.data.poems;
                        if(self.resultPoems.length != 0){
                            self.isShowPoems = true;
                        }
                    }, 300);


                    self.isShowHotKey = false;

                    if(self.resultAuthors.length != 0){
                        self.isShowAuthor = true;
                    }




                }
            });
        },
        // 跳转到内容详情页面
        gotoPoetryDetail(id){
            this.$router.push({
            name:'PoetryDetails',
            params:{
                uid:id
            }
            });
        }
    }
}

</script>

