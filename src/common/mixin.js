import { debounce } from "./utils"

import BackTop from 'components/contens/backtop/BackTop.vue'

export const imgListenerMixin = {
  data() {
    return {
      // 监听图片
      imgListener: null
    }
  },
  mounted() {
    // 给防抖函数赋值一个新的函数
    const refresh = debounce(this.$refs.scroll.refresh, 50)

    // 接收发射的事件总线,并用监听图片变量保存
    this.imgListener = () => {
      refresh()
    }
    this.$bus.$on("imgLoad", this.imgListener)
  }
}

export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			showContentBackTop: false
		}
	},
	methods: {
		/*
		 返回顶部操作
		 */
		backTopClick() {
			this.$refs.scroll.scrollTo(0, 0, 500)
		},
		// listenShowBackTop(position) {
		// 	this.showContentBackTop = (-position.y) > 1000
		// }
	}
}