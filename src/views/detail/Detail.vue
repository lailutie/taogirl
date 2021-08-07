<template>
	<div>
		<span>详情页</span>
		<p>{{iid}}</p>
	</div>
</template>

<script>
	export default {
		name: "Detail",
		data() {
			return {
				iid: null
			}
		},
		created() {
			this.iid = this.$route.params.iid
		}
	}
</script>

<style>
</style>
