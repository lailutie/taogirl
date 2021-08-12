<template>
	<div class="CartList">
		<scroll class="content" ref="scroll">
			<cart-list-item v-for="(item, index) in cartList" :product="item" :key="index"/>
		</scroll>
	</div>
</template>

<script>
	import Scroll from "components/common/scroll/Scroll.vue"
	import CartListItem from "./CartListItem.vue"
	
	import {mapGetters} from "vuex"
	
	export default {
		name: "CartList",
		components: {
			Scroll,
			CartListItem
		},
		computed: {
			...mapGetters(['cartList'])
		},
		activated() {
			this.$refs.scroll.refresh()
		}
	}
</script>

<style scoped>
	.CartList {
		height: calc(100% - 49px - 40px - 44px);
		margin-top: 44px;
		/* margin-bottom: 49px; */
	}
	.content {
		height: 100%;
		overflow: hidden;
	}
</style>
