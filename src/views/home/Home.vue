<template>
  <div id="home">
   <el-container>
     <el-header>
        <nav-bar></nav-bar>
      </el-header>
    <el-container>
      <el-aside width="200px">
          <aside-menu />
          
      </el-aside>
      <el-main>
        <top-bar/>
      </el-main>
    </el-container>
   </el-container>
   <player/>
  </div>
</template>

<script>
import navBar from '@/components/common/navbar/navBar.vue'
import AsideMenu from '@/components/common/asideMenu/asideMenu.vue'
import TopBar from '@/components/common/main/TopBar.vue'
import Player from '@/components/common/player/Player.vue'
export default {
    name:'Home',
    components: { 
      navBar,
      AsideMenu,
        TopBar,
        Player
      },
}
</script>

<style lang='less'>
.el-header {
  position: relative;
  width: 100%;
  z-index: 150;
  padding: 0 !important;
  background-color: #c62f2f;
  margin-bottom: 10px;
}
.el-aside {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  }
.el-main {
  // margin-bottom: 90px;
  // background-color: #8a8a8a;
  position: absolute;
  left: 200px;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
}

</style>