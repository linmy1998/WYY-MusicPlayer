<template>
  <div>
    <div class="swiperBox">
      <ul ref="swiper" class="swiper">
        <i class="el-icon-arrow-left pre">&#xe65a;</i>
        <li v-for="item in banners" :key="item.imageUrl">
          <img :src="item.imageUrl" alt="">
        </li>
        <i class="el-icon-arrow-right next">&#xe65c;</i>
      </ul>
      <ol ref="swiperOl">
        <li v-for="item in banners" :key="item.imageUrl"></li>
      </ol>
    </div>
  </div>
</template>

<script>
// 轮播图组件
import { _Swiper } from '@/components/content/swiper/swiper.js'
import { _getBanner } from '@/network/discover'
export default {
  data () {
    return {
      banners: []
    }
  },
  // created () {
  //     _getBanner().then(res=>{
  //         console.log(res.banners);
  //         this.banners=res.banners
  //     })
  // },
  methods: {
    async getBanners () {
      _getBanner().then(res => {
        this.banners = res.banners
        this.$nextTick(() => {
          _Swiper(this.$refs.swiper, this.$refs.swiperOl)
        })
      })
    }
  },
  mounted () {
    this.getBanners()
  },
  beforeDestroy () {
    _Swiper()
  }
}
</script>

<style lang='less' scoped>
.swiperBox {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 270px;

  overflow: hidden;
  .swiper {
    display: flex;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 1045px;
    height: 200px;
    position: relative;
    li {
      cursor: pointer;
      z-index: 99;
      transition: 0.4s all;
      position: absolute;
      list-style: none;
      img {
        width: 530px;
      }
    }
    i {
      border: 150px solid transparent;
      border-left: 0;
      position: absolute;
      z-index: 101;
      font-size: 30px;
      color: #ccc;
      cursor: pointer;
    }
    & :hover {
      color: #fff;
    }
    .next {
      border: 150px solid transparent;
      border-right: 0;
      right: 0;
    }
  }
  ol {
    display: flex;
    align-items: center;
    top: 30px;
    width: 1030px;
    height: 10px;
    position: relative;
    justify-content: center;
    margin-bottom: 10px;
    li {
      list-style: none;
      border-bottom: 5px solid #fff;
      border-top: 5px solid #fff;
      margin: 0 10px;
      width: 30px;
      height: 5px;
      border-radius: 2px;
      cursor: pointer;
      & :hover {
        background-color: red;
      }
    }
  }
}
</style>
