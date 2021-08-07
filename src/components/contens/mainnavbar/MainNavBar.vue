<template>
  <div class="main-tab-bar">
    <nav-bar>
     <nav-bar-item path='/home'>
       <img src="~assets/img/navbar/home.svg" alt="" slot="item-icon">
       <img src="~assets/img/navbar/home_active.svg" alt="" slot="item-icon-active">
       <span slot="item-text">首页</span>
     </nav-bar-item>
      <nav-bar-item path="/category">
        <img src="~assets/img/navbar/category.svg" alt="" slot="item-icon">
        <img src="~assets/img/navbar/category_active.svg" alt="" slot="item-icon-active">
        <span slot="item-text">分类</span>
      </nav-bar-item>
      <nav-bar-item path="/shopcart">
        <img src="~assets/img/navbar/shopcart.svg" alt="" slot="item-icon">
        <img src="~assets/img/navbar/shopcart_active.svg" alt="" slot="item-icon-active">
        <span slot="item-text">购物车</span>
      </nav-bar-item>
      <nav-bar-item path="/profile">
        <img src="~assets/img/navbar/profile.svg" alt="" slot="item-icon">
        <img src="~assets/img/navbar/profile_active.svg" alt="" slot="item-icon-active">
        <span slot="item-text">我的</span>
      </nav-bar-item>
    </nav-bar>
  </div>

</template>

<script>

  import NavBar from 'components/common/navbar/NavBar';
  import NavBarItem from 'components/common/navbar/NavBarItem';
  export default {
    name: "MainTabBar",
    components:{
      NavBarItem,
      NavBar
    }
  }
</script>

<style scoped>

</style>
