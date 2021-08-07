 /* 
防抖函数，防止refresh调用过于频繁
*/
export function debounce(func, delay) {
				let timer = null
				return function(...args) {
					if(timer) clearTimeout(timer)
					timer = setTimeout(() => {
						func.apply(this, args)
					}, delay)
				}
			}