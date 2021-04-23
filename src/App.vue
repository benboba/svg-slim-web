<template>
	<div id="app">
		<nav id="nav">
			<a href="https://github.com/benboba/svg-slim" target="_blank">GITHUB</a>
			<a href="https://npmjs.com/package/svg-slim" target="_blank">NPM</a>
		</nav>
		<h1 id="logo">SVG Slim</h1>
		<svg-list :visible="side_visible"/>
		<side :visible.sync="side_visible"/>
	</div>
</template>

<script>
import Side from './components/Side.vue';
import SvgList from './components/SvgList.vue';
export default {
	name: 'app',
	components: {
		Side,
		SvgList,
	},
	data() {
		return {
			side_visible: true,
		};
	},
};
</script>

<style>
html, body, #app {
	min-height: 100vh;
}

body {
	background-image: linear-gradient(45deg, #f3f3f3 25%, transparent 0, transparent 75%, #f3f3f3 0), linear-gradient(45deg, #f3f3f3 25%, transparent 0, transparent 75%, #f3f3f3 0);
	background-position: 0 0, 10px 10px;
	background-size: 20px 20px;
	color: #252c41;
	min-height: 100vh;
}

a {
	color: #252c41;
	text-decoration: none;
}

a:hover {
	color: #f06966;
	text-decoration: underline;
}

#app .el-button--primary {
    background-color: #f06966;
    border-color: #f06966;
}

#app .el-button--primary:hover {
    background-color: #f1ac9d;
    border-color: #f1ac9d;
}

#nav {
	font-size: 14px;
	position: absolute;
	right: 20px;
	top: 20px;
}

#nav a {
	margin-left: 20px;
}

#logo {
	color: #f06966;
	font-size: 20px;
	left: 20px;
	margin: 0;
	padding-bottom: 10vmin;
	position: absolute;
	text-align: center;
	top: 20px;
}
</style>
