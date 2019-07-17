<template>
  <div class="wapper">
    <!-- 判断是否是IOS -->
    <div class="isTop"></div>
    <!-- 添加导航栏 -->
    <wxc-minibar class="nav"
                 title="测试模块" 
                 background-color="#5fc1e3"
                 show="true"
                 text-color="#FFFFFF"
                 @wxcMinibarLeftButtonClicked="goBack">
    </wxc-minibar>

    <!-- 测试: 动态添加 List 列表的数据 -->
    <scroller class="list">
        <div v-for="(value,index) in lists" :key="index">
            <div class="list-bottom">
                <text class="list-text">{{value.name}}{{value.age}}</text>
            </div>
        </div>
    </scroller>

    <text class="addBtn" @click="addData">点击添加</text>

  </div>
</template>

<style scoped>
/* src='../css/home.css' */
.isTop{
    width: 750px;
    height: 45px;
    background-color: #5fc1e3;
}
.list{
    width: 750px;
    height: 750px;
    background-color: green;
}
.list-bottom{
    width: 710px;
    height: 300px;
}
.list-text{
    width: 710px;
    height: 300px;
    text-align: center;
}
.addBtn{
    width: 750px;
    height: 300px;
    text-align: center;
    padding-top: 100px;
}
</style>

<script>
var modal = weex.requireModule('modal');

import{WxcMinibar} from 'weex-ui';
var self;
export default {
  components:{
      WxcMinibar
  },
  data(){
    return{
      evn:'',
      lists:[
          {name:'abc',age:13},
          {name:'123',age:13},
          {name:'234',age:13},
          {name:'54',age:13},
          {name:'65',age:13},
          {name:'ab765c',age:13},
          {name:'67',age:13},
          {name:'78',age:13},
          {name:'364',age:13}
      ]
    };
  },
  created(){
      self = this;
      this.evn = weex.config.env.osName;
  },
  methods:{
      goBack(){
          self.$router.go(-1);
      },
      addData(){
          var data = {name:'add123'};
          self.lists.unshift(data);
      }
  }
}
</script>


