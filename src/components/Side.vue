<template>
	<div id="side" :class="visible ? '' : 'hidden'">
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
</style>
