<template>
    <div class="tagcontainer">
      <div class="tag-top">
          <span class="selecttag">已选择:</span><span class="cleartag"><a @click="clearall()">清除所有</a></span>
      </div>
      <div class="tag-content">
          <el-tag v-for="item in tagitems" :key="item.label" effect="plain" :closable="true">{{item.label}}</el-tag>
      </div>
    </div>
</template>

<script>
export default {
  name: "Home",
  props:{
    tagitems:{
      type:Array,
      default(){
         return []
      }
    }
  },
  data() {
    return {
      
    };
  },
  created() {},

  methods: {
    clearall(){
      this.tagitems=[];
    }
  }
};
</script>
<style scoped>
  .tagcontainer{
    width:260px;
    height:100%;
    position: relative;
  }
  .tagcontainer>>>.el-tag--plain{
    margin-right:5px;
    margin-bottom:5px;
  }
  .tag-top{
    width:100%;
    height:42px;
  }
  .tag-top:after{
    clear: both;
  }
  .selecttag{
    float: left;
    font-size: 14px;
    line-height: 42px;
    font-family: "微软雅黑","苹方",sans-serif;
    color: #333;
  }
  .cleartag{
    float:right;
    font-size:14px;
    color:#3070b8;
    cursor: pointer;
    line-height: 42px;
  }
  .tag-content{
    border: solid 1px #e4e4e4;
    min-height: 535px;
    overflow: auto;
    padding:5px;
  }

</style>
