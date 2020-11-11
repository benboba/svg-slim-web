<template>
	<section id="list" :class="visible ? '' : 'noside'" v-loading="loading">
		<div class="input">
			<el-input v-model="inputText" :autosize="{maxRows:10}" placeholder="SVG source code can be directly pasted here, supporting xml or base64 formats" type="textarea" resize="none"/>
			<el-button type="primary" :disabled="!inputText.trim()" @click="submitText">Submit</el-button>
		</div>
		<section class="upload">
			<span class="tips"><i class="el-icon-upload"/>Click to upload, or drag and drop files to the page</span>
			<form ref="uploadForm"><input type="file" accept="image/svg+xml" @change="upload" multiple/></form>
		</section>
		<section class="item" v-for="(item, key) in list" :key="key">
			<p class="action">
				<span class="rate"><i class="el-icon-finished"/> {{item.rate}}%</span>
				<el-button icon="el-icon-download" type="text" @click="download(base64(item.output))">Download</el-button>
				<el-button icon="el-icon-copy-document" type="text" @click="copy(item.output)">XML</el-button>
				<el-button icon="el-icon-copy-document" type="text" @click="copy(base64(item.output))">Base64</el-button>
			</p>
			<el-tabs v-model="item.current">
				<el-tab-pane label="Optimization" name="output">
					<div class="detail">
						<p class="img" :style="`background-image:url(${base64(item.output)})`"></p>
						<p class="code">{{item.output}}</p>
					</div>
				</el-tab-pane>
				<el-tab-pane label="Original" name="input">
					<div class="detail">
						<p class="img" :style="`background-image:url(${base64(item.input)})`"></p>
						<p class="code">{{item.input}}</p>
					</div>
				</el-tab-pane>
			</el-tabs>
		</section>
		<section v-if="history.length" class="history">
			<h5>History <el-button type="text" @click="clear">Clear</el-button></h5>
			<template v-for="his in history">
				<h6 :key="his[0]">{{ his[0] }}</h6>
				<el-button v-for="(hisitem, index) in his[1]" :key="`${his[0]}-${index}`" @click="useHistory(hisitem)" :style="`background-image:url(${base64(hisitem)})`"/>
			</template>
		</section>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import SvgSlim from 'svg-slim';
import { config, files, readFiles, addHistory } from '../utils/store';
import { drag } from '../utils/drag';

interface IListItem {
	input: string;
	output: string;
	rate: number;
	current: string;
}

const HUNDRED = 100;

