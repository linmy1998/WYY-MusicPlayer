<template>
  <div class="NewsongList" v-infinite-scroll='scrollLoad' infinite-scroll-delay='1000'>
    <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="item.name" :name="item.value +''" v-for="item in area" :key="item.value">
         <new-song-table v-if='activeName == item.value' :musiclist='musiclist'/>
      </el-tab-pane>  
    </el-tabs>

  </div>
</template>

<script>
// 组件
import NewSongTable from './NewSongTable.vue'
// 请求路由
import { _getTopSongs, _getSongsDetail, songDetail } from '@/network/discover'

export default {
    components: {
    NewSongTable
  },
  data () {
    return {
      activeName: '0',
      area: [
        { value: 0, name: "全部" },
        { value: 7, name: "华语" },
        { value: 96, name: "欧美" },
        { value: 16, name: "韩国" },
        { value: 8, name: "日本" }
      ],
      page: 1,
      offset: 0,
      musiclist: [],
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
    }
  },
  methods: {
    handleClick () {
      this.offset = 0
      this.page = 1
      this.musiclist = []
      this.getTopSong()
    },
    getTopSong () {
      if (this.offset > 100) return
      _getTopSongs(this.activeName - 0).then(result => {
        // console.log(result.data);
        let list = result.data.slice(this.offset, this.page * 30)
        for (let i of list) {
          _getSongsDetail(i.id).then(res => {
            let song = new songDetail(res.songs)
            // console.log(song);
            this.musiclist.push(song)
          })
        }
        this.offset = this.page * 30;
        this.page++;
      })
    },
    scrollLoad () {
      console.log('到底');
    this.getTopSong()
    }
  },
  created () {
    this.getTopSong()
  }
}
</script>

<style lang='less'>
.NewsongList {
  margin-bottom: 80px;
  width: 100%;
  .el-tabs {
    .el-tabs__nav-scroll {
      display: flex !important;
      justify-content: start !important;
      .el-tabs__item {
        font-size: 12px;
      }
    }
  }
}
.scroll {
  overflow: auto;
}
</style>
