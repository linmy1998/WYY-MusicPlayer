<template>
  <div class="header">
      <div class="left">
          <img src="@/assets/img/logo.jpg" alt="">
          <p>网易云音乐</p>
          <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center">
           <el-input
                placeholder="请输入内容"
                v-model="input4"
                suffix-icon="el-input__icon el-icon-search"
                class="input_searh">
          </el-input>
      </div>
      <div class="right" style="cursor:wait"> 
        <div class="login" >
            <el-avatar icon="el-icon-user-solid" size='small'></el-avatar>
            <p >{{loginState}}</p>
        </div>
        <div class="map" style="cursor:wait">
             <i class="el-icon-minus cursorPointer"></i>
        <i class="el-icon-document-copy cursorPointer"></i>
        <i class="el-icon-close cursorPointer"></i>
        </div>
       
      </div>

  </div> 
</template>

<script>
export default {
    name:'navBar',
    data () {
        return {
           input4:'',
           loginState:'未登录' 
        }
    }
}
</script>

<style>
.header{
        display: flex;
        /* height: 44px; */
        line-height: 44px;
        margin-bottom:20px;
        background-color:#c62f2f;
        /* text-align: center; */
    }
    .left,.right{
        width: 300px;
        /* background-color: blue; */
		
    }
    .center{
        flex: 1;
    }
 .header{
    position: relative;
}
.left{
    position:absolute;  
    display: flex;  
}
.left img{
    width: 30px;
    height: 30px;
    margin: 15px 10px;
    border-radius: 10px;
}
.left p{
    margin-top: 8px;
    color: #fff;
}
.left i{
     margin: 20px 40px;
     font-size: 20px;
     color: #fff;
 }
 .input_searh{
     margin:10px 250px;
     width: 200px;
 }
 .right{
     display: inline-flex;
 }
 .login{
     position:absolute;  
    display: flex; 
    margin: 15px 20px; 
 }
 .login p{
     margin-top: -6px;
     margin-left: 20px;
    color: #fff;
 }
 .map{
     flex: 1;
     color: #fff;
     margin-left: 150px;
     margin-top: 8px;
 }
 .map i{
     margin-left: 25px;
 }
</style>