<template>
	<div class="tab-control">
		<div class="tab-control-item"
		 v-for="(item, index) in titles" 
		 :class="{active: index === currentIndex}" 
		 @click="itemClick(index)" >
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TabControl",
		props: {
			titles: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		methods: {
			itemClick(index) {
				this.currentIndex = index
				this.$emit("tabGoodsClick", index)
			}
		}
	}
</script>

<style scoped>
	.tab-control {
		display: flex;
		text-align: center;
		font-size: 14px;
		height: 40px;
		line-height: 40px;
		background-color: #FFFFFF;
	}
	.tab-control-item {
		flex: 1;
	}
	.active {
		color: #FF0000;
	}
	.active span {
		padding: 4px;
		border-bottom: 3px solid #FF0000;
	}
</style>
