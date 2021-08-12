<template>
		<swiper class="detailSwper">
			<swiper-item v-for="item in topImages">
				<img :src="item" >
			</swiper-item>
		</swiper>
</template>

<script>
	import {Swiper, SwiperItem} from "components/common/swiper/index.js"
	
	export default {
		name: "DetailSwiper",
		components: {
			Swiper,
			SwiperItem
		},
		props: {
			topImages: {
				type: Array,
				default() {
					return []
				}
			},
		}
	}
</script>

<style scoped>
	.detailSwper {
		height: 250px;
		overflow: hidden;
		margin-top: 44px;
	}
</style>
