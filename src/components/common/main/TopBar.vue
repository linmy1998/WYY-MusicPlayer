<template>
  <div id="topbar">
      <el-tabs  v-model="activeName">
    <el-tab-pane label="个性推荐" name="first">
          <personalized v-show="activeName=='first'" />    
        </el-tab-pane>
        <el-tab-pane label="歌单" name="second">
          <popularsonglist v-if="activeName == 'second'" />
        </el-tab-pane>
        <el-tab-pane label="主播电台" name="third">主播电台</el-tab-pane>
        <el-tab-pane label="排行榜" name="fourth">
          <ran-king-list v-if="activeName == 'fourth'" />
        </el-tab-pane>
        <el-tab-pane label="歌手" name="fifth">
          <artist-list v-if="activeName == 'fifth'"/>
        </el-tab-pane>
        <el-tab-pane label="最新音乐" name="sixth">
          <new-song-list v-if="activeName == 'sixth'" />
          <!-- <newsong-list ></newsong-list> -->
        </el-tab-pane>
    
  </el-tabs>
  </div>
</template>

<script>
import ArtistList from './childComps/artist/ArtistList.vue'
import NewSongList from './childComps/newSongList/NewSongList.vue'
import Personalized from './childComps/personalized/Personalized.vue'
import Popularsonglist from './childComps/popularsonglist/Popularsonglist'
import RanKingList from './childComps/ranKingList/RanKingList.vue'
export default {
  components: { 
    Personalized,
    Popularsonglist,
    RanKingList,
    ArtistList,
    NewSongList
    },
    name:'TopBar',
    data () {
        return {
            activeName:'first'
        }
    }
}
</script>

<style lang='less' scoped>
#topbar {
  width: 100%;
  position: relative;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}

</style>