<template>
  <div id="personalized">
      <swiper />
      <div class="loading" v-show="isloading">
        <li class="el-icon-loading" ></li>
        <p>loading...</p>
      </div>
      
    <div class="title">
    <h3>推荐歌单</h3>
    </div>
      <music-list :RecommendedSongList="RecommendedSongList" />
    <div class="title">
    <h3>推荐歌单</h3>
    </div>
    <private-content :getExclusiveBroadcastList="getExclusiveBroadcastList"/>
    <div class="title">
    <h3>最新歌单</h3>
    </div>
    <new-song :newsonglist="newsonglist" />
  </div>

  
</template>

<script>
import Swiper from '../../../../content/swiper/Swiper.vue'
import { _getBanner , 
        _getRecommendedSongList ,
        _getExclusiveBroadcastList,
        _getPersonalizedNewsong, 
        _getSongsDetail, 
        songDetail } from '@/network/discover'
import MusicList from '../musicList.vue'
import PrivateContent from '../PrivateContent.vue'
import NewSong from '../NewSong.vue'
export default {
  data () {
    return {
      limit:15,
      banners:[],
      RecommendedSongList: [],
      getExclusiveBroadcastList:[],
      newsonglist:[],
      isloading:true
    }
  },
  components: { 
    Swiper,
    MusicList,
    PrivateContent,
    NewSong 
    },
    created () {
      _getRecommendedSongList(this.limit).then(res=>{
        this.RecommendedSongList=res.result
        // console.log(res);
      })
      _getExclusiveBroadcastList(3).then(res =>{
        console.log(res);
        this.getExclusiveBroadcastList=res.result
      })
      _getPersonalizedNewsong().then(res=>{
        for(let i of res.result){
          _getSongsDetail(i.id).then(result=>{
            let song = new songDetail(result.songs)
            this.newsonglist.push(song)
          })
        }
      })
      setTimeout(()=>{
        if(this.isloading){
          this.isloading=!this.isloading
        }
      },1000)
    },
    name:'personalized'
}
</script>

<style lang="less" scoped>
.title {
    margin-top: 20px;
    font-size: 18px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }
  .loading{
    position: absolute;
    z-index: 999;
    font-size: 50px;
    color: red;
    left: 40%;
    top: 12%;
    text-align: center;
    p{
      font-size: 20px;
    }
  }
</style>