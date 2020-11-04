declare interface IConfig {
	rules: {
		[prop: string]: [boolean] | [boolean, {
			[prop: string]: boolean | number | string[];
		}]
	};
	params: {
		sizeDigit: number;
		angelDigit: number;
		trifuncDigit: number;
		opacityDigit: number;
		thinning: number;
		straighten: number;
		mergePoint: number;
		rmAttrEqDefault: boolean;
		exchangeStyle: boolean;
		ignoreKnownCSS: boolean;
	};
}
