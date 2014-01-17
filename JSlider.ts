/**
 * Created by sigurdbergsvela on 15.01.14.
 */
///<reference path="defs/jquery.d.ts"/>
///<reference path="jSlider/JSliderOptions.ts"/>
class JSlider {
	private options : jSlider.JSliderOptions;
	private sliderWrapper : JQuery;
	private slidesWrapper : JQuery;
	private slides : JQuery;
	private currentSlide : number;
	private timeout : number;
	private eventListeners : Array<Array<(jQuery) => void>>;
	
	/**
	 * Creates a new slider out of an HTMLElement
	 * 
	 * The htmlElement is expected to be the wrapper of the slider.
	 * The structur is expected to be
	 * <div> <!--The slider wrapper-->
	 *     <ul> <!--The slides-->
	 *         <li></li> <!--A Single slide-->
	 *         <li></li> <!--A Single slide-->
	 *         <li></li> <!--A Single slide-->
	 *     </ul>
	 * </div>
	 * 
	 * The ul element will be gived display:block, and all the LI elements will
	 * be given a width and height of 100%;
	 * 
	 * options
	 *     .delay : How long between each slide, -1 for no automated sliding
	 */
	constructor(sliderWrapper : any, options : Object = {}) {
		this.options = new jSlider.JSliderOptions(options);
		
		this.currentSlide = 0;
		
		//Set up the event listeners array
		this.eventListeners = this.options.get('on');
		
		var _this = this;
		jQuery(function($) {
			_this.sliderWrapper = jQuery(sliderWrapper);
			_this.slidesWrapper = _this.sliderWrapper.children("ul").eq(0);
			_this.slides = _this.slidesWrapper.children("li");
			
			_this.slides.css({
				"position" : "relative",
				"height" : "100%",
				"width" : "100%",
				"display" : "inline-block"
			});
			
			_this.slidesWrapper.css({
				"position":"relative",
				"font-size": 0,
				"white-space":"nowrap"
			});
			
			_this.slidesWrapper.css({
				"display" : "block"
			});
			
			var buttons = _this.options.get('button');
			var button : any;
			for (button in buttons) {
				if (!buttons.hasOwnProperty(button)) continue;
				_this.registerButton(button, buttons[button]);
			}
		});
	}



	/**
	 * Register a callback that should be called on <param>event</event>
	 * @param event
	 * @param callback
	 */
	public on(event : string, callback : (JQuery) => void) {
		this.eventListeners[event].push(callback);
	}
	
	/**
	 * Call the event listeners for a spesific event
	 * @param event The event
	 */
	private trigger(event : string) {
		var listeners : {(JQuery) : void}[] = this.eventListeners[event];
		for (var i = 0; i < listeners.length; i++) {
			listeners[i](this.getCurrentSlide());
		}
	}

	/**
	 * Register a button.
	 * If an array is give for button, this function will recursively call it self with all of
	 * them
	 * @param event next, prev, stop or start.
	 * @param button Anything that jQuery() accepts 
	 */
	public registerButton(event : string, button : any) : void {
		var _this = this;
		var register = function(button, callback : () => void) { //Utility function
			jQuery(button).on('click touchend', function() {
				callback.call(_this);
			});
		};
		
		switch(event) {
			case "next":
				register(button, this.next);
				break;
			case "prev":
				register(button, this.prev);
				break;
			case "stop":
				register(button, this.stop);
				break;
			case "start":
				register(button, this.start);
				break;
		}
	}
	

	/**
	 * Start the slider
	 */
	public start() : void {
		this.trigger('start');
		var _this = this;
		this.timeout = setInterval(() : void => {
			_this.next();
		}, this.options.get('delay'));
	}

	/**
	 * Stop the slider
	 */
	public stop() : void {
		this.trigger('stop');
		clearInterval(this.timeout);
	}
	
	/**
	 * Slide to the current slide.
	 */
	private slideToCurrent() : void {
		console.log("sliding to " + this.currentSlide);
		this.slidesWrapper.animate({
			"right" : (100 * this.currentSlide) + "%"
		}, this.options.get('duration'));
	}

	/**
	 * Slide to the previous slide
	 */
	public prev() : void {
		this.trigger('slide');
		this.trigger('prev');
		this.prevSlide();
		this.slideToCurrent();
	}

	/**
	 * Slide to the next slide
	 */
	public next() : void {
		this.trigger('slide');
		this.trigger('next');
		this.nextSlide();
		this.slideToCurrent();
	}

	
	/**
	 * Returns the next slide and updates the currentSlide index.
	 * @return {JQuery} JQuery representation of the next slide.
	 */
	public nextSlide() : JQuery { //Get the next slide
		this.currentSlide = (this.currentSlide + 1 > this.slides.length-1) ? 0 : this.currentSlide + 1;
		return this.getCurrentSlide();
	}

	/**
	 * Returns the previous slide and updates the currentSlide index.
	 * @return {JQuery} JQuery representation of the previous slide.
	 */
	public prevSlide() : JQuery { //Get the prevoius slide
		this.currentSlide = (this.currentSlide - 1 < 0) ? this.slides.length-1 : this.currentSlide - 1;
		return this.getCurrentSlide();
	}

	/**
	 * Gets the jquery representation of the current slide
	 * @returns {JQuery} JQuery representation of the current slide.
	 */
	public getCurrentSlide() : JQuery {
		return this.slides.eq(this.currentSlide);
	}
	
	
}