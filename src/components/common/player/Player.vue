<template>
  <div>
    <div class="musicplay">
      <div class="play-top" v-show="showTop">
        <div class="image">
          <img :src="userinfo.pic" alt="">
        </div>
        <div class="userinfo">
          <div class="info">
            <div class="title">{{userinfo.name}}</div>
            <div class="nickname">{{userinfo.song}}</div>
          </div>
          <div class="warp">
            <i class="el-icon-star-off"></i>
            <i class="el-icon-share"></i>            
          </div>
        </div>
      </div>
      <div class="play-left">
        <i class="el-icon-d-arrow-left" ></i>
        <i class="el-icon-video-play" @click="musicPlay()" v-if="musicStatus" key="1"></i>
        <i class="el-icon-video-pause" @click="musicStop()" v-else key="2"></i>
        <i class="el-icon-d-arrow-right" ></i>
      </div>
      <div class="play-right">
        <div class="startTime">{{currentTime}}</div>
         <el-slider :disabled='sliderDisabled' @change='sliderChange' v-model="sliderTimer" :show-tooltip='false'>
        </el-slider>
        <div class="startTime">{{duration}}</div>
        <div class="sound">
          <!-- <i class="iconfont"  >&#xe63b;</i>
          <i class="iconfont"  >&#xe666;</i> -->
          <img src="../../../assets/img/volume-ali.svg" alt="" @click="soundHandle()" v-if="!musicSound">
          <img src="../../../assets/img/jy-ali.svg" alt="" @click="soundHandle()" v-else>
          <div class="audio">
            <audio autoplay  ref="audio"  @play="playLoad()"  @timeupdate='timeupdate'    :src="playList.src"></audio>
          </div>
          <el-slider :show-tooltip='false' v-model="volume" >
          </el-slider>
        </div>
        <div class="order">
          <el-tooltip class="item" effect="dark" content="顺序播放" placement="top">
            <img src="../../../assets/img/sequence-ali.svg" alt="">
            <!-- <i class="iconfont">&#xe802;</i> -->
          </el-tooltip>
          <!-- <el-tooltip class="item" effect="dark" content="随即播放" placement="top">
          <i class="iconfont">&#xe71f;</i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="单曲循环" placement="top">
          <i class="iconfont">&#xe66d;</i>
        </el-tooltip> -->
        </div>
        <div class="musicList">
          <el-tooltip class="item" effect="dark" content="播放列表" placement="top">
            <img src="../../../assets/img/playList-ali.svg" alt="">
            <!-- <i class="iconfont" @click="isShowMusicplaylist=!isShowMusicplaylist">&#xe83e;</i> -->
          </el-tooltip>
        </div>
      </div>
    </div>
    <!-- <transition name="Musicplaylist">
      <music-play-list v-show="isShowMusicplaylist" :currentIndex='currentIndex' :musicList='musicList'></music-play-list>
    </transition>

    <music-lyric ref="musicLyric"></music-lyric> -->
  </div>
</template>

