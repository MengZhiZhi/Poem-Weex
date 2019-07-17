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
                 @wxcMinibarLeftButtonClicked="goBack"
                 @wxcMinibarRightButtonClicked="getFollow()">
        <div slot="middle">
            <text class="nav-middle-text">{{title}}</text>
        </div>
    </wxc-minibar>
    <!-- 内容 -->
    <wxc-tab-page :tab-titles="tabTitles" 
                  :tab-styles="tabStyles" 
                  title-type="text"
                  @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
        <scroller show-scrollbar="false" class="content" v-for="(value,index) in tabTitles" :key="index">
            <div calss ="content-scroller">
                <!-- 共向孤城别河南省鹿邑县的一所农村学校正在修建学生宿舍，原计划今年秋季开学投入使用，但在打地基时就发现，他们遇上了25吨问题水泥。今天，鹿邑县志成实验学校校长张光启对中国青年报·中国青年网记者出示了工人清除问题水泥时的视频。那些“凝固”的水泥块，单手就能捏碎。为了把那些劣质水泥清除干净，“后期工人们是用手一块一块把水泥抠下来的。”“幸亏这些‘假水泥’被发现得早，如果学生入住出了事才发现就完了。”张光启感到害怕。张光启说，由于25吨问题水泥，该校近千名农村寄宿学生今年秋季只能挤在教室里睡觉。该校已经向厂家索赔，但双方就赔偿方案各持己见。坐落于鹿邑县观堂镇的志成实验学校是一所民办学校，设有小学和初中部，共有在校生1700余人。张光启说，这里的学生主要是周边的农村孩子，其中寄宿生960多名，许多是留守儿童。原有的学生宿舍由当地棉花加工厂的机器厂房改建，住宿条件很差，也很拥挤。为了改善办学条件，该校包括借款在内，今年筹资300余万元，准备建造一栋四层的新宿舍楼。工程于2019年3月16日动工，原计划7月15日完工。没想到，问题在打地基时就出现了。3月26日，志成实验学校从鹿邑县水泥经销商张记芳处购买了25吨“海固中联牌”水泥，一次性支付货款9750元。次日，施工队打地基时为宿舍楼预制了用于承重、抗震的地梁。但是，3天后，施工队准备立钢架、竖梁作业时发现，通常3天就会凝固的地梁混凝土依然稀松，施工被迫停止。4月4日，在看到地梁混凝土依旧没有凝固后，志成实验学校校方怀疑买到了“假水泥”。他们联系了经销商张记芳，对方未能对该批水泥质量给予明确答复。校方于4月4日下午将水泥样品送往河南省淮阳县亿捷工程质量检测有限公司化验，样品显示水泥抗折强度、抗压强度均未达标。张光启表示，4月中旬，“海固中联牌”水泥生产厂家——山东省枣庄市鹏源建材有限公司曾来人取样，回厂检测后称水泥“合格”。4月23日，志成实验学校将经销商和厂家投诉至鹿邑县市场监督管理局。该局受理后，对该批次水泥进行抽样，并派专车将样品送至安徽省亳州市产品质量监督检验所检验。记者从亳州市产品质量监督检验所6月份出具的检验报告上看到，该水泥样品显示抗折强度（3天）平均值为0.8，国家标准是大于等于2.5；抗压强度（3天）平均值为3.4，国家标准是大于等于10.0；抗折强度（28天）平均值为3.9，国家标准是大于等于5.5，抗压强度（28天）平均值为15.8，国家标准大于等于32.5，结论是样品不合格。“这表示该批水泥属于不合格产品。”鹿邑县市场监督管理局主管稽查工作的负责人告诉中国青年报·中国青年网记者，接到校方投诉后，该局迅速进行抽样检测，并依据检测结果召集校方、经销商、厂方进行调解。“我接了订单后，是从厂家直接把水泥运到学校的。”经销商张记芳对中国青年报·中国青年网记者表示，他当时共运了50吨水泥，志成实验学校购买了其中一半。他认可该批水泥“不合格”的结果，表示自己也是受害者。他说，自己无法鉴定水泥合格与否，何况，厂家向他出示了有效的工业产品生产许可证、营业执照和商标注册证。志成实验学校向厂家提出索赔额度为30余万元。张光启说，赔偿方案是学校依据施工成本、用工合同、当地工资水平认真核算出的，没有过高要求。包括首次预制材料费和机械、人工费，清除“假水泥”费用，赴淮阳、商丘、亳州6次产生的化验费及相关费用，合同延期赔偿费，技术监理、看场人员工资，因工程延期造成学校管理、学生流失、赔偿及退费等，截至6月13日，共计33.2763万元。鹏源建材有限公司不同意校方提出的赔偿方案。除了这25吨，同一批次其他水泥有多少吨、卖到了哪里？今天，记者多次致电该公司相关负责人、经办人，均未获回应。鹏源建材有限公司一位法律顾问向记者表示，对方要价太高，公司无法接受。而对于这批不合格水泥如何出厂卖到学校，这位律师表示并不知情。张光启说，早在4月第一次鉴定发现水泥不合格后，学校就与厂家商议尽快赔偿，当时校方核算的赔偿费用为10.6834万元，但厂家不同意，仅打算赔偿已经使用的大约4吨水泥的费用，这让学校无法接受。“光把那些‘假水泥’打下来，就雇了12个人干了12天。”张光启说。 -->
                <text v-if="index == 0" class="content-text">{{yuanwen}}</text>
                <text v-else-if="index == 1" class="content-text">{{fanyi}}</text>
                <text v-else-if="index==2" class="content-text">{{shangxi}}</text>
                <text v-else-if="index == 3" class="content-text">{{zhushi}}</text>
            </div>
        </scroller>

    </wxc-tab-page>    
  </div>
