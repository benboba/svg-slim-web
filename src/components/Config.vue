<template>
	<section id="config" v-if="Object.keys(config).length">
		<h2>Common configuration</h2>
		<div class="rule">
			<ul class="slider">
				<li><el-slider :min="0" :max="8" v-model="config.params.sizeDigit"/>Numerical precision of coordinates</li>
				<li><el-slider :min="0" :max="8" v-model="config.params.angelDigit"/>Numerical precision of angel &amp; zoom</li>
				<li><el-slider :min="0" :max="8" v-model="config.params.trifuncDigit"/>Numerical precision of trigonometric function results</li>
				<li><el-slider :min="0" :max="8" v-model="config.params.opacityDigit"/>Numerical precision of opacity</li>
				<li><el-slider :min="0" :max="10" v-model="config.params.thinning"/>Threshold for path thinning</li>
				<li><el-slider :min="0" :max="10" v-model="config.params.straighten"/>Threshold for curve to straight line</li>
				<li><el-slider :min="0" :max="10" v-model="config.params.mergePoint"/>Threshold for combine adjacent points</li>
			</ul>
			<ul class="switch">
				<li><el-switch v-model="config.params.rmAttrEqDefault"/>Remove the same attribute as the default value</li>
				<li><el-switch v-model="config.params.exchangeStyle"/>Ignore the style tag for style and attribute conversion</li>
				<li><el-switch v-model="config.params.ignoreKnownCSS"/>Only keep CSS styles that can be converted to attributes</li>
			</ul>
		</div>
		<h2>Attributes</h2>
		<div class="rule">
			<h3><el-switch v-model="config.rules['shorten-decimal-digits'][0]"/>Shorten the decimal</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['shorten-color'][0]"/>Shorten the color</h3>
			<ul>
				<li><el-switch :disabled="!config.rules['shorten-color'][0]" v-model="config.rules['shorten-color'][1].rrggbbaa"/>Support 8-bit hexadecimal color</li>
			</ul>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['combine-transform'][0]"/>Shorten the transform</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['shorten-id'][0]"/>Shorten the ID and remove the unquoted ID</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['rm-px'][0]"/>Remove px unit</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['rm-version'][0]"/>Remove the version attribute of the svg element</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['rm-attribute'][0]"/>Remove unnecessary attributes</h3>
			<ul>
				<li><el-switch :disabled="!config.rules['rm-attribute'][0]" v-model="config.rules['rm-attribute'][1].keepEvent"/>Keep all event listener attributes</li>
				<li><el-switch :disabled="!config.rules['rm-attribute'][0]" v-model="config.rules['rm-attribute'][1].keepAria"/>Keep all aria attributes</li>
			</ul>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['rm-viewbox'][0]"/>Remove unnecessary viewBox attribute</h3>
		</div>
		<h2>Shapes</h2>
		<div class="rule">
			<h3><el-switch v-model="config.rules['combine-path'][0]"/>Combine adjacent path elements</h3>
			<ul class="switch">
				<li><el-switch :disabled="!config.rules['combine-path'][0]" v-model="config.rules['combine-path'][1].disregardFill"/>Combine when fill is not none</li>
				<li><el-switch :disabled="!config.rules['combine-path'][0]" v-model="config.rules['combine-path'][1].disregardOpacity"/>Combine ignore transparency</li>
			</ul>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['compute-path'][0]"/>Shorten the d attribute of path</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['shorten-shape'][0]"/>Shorten shape elements</h3>
		</div>
		<h2>Styles</h2>
		<div class="rule">
			<h3><el-switch v-model="config.rules['shorten-class'][0]"/>Shorten className and remove unquoted className</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['rm-illegal-style'][0]"/>Remove illegal CSS styles</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['shorten-style-attr'][0]"/>Convert styles and attributes</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['shorten-style-tag'][0]"/>Shorten the style tag</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['apply-style'][0]"/>Apply style to element</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['style-to-class'][0]"/>Extract common className for the same style</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['rm-important'][0]"/>Remove unnecessary !important in the style</h3>
		</div>
		<h2>Nodes</h2>
		<div class="rule">
			<h3><el-switch v-model="config.rules['rm-comments'][0]"/>Remove comments</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['rm-doctype'][0]"/>Remove DocType declaration</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['rm-xml-decl'][0]"/>Remove xml declaration</h3>
		</div>
		<h2>Elements</h2>
		<div class="rule">
			<h3><el-switch v-model="config.rules['collapse-textwrap'][0]"/>Collapse unnecessary tspan elements</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['collapse-g'][0]"/>Collapse or remove unnecessary g elements</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['rm-hidden'][0]"/>Remove hidden and invisible elements</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['rm-irregular-nesting'][0]"/>Remove irregularly nested elements</h3>
			<ul>
				<li>
					<p>List of elements that ignore this rule: <el-button type="text" size="mini" @click="handleClear(irregularNesting)">Clear</el-button></p>
					<el-tag
						:key="tag"
						v-for="tag in irregularNesting"
						:closable="config.rules['rm-irregular-nesting'][0]"
						:disable-transitions="false"
						@close="handleClose(irregularNesting, tag)"
					>
						{{tag}}
					</el-tag>
					<el-input
						:disabled="!config.rules['rm-irregular-nesting'][0]"
						v-model="rmIrregularNesting"
						placeholder="Batch input, non-letter separated"
						@keyup.enter.native="handleInputConfirm(irregularNesting, 'rmIrregularNesting')"
						@blur="handleInputConfirm(irregularNesting, 'rmIrregularNesting')"
						size="mini"
					/>
				</li>
			</ul>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['rm-irregular-tag'][0]"/>Remove non-standard elements</h3>
			<ul>
				<li>
					<p>List of elements that ignore this rule: <el-button type="text" size="mini" @click="handleClear(irregularTag)">Clear</el-button></p>
					<el-tag
						:key="tag"
						v-for="tag in irregularTag"
						:closable="config.rules['rm-irregular-tag'][0]"
						:disable-transitions="false"
						@close="handleClose(irregularTag, tag)"
					>
						{{tag}}
					</el-tag>
					<el-input
						:disabled="!config.rules['rm-irregular-tag'][0]"
						v-model="rmIrregularTag"
						placeholder="Batch input, non-letter separated"
						@keyup.enter.native="handleInputConfirm(irregularTag, 'rmIrregularTag')"
						@blur="handleInputConfirm(irregularTag, 'rmIrregularTag')"
						size="mini"
					/>
				</li>
			</ul>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['rm-unnecessary'][0]"/>Remove unnecessary elements</h3>
			<ul>
				<li>
					<p>List of elements to remove: <el-button type="text" size="mini" @click="unnecessaryRevert">Restore</el-button></p>
					<el-tag
						:key="tag"
						v-for="tag in unnecessary"
						:closable="config.rules['rm-unnecessary'][0]"
						:disable-transitions="false"
						@close="handleClose(unnecessary, tag)"
					>
						{{tag}}
					</el-tag>
					<el-input
						:disabled="!config.rules['rm-unnecessary'][0]"
						v-model="rmUnnecessary"
						placeholder="Batch input, non-letter separated"
						@keyup.enter.native="handleInputConfirm(unnecessary, 'rmUnnecessary')"
						@blur="handleInputConfirm(unnecessary, 'rmUnnecessary')"
						size="mini"
					/>
				</li>
			</ul>
		</div>
		<h2>Others</h2>
		<div class="rule">
			<h3><el-switch v-model="config.rules['rm-xmlns'][0]"/>Optimize xml namespace</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['shorten-defs'][0]"/>Optimize defs</h3>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['shorten-animate'][0]"/>Optimize animation elements</h3>
			<ul class="switch">
				<li><el-switch :disabled="!config.rules['shorten-animate'][0]" v-model="config.rules['shorten-animate'][1].remove"/>Remove animation elements directly</li>
			</ul>
		</div>
		<div class="rule">
			<h3><el-switch v-model="config.rules['shorten-filter'][0]"/>Optimize filter elements</h3>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import { config } from '../utils/store';

