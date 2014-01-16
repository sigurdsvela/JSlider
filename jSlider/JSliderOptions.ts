module jSlider {
	export class JSliderOptions {
		private static _defaults = {
			"delay" : 100, //Delay between each slide
			"duration" : 100 //The duration of the slide animation
		};
		
		private options : string[];
		
		constructor(options : Object) {
			this.options = _options.concat(options);
		}

		/**
		 * Get an option
		 * @param optionName
		 * @returns {string}
		 */
		public get(optionName : string) {
			return this.options[optionName];
		}
	}
}