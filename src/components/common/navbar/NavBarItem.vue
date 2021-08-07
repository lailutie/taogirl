<template>
 <div class="nav-bar-item" @click="itemClick">
   <div v-if="!isActive">
     <slot name="item-icon"></slot>
   </div>
   <div v-else="isActive==true">
     <slot name="item-icon-active"></slot>
   </div>
   <div class="item-text" :style="activeStyle">
     <slot name="item-text"></slot>
   </div>
 </div>
</template>

<script>
  export default {
    name: "NavBarItem",
    data(){
      return {}
    },
    props:{
      path: String,
      activeColor:{
        type: String,
        default: 'red'
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }
    },
    computed: {
      isActive(){
        return this.$route.path.indexOf(this.path) != -1
      },
      activeStyle(){
        return this.isActive ? {color: this.activeColor} : {}
      }
    }

  }
</script>

<style scoped>
  .nav-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .nav-bar-item img{
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin: 4px 0 2px 0;
  }
</style>
