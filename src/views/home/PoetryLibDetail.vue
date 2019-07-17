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
                 @wxcMinibarRightButtonClicked="gotoPerson">
        <div slot="middle">
          <text class="nav-middle-text">{{value}}</text>
        </div>
        <div v-if="index == 0" slot="right">
          <image class="nav-right" src="https://www.easyicon.net/api/resizeApi.php?id=1225506&size=72"></image>
        </div>
    </wxc-minibar>
    <!-- 内容 -->
    <list class="content-list" show-scrollbar="false">
      <!-- 下拉刷新 -->
      <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
        <text>Refreshing</text>
        <loading-indicator class="indicator"></loading-indicator>
      </refresh>
      <cell class="content-cell" v-for="(value,index) in dataLists" :key="index">
        <div class="content-div" @click="gotoPoetryDetail(value.id)">
          <text class="content-title">{{value.title}}</text>
          <text class="content-zhaiyao">{{value.zhaiyao}}</text>
        </div>
      </cell>
      <!-- 上拉加载 -->
      <loading v-if="!lastPage" class="refresh" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
        <text>Loading</text>
        <loading-indicator class="indicator"></loading-indicator>
      </loading>
    </list>
  </div>
</template>
<style scoped src='../css/poetryLibDetail.css'>
</style>

<script>
var modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
var storage = weex.requireModule('storage');
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
      value:'',
      page:1,
      index:0,
      dataLists:[],
      refreshing:false,
      loadinging:false,
      lastPage:false,
      token:''
    };
  },
  created(){
    self = this;
    this.evn = weex.config.env.osName;
    // 获取上页面传过来的参数
    self.value = self.$route.params.value;
    self.index = self.$route.params.index;
    // 调用获取数据的方法
    self.getData(self.page,self.index);
    // 获取 token
    storage.getItem('data',function(ret) {
      if(ret.result == 'success'){
        self.token = JSON.parse(ret.data).token;
        // modal.toast({message:self.token,duration:10});
      }else{
        modal.toast({message:'token 获取失败',duration:1});
      }
    })

  },
  methods:{
    // 返回上一页面
    goBack(){
      self.$router.go(-1);
    },
    // 获取网络数据
    getData(page,index){
      // 开启等待视图
      systemModule.beginWait({message:'数据加载中'});
      var self = this;
      switch(index){
        case 0:{
          var url = "http://121.40.152.92:8080/gushici/api/poem/authorPoem?page="+page+"&author="+self.value;
        }
        break;
        case 1:{
          var url = "http://121.40.152.92:8080/gushici/api/poem/dynasityPoem?page="+page+"&dynasity="+self.value;
        }
        break;
        case 2:{
          var url = "http://121.40.152.92:8080/gushici/api/poem/congshuPoem?page="+page+"&congshu="+self.value;
        }
        break;
        case 3:{
          var url = "http://121.40.152.92:8080/gushici/api/poem/fenleiPoem?page="+page+"&fenlei="+self.value;
        }
        break;
        default:{
          return;
        }
      }
      stream.fetch({
        method:'GET',
        url:url,
        type:'json'
      },function (ret) {
        // 关闭等待视图
        systemModule.endWait();
        if(!ret.ok){
          modal.toast({message:!ret.ok,duration:1});
        }else{
          if(ret.data.code == 0){
            if(self.page == 1){
              self.dataLists = ret.data.data.list;
            }else{
              var lists = ret.data.data.list;
              lists.forEach(element => {
                self.dataLists.push(element);
              });
            }
            self.lastPage = ret.data.data.lastPage;
          }else{
            modal.toast({message:ret.data.msg,duration:1});
          }
        }
      });
    },
    // 下拉刷新
    onrefresh(){
      self.page = 1;
      this.refreshing = true;
      setTimeout(() => {
        this.refreshing = false;
        self.getData(self.page,self.index);
      }, 300);
    },
    // 上拉加载
    onloading(){
      self.page ++;
      this.loadinging = true;
      setTimeout(() => {
        this.loadinging = false;
        self.getData(self.page,self.index);
      }, 300);
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
    gotoPerson(){
      //modal.toast({message:'12',duration:1});
      self.$router.push({
        name:'PersonInfo',
        params:{
          name:self.value,
          token:self.token
        }
      });
    }
  }
}
</script>

