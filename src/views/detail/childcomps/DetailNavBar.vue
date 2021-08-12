<template>
	<div>
		<top-nav>
			<div slot="left" class="detailLeft" @click="back">
				<img src="~assets/img/common/back.svg" >
			</div>
			<div slot="center" class="detailCenter">
				<div v-for="(item, index) in titles" 
						 class="detailCenterItem"
							:class="{active: index === currentIndex}"
							 @click="detailCenterItemClick(index)" >{{item}}</div>
			</div>
		</top-nav>
	</div>
</template>

<script>
	import TopNav from "components/common/topnav/TopNav.vue"
	
	export default {
		name: "DetailNavBar",
		components: {
			TopNav
		},
		data() {
			return {
				titles: ['商品', '详情', '评论', '更多'],
				currentIndex: 0
			}
		},
		methods: {
			detailCenterItemClick(index) {
				this.currentIndex = index
				
				this.$emit("titleClick", index)
			},
			back() {
				this.$router.go(-1)
				// this.$router.back()
			}
		},
	}
</script>

<style scoped>
	.detailCenter {
		display: flex;
		font-size: 13px;
		/* background-color: #FFFFFF; */
	}
	.detailCenterItem {
		flex: 1;
	}
	.detailLeft img{
		margin-top: 10px;
	}
	.active {
		color: #FF0000;
	}
</style>
