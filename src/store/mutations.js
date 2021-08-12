import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutations-types.js'


export default {
		//mutations中的方法最好单一一点，便于监听？
		[ADD_COUNTER](state, payload) {
			payload.count ++
		},
		[ADD_TO_CART](state, payload) {
			payload.checked = false
			state.cartList.push(payload)
		}
  }