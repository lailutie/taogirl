<template>
  <div class="recommend-view">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div class="item-icon">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type: Array,
        default(){
          return []
        }
      }
    },
  }
</script>

<style scoped>
  .recommend-view{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 14px;

    padding: 10px 0 20px;
    border-bottom: 10px solid #eee
  }
  .recommend-item img{
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
	.recommend-item a{
		text-decoration: none;
	}
  .recommend-item{
    flex: 1;
  }
</style>
