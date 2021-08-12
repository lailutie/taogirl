<template>
	<div class="cart">
		<top-nav class="cart-nav">
			<div slot="center">购物车({{cartLength}})</div>
		</top-nav>
		<cart-list/>
		<cart-button-bar/>
	</div>
</template>

<script>
	import TopNav from "components/common/topnav/TopNav.vue"
	import CartList from "./childcomps/CartList.vue"
	import CartButtonBar from "./childcomps/CartButtonBar.vue"
	
	import {mapGetters} from "vuex"
	
	export default {
		name: "ShopCart",
		components: {
			TopNav,
			CartList,
			CartButtonBar
		},
		computed: {
			...mapGetters(['cartList', 'cartLength'])
		}
	}
</script>

<style>
	.cart {
		height: 100vh;
	}
	.cart-nav {
		background-color: #FF0000;
		color: #FFFFFF;
	}
</style>
