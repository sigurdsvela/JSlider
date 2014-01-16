module jSlider {
	export class JSliderOptions {
		private static _defaults = {
			"delay" : 4000, //Delay between each slide
			"duration" : 200 //The duration of the slide animation
		};
		
		private options : Object<string, string> = {
			"delay" : null,
			"duration" : null
		};
		
		constructor(options : Object<string, string> = {}) {
			var option : string;
			for (option in this.options) {
				if (!this.options.hasOwnProperty(option)) continue;
				this.options[option] = options[option] || JSliderOptions._defaults[option] || null;
			}
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