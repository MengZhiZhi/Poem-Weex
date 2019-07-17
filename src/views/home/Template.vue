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
                 right-text="搜索"
                 :bar-style="navBarStyle"
                 @wxcMinibarRightButtonClicked="rightSearch">
        <div slot="left"></div>
    </wxc-minibar>

  </div>
</template>
<style scoped src='../css/home.css'>
</style>

<script>
var modal = weex.requireModule('modal');

import{WxcMinibar} from 'weex-ui';
export default {
  components:{
      WxcMinibar
  },
  data(){
    return{
      evn:''
    };
  },
  created(){
    this.evn = weex.config.env.osName;
  },
  methods:{
  }
}
</script>

