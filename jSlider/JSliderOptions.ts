module jSlider {
	export class JSliderOptions {
		private options : Object = {
			"delay" : 4000,
			"duration" : 200,
			"button" : {
				"next" : null,
				"prev" : null,
				"stop" : null,
				"start" : null
			},
			"on" : {
				"slide" : [],
				"next" : [],
				"prev" : [],
				"start" : [],
				"stop" : []
			}
		};
		
		constructor(options : Object = {}) {
			var option : string;
			for (option in this.options) {
				if (!this.options.hasOwnProperty(option)) continue;
				this.options[option] = options[option] || this.options[option];
			}
			
			//Change event listeners to [function(){}] if function(){}
			var eventListeners = this.options['on'];
			var key : string;
			for (key in eventListeners) {
				if (!eventListeners.hasOwnProperty(key)) continue;
				if (typeof eventListeners[key] === 'function') {
					this.options['on'][key] = Array(eventListeners[key]);
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