<template>
	<div class="goods-list-item" @click="goodsDetail">
		<img :src="showImages" @load="imgload">
		<div class="list-item-info">
			<p>{{goodsItem.title}}</p>
			<span class="price">{{goodsItem.price}}</span>
			<span class="cfav">{{goodsItem.cfav}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "GoodsListItem",
		props: {
			goodsItem: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		methods: {
			imgload() {
				this.$bus.$emit("itemImgLoad")
			},
			goodsDetail() {
				this.$router.push('/detail/' + this.goodsItem.iid)
			}
		},
		computed: {
			showImages() {
				return this.goodsItem.image || this.goodsItem.show.img 
			}
		}
	}
</script>

<style>
	.goods-list-item {
		padding-bottom: 40px;
		position: relative;
		width: 48%;
	}
	.goods-list-item img {
		width: 100%;
		border-radius: 5px;
	}
	.list-item-info {
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: center;
	}
	.list-item-info p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 3px;
	}
	.list-item-info .price {
		color: #FF0000;
		margin-right: 20px;
	}
	.list-item-info .cfav {
		position: relative;
	}
	.list-item-info .cfav::before{
		content: '';
		position: absolute;
		left: -15px;
		top: -1px;
		width: 14px;
		height: 14px;
		background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
	}
</style>