export default Vue.extend({
	data() {
		return {
			config,
			rmIrregularNesting: '',
			rmIrregularTag: '',
			rmUnnecessary: '',
			defaultUnnecessary: 'desc,discard,foreignObject,video,audio,iframe,canvas,metadata,script,title,unknown',
		};
	},
	computed: {
		unnecessary(): string[] {
			return (this.config.rules['rm-unnecessary'][1] as { tags: string[] }).tags;
		},
		irregularNesting(): string[] {
			return (this.config.rules['rm-irregular-nesting'][1] as { ignore: string[] }).ignore;
		},
		irregularTag(): string[] {
			return (this.config.rules['rm-irregular-tag'][1] as { ignore: string[] }).ignore;
		},
	},
	methods: {
		handleClear(tags: string[]) {
			tags.length = 0;
			this.$forceUpdate();
		},
		handleClose(tags: string[], tag: string) {
			tags.splice(tags.indexOf(tag), 1);
			this.$forceUpdate();
		},
		handleInputConfirm(tags: string[], inputVal: 'rmIrregularNesting' | 'rmIrregularTag' | 'rmUnnecessary') {
			const vals = this[inputVal].trim().split(/[^a-z]+/i);
			vals.forEach(tag => {
				if (tag && !tags.includes(tag)) {
					tags.push(tag);
				}
			});
			this[inputVal] = '';
		},
		unnecessaryRevert() {
			this.unnecessary.length = 0;
			this.unnecessary.push(...this.defaultUnnecessary.split(','));
		},
	},
});
</script>

