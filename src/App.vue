<template>
  <div id="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
    <main-nav-bar></main-nav-bar>
  </div>
</template>

<script>
	// import NavBar from "components/navbar/NavBar.vue"
	// import NavBarItem from "components/navbar/NavBarItem.vue"
	import MainNavBar from "components/contens/mainnavbar/MainNavBar.vue"
	
export default {
  name: 'App',
	components: {
		MainNavBar
	}
}
</script>

<style>
	@import url("assets/css/base.css");
</style>
