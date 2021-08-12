<template>
	<div class="check-button">
		<img src="~assets/img/cart/tick.svg" :class="{check: isChecked}">
	</div>
</template>

<script>
	export default {
		name: "CheckButton",
		props: {
			isChecked: {
				type:Boolean,
				default() {
					return false
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.check-button {
		border-radius: 50%;
		border: 2px solid #aaa;
	}
	.check {
		border-color: red;
		background-color: red;
	}
</style>