<style scoped>
#config {
	background: #fff;
	border-radius: 0 0 0 15px;
	box-shadow: 1px 1px 5px 3px rgba(0,0,0,.1);
	height: 100%;
	margin-left: 20px;
	overflow: auto;
	padding: 15px;
	transition: margin-left .7s;
	width: 350px;
}

#config h2 {
	border-left: 4px solid #f06966;
	font-size: 15px;
	line-height: 20px;
	margin: 0;
	padding-left: 6px;
}

#config h2~h2 {
	margin-top: 30px;
	position: relative;
}

#config h2~h2::before {
	border-top: 1px solid #dee2d1;
	content: '';
	left: 0;
	position: absolute;
	top: -15px;
	width: 100%;
}

#config .rule {
	background: #f3f3f3;
	border: 1px solid #eee;
	border-radius: 15px;
	margin: 10px 0;
	padding: 10px;
}

#config h3 {
	align-items: center;
	display: flex;
	font-size: 14px;
	margin: 0;
}

#config ul {
	background: #fff;
	border-radius: 5px;
	margin: 10px 0 0;
	padding: 10px 20px;
}

#config .slider li,
#config .switch li {
	align-items: center;
	display: flex;
}

#config li {
	font-size: 13px;
	list-style: none;
	padding: 6px 0;
}

#config li+li {
	border-top: 1px dotted #ccc;
}

#config li p {
	margin: 6px 0;
}

#config .el-switch,
#config .el-slider {
	margin-right: 10px;
}

#config .el-switch.is-checked >>> .el-switch__core {
	background-color: #6abe83;
	border-color: #6abe83;
}

#config .el-slider {
	flex-shrink: 0;
	width: 40px;
}

#config >>> .el-slider__bar {
	background-color: #6abe83;
}

#config >>> .el-slider__button {
	border-color: #6abe83;
	height: 6px;
	border-radius: 3px;
	width: 6px;
}

#config >>> .el-slider__runway {
	margin: 5px 0;
}

#config .el-slider >>> .disabled {
	opacity: .6;
}

#config .el-tag {
	margin: 0 3px 3px 0;
}
</style>
