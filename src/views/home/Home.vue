<template>
	<div id="home">
		<top-nav class="home-nav">
			<div slot="center">淘女友</div>
		</top-nav>
		<tab-control :titles="['热门', '新款', '流行']"
									class="homeTabControl1"
									@tabGoodsClick="tabGoodsClick" 
									v-show="istabcontrolshow" 
									ref="tabControl1" ></tab-control>
									
		<scroll class="content" 
						ref="scroll" 
						@scroll="contentScroll"
						:probeType="3"  
						:pull-up-load="true" 
						@pullingUp="loadMore" >
			<home-swiper :banners="banners" @swiperImageLoader="swiperImageLoader"></home-swiper>
			<recommend-view :recommends="recommends"></recommend-view>
			<today-hot></today-hot>
			<tab-control :titles="['热门', '新款', '流行']" 
										class="homeTabControl0"
										@tabGoodsClick="tabGoodsClick" 
										ref="tabControl0" ></tab-control>
			<goods-list :goods="goods[tabGoodsOrder].list"></goods-list>
		</scroll>
		
		<back-top @click.native="backTopClick" v-show="showContentBackTop"></back-top>
	</div>
</template>

<script>
	import TopNav from 'components/common/topnav/TopNav.vue'
	
	import HomeSwiper from './childcomps/HomeSwiper.vue'
	import RecommendView from './childcomps/RecommendView.vue'
	import TodayHot from './childcomps/TodayHot.vue'
	import TabControl from 'components/contens/tabcontrol/TabControl.vue'
	import GoodsList from 'components/contens/goods/GoodsList.vue'
	import BackTop from 'components/contens/backtop/BackTop.vue'
	
	import Scroll from "components/common/scroll/Scroll.vue"
	
	import {getHomeMultiData, getHomeGoods} from "network/home.js"
	import {debounce} from "common/utils.js"
	
	export default {
		name: "Home",
		components: {
			TopNav,
			HomeSwiper,
			RecommendView,
			TodayHot,
			TabControl,
			GoodsList,
			BackTop,
			Scroll
		},
		data() {
		  return {
		    banners: [],
		    recommends: [],
				goods: {
					'new': {page: 0, list: []},
					'pop': {page: 0, list: []},
					'sell': {page: 0, list: []}
				},
				tabGoodsOrder: "pop",
				showContentBackTop: false,
				tabOffSetTop: 0,
				istabcontrolshow: false,
				saveY: 0
		  }
		},
		created() {
		  //1.请求多个数据
			this.getHomeMultiData()
			//请求home页的三个种类
			this.getHomeGoods('sell')
			this.getHomeGoods('new')
			this.getHomeGoods('pop')
			
		},
		mounted() {
			//监听图片加载完成，然后刷新
			const refresh = debounce(this.$refs.scroll.refresh, 100)
			this.$bus.$on("itemImgLoad", () => {
				// console.log("123123123")
				// this.$refs.scroll.refresh()
				refresh()
			})
		},
		methods: {
			/* 
			 监听滚动事件
			 */
			contentScroll(position) {
				// console.log(position)
				this.showContentBackTop = (-position.y) > 1000
				
				//决定tabcontrol吸顶
				this.istabcontrolshow = (-position.y) > this.tabOffSetTop
			},
			/* 上拉加载更多 */
			loadMore() {
				// console.log("load more")
				this.getHomeGoods(this.tabGoodsOrder)
			},
			/* 
			 返回顶部操作
			 */
			backTopClick() {
				// console.log("en")
				this.$refs.scroll.scrollTo(0, 0, 500)
			},
			swiperImageLoader() {
				this.tabOffSetTop = this.$refs.tabControl0.$el.offsetTop
			},
			// destroyed() {
			// 	console.log(123)
			// },
			activated() {
				this.$refs.scroll.scrollTo(0, this.saveY, 0)
				this.$refs.scroll.refresh()
			},
			decativated() {
				this.saveY = this.$refs.scroll.getScrollY()
			},
			// 网络请求
			getHomeMultiData() {
				getHomeMultiData().then(res => {
				  this.banners = res.data.banner.list;
				  this.recommends = res.data.recommend.list;
				})
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1
				getHomeGoods(type, page).then(res => {
					// console.log(res)
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
					
					// 再次加载
					this.$refs.scroll.finishPullUp()
				})
			},
			// 点击切换商品事件
			tabGoodsClick(index) {
				// console.log(index)
				switch(index) {
					case 0:
						this.tabGoodsOrder = "pop"
						break
					case 1:
						this.tabGoodsOrder = "new"
						break
					case 2:
						this.tabGoodsOrder = "sell"
						break
				}
				this.$refs.tabControl1.currentIndex = index
				this.$refs.tabControl0.currentIndex = index
			},
		}
	}
</script>

<style scoped>
	#home {
		position: relative;
		height: 100vh;
	}
	.home-nav{
	  background-color: red;
	  color: #fff;
		position: relative;
		z-index: 10;
/* 		position: fixed;
		top: 0;	
		right: 0;
		left: 0;
		z-index: 10; */
	}
	.content {
		position: absolute;
		top: 44px;
		left: 0;
		right: 0;
		bottom: 49px;
		overflow: hidden;
	}
	.homeTabControl1 {
		position: relative;
		z-index: 10;
	}
</style>