<script>
// import { _getSongUrl, _getLyric } from '@/network/song'
import { playlistTool } from './playTool'
import { _getSongUrl } from '@/network/song'
import { formatDate, deepClone } from '@/static/js/tool'
// import MusicPlayList from './MusicPlayList'
// 歌词
// import MusicLyric from './MusicLyric'
export default {
    name:'player',
  data () {
    return {
      playList: {
        src: ""
      },
      musicList: [],
      currentIndex: 0,
      // 当前播放位置
      // slider的位置
      sliderTimer: 0,
      // slider是否禁用
      sliderDisabled: false,
      currentTime: '00:00',
      // 音频的长度
      duration: '00:00',
      showTop: false,
      userinfo: {
        name: '',
        pic: '',
        id: '',
        song: ''
      },
      // 当前是播放还是暂停
      musicStatus:true,
      // 是否禁音
      musicSound: false,
      // 音量
      volume: 50,
      // 播放列表
      isShowMusicplaylist: false,
      // 播放类型
      playbackType: 1
    }
  },
  methods: {
      musicPlay(){
         this.$nextTick(() => {
        if (this.playList.src !== '') {
          this.$refs.audio.play()
          this.$refs.audio.volume = 0
          this.musicStatus = false
        }
      })
      },
      async musicStop () {
      this.musicStatus = true
      // await this.musicGradients('down')
      this.$refs.audio.pause()
    },
    sliderChange (val) {
      // 更新的时间位置等于  新位置的百分比 * 总的时间长度
      this.$refs.audio.currentTime = val / 100 * this.$refs.audio.duration
    },
    // 当歌曲加载完成播放时
    playLoad () {
      this.$refs.audio.volume = this.volume / 100
      this.duration = this.musicList[this.currentIndex].time
    },
    // 歌曲时间信息  
    timeupdate () {
      // 在歌曲停止的一瞬间 this.$refs.audio 是undefined 然后就会报错。。
      if (!this.$refs.audio) return
      // 当前时间
      // console.log(this.$refs.audio);
      // console.log(this.$refs.audio.duration);
      let duration = new Date(this.$refs.audio.duration * 1000)
      let currentTime = new Date(this.$refs.audio.currentTime * 1000)
      this.currentTime = formatDate(currentTime, 'mm:ss')
      // 滑块的位置
      this.sliderTimer = currentTime / duration * 100

      // this.$store.commit('editCurrentTime', currentTime)
      // console.log(this.sliderTimer);
    },
    getSongUrl(id){
      _getSongUrl(id).then(res=>{
        
        const result = new playlistTool(res.data[0])
        this.playList.src=result.src
      })
    },
     init () {
      this.getSongUrl(this.musicList[this.currentIndex].id)
       this.showTopHandle(this.musicList[this.currentIndex])
    },
    showTopHandle (info) {
      this.userinfo = info
      this.showTop = true
    },
    // 控制禁音
    soundHandle () {
      this.musicSound = !this.musicSound
      if (this.musicSound) {
        this.volume = 0
        this.$refs.audio.volume = 0
      } else {
        this.volume = 100
        this.$refs.audio.volume = this.volume/100
      }
    },
   },
  mounted () {
    this.$bus.$on('playMusic', (index, list) => {
      // 对传递过来的list 克隆一下
      let cloneList = []
      deepClone(cloneList, list)
      this.currentIndex = index
      this.musicList = cloneList
      this.init()
      this.musicStatus=false
      console.log(this.musicList);
    })
   
  },
  beforeDestroy () {
    // 貌似这个组件会一直存在。。。
    // this.$bus.$off('playMusic')
    // this.$bus.$off('pushPlayMusic')
  },
  watch: {
    // 监听音量
    
  },
  components: {
    // MusicPlayList,
    // MusicLyric
  },
  computed: {
    // 变成计算属性
    
  }
}
</script>

<style lang='less' scoped>
i {
  cursor: pointer;
}
.Musicplaylist-enter-active,
.Musicplaylist-leave-active {
  transition: opacity 0.3s;
}
.Musicplaylist-enter, .Musicplaylist-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.musicplay {
  display: flex;
  position: absolute;
  z-index: 150;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e1e1e2;
  background-color: #f6f6f8;
  height: 50px;
  img{
        color: #8a8a8a;
        width: 20px;
        height: 20px;
      }
  .play-top {
    position: absolute;
    top: -60px;
    width: 200px;
    height: 60px;
    box-sizing: border-box;
    padding: 5px;
    background-color: #fff;
    display: flex;
    align-items: center;
    .image {
      position: relative;
      width: 45px;
      height: 45px;
      img {
        width: 100%;
        height: 100%;
      }
      .imageIconfont {
        display: none;
        position: absolute;
        left: 0;
        width: 45px;
        color: #fff;
        text-align: center;
        height: 45px;
        font-size: 30px;
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
    .image:hover {
      .imageIconfont {
        display: inline-block;
      }
    }
    .userinfo {
      flex: 1;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      margin-left: 10px;
      .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .title {
          width: 110px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .nickname {
          width: 76px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      .warp {
        width: 10px;
        display: flex;
        flex-wrap: wrap;
        margin-right: 5px;
        align-items: center;
        justify-content: center;
        i {
          font-size: 15px;
          margin-top: 3px;
          cursor: pointer;
        }
      }
    }
  }
  .play-left {
    width: 200px;
    align-items: center;
    display: flex;
    justify-content: center;
    i {
      cursor: pointer;
      font-size: 30px;
      color: #c62f2f;
      border-radius: 50%;
      border: 1px solid #fff;
      margin: 10px;
      vertical-align: top;
    }
  }
  .play-right {
    flex: 1;
    display: flex;
    align-items: center;
    .startTime {
      // width: 20px;
      margin-right: 20px;
    }
    .el-slider {
      flex: 1;
      margin-right: 10px;
    }
    .sound {
      display: flex;
      align-items: center;
      width: 130px;
      .el-slider {
        flex: 1;
      }
      i {
        width: 25px;
        margin-right: 5px;
      }
      img{
        color: #8a8a8a;
        margin-right: 8px;
        width: 20px;
        height: 20px;
      }
    }
    .startTime {
      margin-left: 20px;
    }
    .order {
      margin: 0 10px;
    }
    .musicList {
      margin: 0 10px;
      margin-right: 30px;
      
    }
  }
}

</style>