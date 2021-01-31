<template>
  <div id="PrivateContent">
    <ul>
      <li v-for="item in getExclusiveBroadcastList" :key="item.id">
        <i class="el-icon-video-camera">&#xe614;</i>
        <img :src="item.sPicUrl" alt="">
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name:'PrivateContent',
    props: {
        getExclusiveBroadcastList:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style lang="less" scoped>
#PrivateContent {
  overflow: hidden;
  margin-bottom: 40px;
  ul {
    display: flex;
    justify-content: space-between;
    li {
      cursor: pointer;
      position: relative;
      width: 335px;
      height: auto;
      cursor: pointer;
      color: #222;
      i {
        position: absolute;
        color: #fff;
        left: 5px;
        font-size: 24px;
      }
      img {
        width: 100%;
      }
      p {
        margin-top: 2px;
      }
    }
  }
}
</style>