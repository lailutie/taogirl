import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutations-types.js'

export default {
		addCart(context, payload) {
			//查找新加入的商品再cartList中是否存在
			let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
			
			if(oldProduct) {
				context.commit(ADD_COUNTER, oldProduct)
			}else {
				payload.count = 1
				context.commit(ADD_TO_CART, payload)
			}
		}
  }