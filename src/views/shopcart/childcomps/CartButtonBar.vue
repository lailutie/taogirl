<template>
	<div class="button-bar">
		<div class="check-content">
			<check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
			<span>全选</span>
		</div>
		<div class="price">
			总计：{{totalPrice}}
		</div>
		<div class="calculate">
			去结算({{checkLength}})
		</div>
	</div>
</template>

<script>
	import CheckButton from "components/contens/checkbutton/CheckButton.vue"
	
	import {mapGetters} from "vuex"
	
	export default {
		name: "CartButtonBar",
		components: {
			CheckButton
		},
		computed: {
			...mapGetters(['cartList']),
			totalPrice() {
				return '￥' + this.cartList.filter(item => {
					return item.checked
				}).reduce((preValue, item) => {
					return preValue + item.price * item.count
				}, 0)
			},
			checkLength() {
				return this.cartList.filter(item => item.checked).length
			},
			isSelectAll() {
				if(this.cartList.length === 0) {
					return false
				}
				return !this.cartList.find(item => !item.checked)
			}
		},
		methods: {
			checkClick() {
				if(this.isSelectAll){
					this.cartList.forEach(item => item.checked = false) 
				}else{
					this.cartList.forEach(item => item.checked = true)
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.button-bar {
		position: relative;
		display: flex;
		height: 40px;
		background-color: #CCCCCC;
		line-height: 40px;
		text-align: center;
	}
	.check-content {
		display: flex;
		flex: 1;
		width: 30px;
		font-size: 14px;
		align-items: center;
	}
	.check-button {
		height: 15px;
		flex: 0;
		margin-left: 20px;
	}
	.check-content span {
		/* flex: 1; */
		margin-left: 10px;
	}
	.price {
		flex: 1;
	}
	.calculate {
		flex: 1;
		width: 100px;
		background-color: red;
		color: #FFFFFF;
	}
</style>
