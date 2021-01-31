<template>
  <div class="aside">
    <dl>
      <dt>推荐</dt>
      <dd class="cursorPointer"
          :class="{current : currentindex === index}"  
          v-for="(item,index) in recommend"
          @click="tabClick(index)">
          <img :src="item.imgUrl">
          {{item.title}}
          </dd>
    </dl>
    <dl>
      <dt>我的歌单</dt>
      <dd :class="['cursorPointer',current==item.id ? 'current':'']" v-for="item in songList" :key="item.id" @click="toSong(item.id)"><i class="iconfont">&#xe83e;</i>{{item.name}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
    name:'asideMenu',
  data () {
    return {
      currentindex: 0,
      recommend:[
        {title:'发现音乐',imgUrl:require('@/assets/img/music-ali.svg')},
        {title:'全部MV',imgUrl:require('@/assets/img/mv-ali.svg')}
      ]
    }
  },
  methods: {
    tabClick(index){
      this.currentindex=index
    },
    toPath (path) {
      // window.sessionStorage.setItem('path', path)
      this.current = path
      this.$router.push(path)
    },
    toSong (id) {
      this.current = id
      this.$router.push({ path: '/home/musiclistdetail', query: { id } })
    }
  },
  created () {
    // this.current = window.sessionStorage.getItem('path')
  },
  computed: {
    songList () {
      return this.$store.state.songList
    }
  }
}
</script>

<style lang='less' scoped>
.aside {
  margin-bottom: 160px;
  dl {
    margin: 0;
    margin: 10px 0;
    margin-bottom: 20px;
    img{
        width: 22px;
        height: 22px;
        margin-top: 5px;
        margin-right: 5px;       
    }
    dt {
      padding-left: 10px;
      height: 33px;
      font-size: 14px;
    }
    dd {
      width: 200px;
      box-sizing: border-box;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: #555;
      height: 33px;
      line-height: 33px;
      font-size: 15px;
      padding-left: 18px;
      border-left: 2px solid transparent;
      transition: 0.2s all;
      i {
        font-size: 18px;
        margin-right: 10px;
      }
      &:hover {
        color: #000;
      }
    }
    dd.current {
      color: #222;
      border-left: 2px solid #c62f2f;
      background-color: #e6e7ea;
    }
  }
}
</style>