</template>
<style scoped src='../css/poetryDetails.css'>
</style>

<script>
var modal = weex.requireModule('modal');
var storage = weex.requireModule('storage');
var stream = weex.requireModule('stream');

import{WxcMinibar,WxcTabPage} from 'weex-ui';
var self;
export default {
  name:'PoetryDetails',
  components:{
      WxcMinibar,
      WxcTabPage
  },
  data(){
    return{
      evn:'',
      followIcon:'https://www.easyicon.net/api/resizeApi.php?id=1229334&size=72',
      isFollow:false,
      tabTitles:[
        {title:'原文'},
        {title:'翻译'},
        {title:'赏析'},
        {title:'注释'}
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
      id:0,
      token:'',
      title:'',
      yuanwen:'暂无内容',
      fanyi:'暂无内容',
      shangxi:'暂无内容',
      zhushi:'暂无内容',
      poemId:''

    };
  },
  created(){
    self = this;
    this.evn = weex.config.env.osName;

    self.id = this.$route.params.uid;

    //获取token
    storage.getItem('data',function (ret) {
      if(ret.result == 'success'){
        var data = JSON.parse(ret.data);
        self.token = data.token;
        //发送网络请求,获取数据
        self.getData(self.id,self.token);
      }else{
        modal.toast({message:'获取数据失败',duration:1});
      }
    });

  },
  methods:{
      goBack(){
        this.$router.go(-1);
      },
      getFollow(){
        if(self.isFollow){
          var url = "http://121.40.152.92:8080/gushici/api/user/unLikePoem?token="+this.token+"&poem_id="+this.poemId;
        }else{
          var url = "http://121.40.152.92:8080/gushici/api/user/likePoem?token="+this.token+"&poem_id="+this.poemId;
        }
        stream.fetch({
          method:'GET',
          url:url,
          type:'json'
        },function(ret) {
          if(!ret.ok){
            modal.toast({message:"操作失败",duration:1});
          }else{
            if(!self.isFollow){
              modal.toast({message:"收藏成功",duration:1});
              self.followIcon = "https://www.easyicon.net/api/resizeApi.php?id=1229846&size=72";
              self.isFollow = !self.isFollow;
            }else{
              modal.toast({message:"取消收藏",duration:1});
              self.followIcon = "https://www.easyicon.net/api/resizeApi.php?id=1229334&size=72";
              self.isFollow = !self.isFollow;
            }
          }
        });
      },
      //获取数据
      getData(id,token){
        var url = "http://121.40.152.92:8080/gushici/api/poem/detailPoem?id="+id+"&token="+token;
        stream.fetch({
          method:'GET',
          url:url,
          type:'json'
        },function(ret) {
          modal.toast({message:ret.ok,duration:1});
          if(!ret.ok){
            modal.toast({message:'网络请求失败',duration:1});
          }else{
            if(ret.data.code == 0){

              self.title = ret.data.data.title;

              self.poemId = ret.data.data.id;

              self.isFollow = ret.data.data.like;

              if(self.isFollow){
                self.followIcon = "https://www.easyicon.net/api/resizeApi.php?id=1229846&size=72";
              }else{
                self.followIcon = "https://www.easyicon.net/api/resizeApi.php?id=1229334&size=72";
              }

              if(ret.data.data.yuanwen.length != 0){
                self.yuanwen = ret.data.data.yuanwen;
              }

              if(ret.data.data.fanyi.length != 0){
                self.fanyi = ret.data.data.fanyi;
              }

              if(ret.data.data.shangxi.length != 0){
                self.shangxi = ret.data.data.shangxi;
              }

              if(ret.data.data.zhushi.length != 0){
                self.zhushi = ret.data.data.zhushi;
              }
            }
          }
        });
      }
  }
}
</script>