export default Vue.extend({
	data(): {
		list: IListItem[];
		inputText: string;
		history: string[];
		loading: boolean;
		config: typeof config;
		files: string[];
	} {
		return {
			list: [],
			inputText: '',
			history: [],
			loading: false,
			config,
			files,
		};
	},
	props: {
		visible: Boolean,
	},
	watch: {
		files() {
			this.format();
		},
	},
	mounted() {
		drag(files => {
			this.updFiles(files);
		});
		this.checkStorage();
		this.$watch('config', val => {
			this.format();
		}, {
			deep: true,
		});
	},
	methods: {
		checkStorage() {
			const history = localStorage.getItem('history');
			if (history) {
				try {
					this.history = JSON.parse(history);
				} catch (e) {}
			} else {
				this.history = [];
			}
		},

		format() {
			this.list = [];
			this.loading = true;
			Promise.all(this.files.map((input: string, index: number) => SvgSlim(input, this.config).then((output: string) => {
				this.list[index] = {
					input,
					output,
					rate: Math.round(output.length / input.length * HUNDRED * HUNDRED) / HUNDRED,
					current: 'output',
				};
				this.$forceUpdate();
				return input;
			}, (err: Error) => {
				this.$message({
					type: 'error',
					message: err.message,
				});
			}))).then(results => {
				const strs = results.filter(x => typeof x === 'string') as string[];
				if (strs.length) {
					addHistory(strs);
					this.checkStorage();
				}
			}).finally(() => {
				this.loading = false;
			});
		},

		upload(ev: ProgressEvent) {
			this.updFiles([].slice.call((ev.target as HTMLInputElement).files));
			(this.$refs.uploadForm as HTMLFormElement).reset();
		},

		updFiles(files: File[]) {
			readFiles(files).then(strs => {
				this.files = strs;
			});
		},

		base64(str: string) {
			return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(str)))}`;
		},

		copy(text: string, message = 'Code copied successfully!') {
			if (typeof document.execCommand === 'function') {
				const textarea = document.createElement('textarea');
				textarea.style.cssText = 'position:absolute;top:-999em';
				document.body.appendChild(textarea);
				textarea.value = text;
				textarea.focus();
				textarea.setSelectionRange(0, textarea.value.length);
				document.execCommand('copy', true);
				this.$message({
					showClose: true,
					message,
					type: 'success',
				});
				document.body.removeChild(textarea);
			} else {
				this.$message({
					showClose: true,
					message: 'This browser does not support copying!',
					type: 'error',
				});
			}
		},

		download(str: string) {
			const a = document.createElement('a');
			a.href = str;
			a.download = `svg-slim-${Math.random().toString(36).slice(2)}.svg`;
			a.click();
		},

		submitText() {
			let text = this.inputText;
			try {
				text = atob(text.slice(text.indexOf(',') + 1));
			} catch {}
			this.files = [text];
			this.inputText = '';
		},

		useHistory(text: string) {
			this.files = [text];
		},

		clear() {
			localStorage.removeItem('history');
			this.checkStorage();
		},
	},
});
</script>

<style scoped>
#list {
	padding: 10vh 420px 0 20px;
	transition: padding-right .7s;
}

#list.noside {
	padding-right: 40px;
}

.upload {
	background: #dee2d180;
	border-radius: 20px;
	height: 20vh;
	overflow: hidden;
	position: relative;
	transition: height .7s;
}

.upload:last-child {
	height: 50vh;
}

.upload .tips {
	color: #9a9;
	font-size: 2vh;
	pointer-events: none;
	position: absolute;
	text-align: center;
	transition: font-size .7s;
	width: 100%;
}

.upload:last-child .tips {
	font-size: 4vh;
}

.upload .tips i {
	display: block;
	font-size: 10vh;
	margin: 2vh auto;
	transition: all .7s;
}

.upload:last-child .tips i {
	font-size: 30vh;
	margin: 5vh auto 3vh;
}

.upload input {
	cursor: pointer;
	font-size: 100vw;
	opacity: 0;
	position: absolute;
	right: 0;
}

#list >>> .el-tabs__item {
	padding: 0 10px;
}

#list >>> .el-tabs__item.is-active {
	color: #f06966;
}

#list >>> .el-tabs__item:hover {
	color: #f1ac9d;
}

#list >>> .el-tabs__active-bar {
	background-color: #f06966;
}

.item {
	font-size: 14px;
	margin: 5vh 0;
	position: relative;
}

.item .detail {
	display: flex;
	padding: 10px 0;
}

.item .detail .img {
	background-position: center;
	background-repeat: no-repeat;
	background-size: contain;
	flex-shrink: 0;
	height: 12vw;
	margin-right: 2vw;
	width: 12vw;
}

.item .detail .code {
	flex-grow: 1;
	font-family: 'Courier New', Courier, monospace, sans-serif;
	font-size: 2vh;
	overflow: hidden;
	word-wrap: break-word;
}

.item .action {
	line-height: 40px;
	margin: 0;
	position: absolute;
	right: 0;
	text-align: right;
	z-index: 1;
}

.item .action::before {
	content: '';
	display: inline-block;
	width: 200px;
}

.item .action .rate {
	display: inline-block;
	margin-right: 20px;
}

.item .action .rate {
	color: #6abe83;
}

.input {
	margin-bottom: 3vh;
}

.input .el-button.is-disabled {
	opacity: .3;
}

.history h5 {
	color: #fff;
	font-size: 1em;
	text-shadow: 0 0 3px #000, 0 0 2px #000, 0 0 1px #000;
}

.history h6 {
	font-size: .8em;
	margin: 0 0 .5em;
}

.history h6 ~ h6 {
	margin-top: 1em;
}

.history h6 ~ .el-button {
	background-color: transparent;
	background-position: center;
	background-repeat: no-repeat;
	background-size: contain;
	border: none;
	height: 60px;
	margin: 0 10px 10px 0;
	padding: 0;
	vertical-align: middle;
	width: 60px;
}

.input {
	background: #fff;
	border-radius: 5px;
	box-shadow: 2px 2px 5px rgba(0,0,0,.2);
	display: flex;
}

.input .el-textarea >>> textarea {
    border: none;
	border-radius: 5px 0 0 5px;
	line-height: 31px;
	min-height: 100%!important;
}

.input .el-button {
	border-radius: 0 5px 5px 0;
}
</style>
