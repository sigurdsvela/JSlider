module jSlider {
	export class JSliderOptions {
		private static _defaults = {
			"delay" : 4000, //Delay between each slide
			"duration" : 200, //The duration of the slide animation
			"button" : {}
		};
		
		private options : Object = {
			"delay" : null,
			"duration" : null,
			"button" : {
				"next" : null,
				"prev" : null,
				"stop" : null,
				"start" : null
			},
			"on" : {
				"slide" : null,
				"next" : null,
				"prev" : null,
				"start" : null,
				"stop" : null
			}
		};
		
		constructor(options : Object = {}) {
			var option : string;
			for (option in this.options) {
				if (!this.options.hasOwnProperty(option)) continue;
				this.options[option] = options[option] || JSliderOptions._defaults[option] || null;
			}
			
			//Change event listeners to [function(){}] if function(){}
			var eventListeners = this.options['on'];
			var key : string;
			for (key in eventListeners) {
				if (!eventListeners.hasOwnProperty(key)) continue;
				if (typeof eventListeners[key] === 'function') {
					eventListeners[key] = Array(eventListeners[key]);
				}
			}
		}

		/**
		 * Get an option
		 * @param optionName
		 * @returns {string}
		 */
		public get(optionName : string) : any {
			return this.options[optionName];
		}
	}
}