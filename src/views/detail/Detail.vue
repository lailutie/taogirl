<template>
	<div id="Detail">
		<detail-nav-bar class="detailNav" @titleClick="titleClick" ref="nav" ></detail-nav-bar>
		<scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
			<detail-swiper :top-images="topImages"></detail-swiper>
			<base-detail :goods="goods"></base-detail>
			<detail-shop-info :shop="shops"></detail-shop-info>
			<detail-images-info :images-info="detailsInfo" @imgLoad="imgLoad" />
			<detail-param-info :param-info="paramsInfo" class="detail-set-scroll" ref="param" />
			<detail-comment-info :comment-info="commentInfo" class="detail-set-scroll" ref="comment" />
			<goods-list :goods="recomments" ref="recommend" />
		</scroll>
		<back-top @click.native="backTopClick" v-show="showContentBackTop"></back-top>
		<detail-bottom-bar @addToCart="addToCart" />
	</div>
</template>

<script>
	import DetailNavBar from "./childcomps/DetailNavBar.vue"
	import DetailSwiper from "./childcomps/DetailSwiper.vue"
	import BaseDetail from "./childcomps/BaseDetail.vue"
	import DetailShopInfo from "./childcomps/DetailShopInfo.vue"
	import DetailImagesInfo from "./childcomps/DetailImagesInfo"
	import DetailParamInfo from "./childcomps/DetailParamInfo"
	import DetailCommentInfo from "./childcomps/DetailCommentInfo"
	import DetailBottomBar from "./childcomps/DetailBottomBar.vue"
	
	import Scroll from "components/common/scroll/Scroll.vue"
	import GoodsList from "components/contens/goods/GoodsList.vue"
	
	import {getDetail, Goods, Shop, GoodsParams, getRecommend} from "network/detail.js"
	import {debounce} from "common/utils.js"
	import {imgListenerMixin, backTopMixin} from "common/mixin.js"
	
	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			DetailSwiper,
			BaseDetail,
			DetailShopInfo,
			DetailImagesInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			Scroll,
			GoodsList
		},
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shops: {},
				detailsInfo: {},
				paramsInfo: {},
				commentInfo: {},
				recomments: [],
				themeTopYs: [],
				getThemeTopY: null,
				currentIndex: 0
			}
		},
		mixins: [imgListenerMixin, backTopMixin],
		created() {
			this.iid = this.$route.params.iid
			// console.log(this.iid)
			getDetail(this.iid).then(res => {
				const data = res.result;
				// console.log(data)
				//请求轮播图的图片
				this.topImages = data.itemInfo.topImages
				// 获取商品数据
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
				// 获取店铺数据
				this.shops = new Shop(data.shopInfo);
				// 获取下面的图片展示数据
				this.detailsInfo = data.detailInfo;
				// 获取尺寸数据
				this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule || {});
				// 获取评论数据
				if (data.rate.cRate !== 0) {
				  this.commentInfo = data.rate.list[0] || {};
				}
			}) 
			getRecommend().then(res => {
				// console.log(res)
				this.recomments = res.data.list;
			})
			this.getThemeTopY = debounce(() => {
				this.themeTopYs = []
				//点击跳转
				this.themeTopYs.push(0)
				this.themeTopYs.push(this.$refs.param.$el.offsetTop)
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
				this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
				
				// console.log(this.themeTopYs)
			}, 100)
		},
		methods: {
			imgLoad() {
			  this.$refs.scroll.refresh()
				//图片加载完后，对top进行计算
				this.getThemeTopY()
			},
			titleClick(index) {
				// console.log(index)
				this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
				
				this.currentIndex = index
				// console.log(this.currentIndex)
			},
			contentScroll(position) {
				// console.log(position)
				
				//方法一:
				const positionY = -position.y 
				let length = this.themeTopYs.length
				// console.log(length)
				for(let i = 0; i < length; i++){
					if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && 
					positionY < this.themeTopYs[i+1]) || (i === length -1 && positionY >= this.themeTopYs[i]))) {
						this.currentIndex = i
						this.$refs.nav.currentIndex = this.currentIndex
						// console.log(this.currentIndex)
					}
				}
				 
				 //方法二：在数组后面在push一个值，就不用单独为最后一个单独写一份逻辑判断，push一个Number.MAX_VALUE
				 //方法二：用空间换时间，性能更好
				 
				 //backtop的显示
				 this.showContentBackTop = (-position.y) > 1000
			},
			addToCart() {
				const product = {}
				product.image = this.topImages[0]
				product.title = this.goods.title
				product.desc = this.goods.desc
				product.price = this.goods.lowNowPrice
				product.iid = this.iid
				
				//提交到vuex,商品信息
				// this.$store.commit("addCart", product)
				this.$store.dispatch("addCart", product)
			}
		},
		mounted() {
			// const newRefresh = debounce(this.$refs.scroll.refresh, 100)
			// this.itemImgListener = () => { newRefresh() }
			// this.$bus.$on("itemImgLoad", this.itemImgListener)
		},
		destroyed() {
			this.$bus.$off("itemImgLoad", this.itemImgListener)
		},
	}
</script>

<style scoped>
	#Detail {
		background-color: #FFFFFF;
		position: relative;
		z-index: 10;
		height: 100vh;
	}
	.detailNav {
		position: relative;
		z-index: 10;
		background-color: #FFFFFF;
	}
	.content {
		height: calc(100% - 44px - 49px);
	}
</style>
