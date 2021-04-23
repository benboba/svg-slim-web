<template>
	<div id="side" :class="visible ? '' : 'hidden'">
		<span class="fixer">
			<a href="#side"><i class="el-icon-setting"/></a>
			<a href="#list"><i class="el-icon-top"/></a>
		</span>
		<h1 @mouseenter="hover(true)" @mouseleave="hover(false)" @click="toggle"><i :class="isHover ? visible ? 'el-icon-caret-right' : 'el-icon-caret-left' : 'el-icon-setting'"/>Optimize settings</h1>
		<config/>
	</div>
</template>

<script lang="ts">
import Config from './Config.vue';
import Vue from 'vue';
export default Vue.extend({
	data() {
		return {
			isHover: false,
		};
	},
	props: {
		visible: Boolean,
	},
	components: {
		Config,
	},
	methods: {
		hover(isHover: boolean) {
			this.isHover = isHover;
		},
		toggle() {
			this.$emit('update:visible', !this.visible);
		},
	},
});
</script>


<style scoped>
#side {
	display: flex;
	flex-direction: column;
	height: calc(100% - 13vh);
	position: fixed;
	right: 0;
	top: 10vh;
	transition: right .7s;
	width: 400px;
	z-index: 2;
}

#side.hidden {
	right: -370px;
}

#side.hidden >>> #config {
	margin-left: 40px;
}

#side h1 {
	background-color: #f06966;
	border-radius: 20px 0 0 20px;
	color: #fff;
	cursor: pointer;
	font-size: 18px;
	height: 40px;
	line-height: 40px;
	margin: 0;
	padding-left: 12px;
	transition: background-color .5s;
}

#side h1:hover {
	background-color: #f1ac9d;
}

#side h1 i {
	margin-right: 15px;
}

#side .fixer {
	bottom: 5vh;
	display: none;
	position: fixed;
	right: 2vw;
	z-index: 2;
}

#side .fixer a {
	background-color: #f06966;
	border-radius: 50%;
	color: #fff;
	display: block;
	margin-top: 10px;
	padding: 10px;
	text-align: center;
	text-decoration: none;
}

#side .fixer a:hover {
	background-color: #f1ac9d;
}

#side .fixer i {
	display: block;
	font-size: 30px;
}

@media screen and (max-width: 768px) {
	#side {
		margin-top: 5vmin;
		position: static;
		width: auto;
	}

	#side >>> #config {
		margin-left: 0!important;
		width: auto;
	}

	#side h1 {
		border-radius: 0;
		pointer-events: none;
	}

	#side .fixer {
		display: block;
	}
}
</style>
