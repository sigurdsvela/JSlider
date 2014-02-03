/**
 * Created by sigurdbergsvela on 15.01.14.
 */
///<reference path="defs/jquery.d.ts"/>
///<reference path="jSlider/Options.ts"/>
///<reference path="jSlider/Effect.ts"/>
class JSlider {
	private options:jSlider.Options;
	private sliderWrapper:JQuery;
	private slidesWrapper:JQuery;
	private slides:JQuery;
	private currentSlide:number;
	private timeout:number;
	private eventListeners:Array<Array<(jQuery) => void>>;
	private effect:jSlider.Effect;

	/**
	 * Bounds of a single slide
	 */
	private slideBounds:Object = {height: 0, width: 0};

	/*Touch Event*/
	private startX:number = null;
	private dx:number = null;
	private lastX:number = null;
	private fraction:number;

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
	constructor(sliderWrapper:any, options:Object = {}) {
		this.options = new jSlider.Options(options);

		this.currentSlide = 0;
		
		this.fraction = 0;

		//Set up the event listeners array
		this.eventListeners = this.options.get('on');

		this.effect = <jSlider.Effect>this.options.get('effect');

		var _this = this;
		
		jQuery(function ($) {
			_this.sliderWrapper = jQuery(sliderWrapper);
			_this.slidesWrapper = _this.sliderWrapper.children("ul").eq(0);
			_this.slides = _this.slidesWrapper.children("li");
			_this.slideBounds['height'] = _this.slides.eq(0).height();
			_this.slideBounds['width'] = _this.slides.eq(0).width();

			/**
			 * Bind touch
			 */
			_this.slidesWrapper.on('touchmove', function (e) {
				e.preventDefault();
				var fraction = -((e.originalEvent.pageX - _this.startX) / _this.slideBounds['width']);
				if (_this.startX != null) {
					_this.fractionSlide(fraction);
				}

				if (_this.lastX !== null) {
					_this.dx = -(e.originalEvent.pageX - _this.lastX);
				}
				_this.lastX = e.originalEvent.pageX;
			});

			_this.slidesWrapper.on('touchstart', function (e) {
				_this.startX = e.originalEvent.pageX;
			});

			_this.slidesWrapper.on('touchend', function (e) {
				_this.startX = null;
				var absDelta = Math.abs(_this.dx);

				//Chose which slide we want to go to
				if (absDelta < 4) { //Less than 4? treat as stationary
					if (Math.abs(_this.fraction) < 0.5) {
						_this.gotoCurrent();
					} else {
						if (_this.fraction > 0) {
							_this.next();
						} else {
							_this.prev();
						}
					}
				} else {
					if (absDelta > 73) { //Delta overrides fraction
						if (_this.dx > 0) {
							_this.next();
						} else {
							_this.prev();
						}
					} else {
						if ((_this.dx > 0) != (_this.fraction > 0)) { //If DX is not the same direction as fraction
							_this.gotoCurrent();
						} else {
							if (_this.fraction > 0) {
								_this.next();
							} else {
								_this.prev();
							}
						}
					}
				}
			});

			_this.slides.css({
				"position": "relative",
				"height": "100%",
				"width": "100%",
				"display": "inline-block"
			});

			_this.slidesWrapper.css({
				"position": "relative",
				"font-size": 0,
				"white-space": "nowrap",
				"height": "100%",
				"width": "100%",
				"display": "block"
			});


			_this.effect.init(_this.slidesWrapper, _this.slides, _this.currentSlide); //Initilize the effect

			var buttons = _this.options.get('button');
			var button:any;
			for (button in buttons) {
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
	public on(event:string, callback:(JQuery) => void) {
		this.eventListeners[event].push(callback);
	}

	/**
	 * Call the event listeners for a spesific event
	 * @param event The event
	 */
	private trigger(event:string) {
		var listeners:{(JQuery) : void}[] = this.eventListeners[event];
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
	public registerButton(event:string, button:any):void {
		var _this = this;
		var register = function (button, callback:() => void) { //Utility function
			var event = ('ontouchstart' in window) ? 'touchstart' : 'mousedown';
			jQuery(button).on(event, function () {
				callback.call(_this);
			});
		};

		switch (event) {
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
	public start():void {
		this.trigger('start');
		var _this = this;
		this.timeout = setInterval(():void => {
			_this.next();
		}, this.options.get('delay'));
	}

	/**
	 * Stop the slider
	 */
	public stop():void {
		this.trigger('stop');
		clearInterval(this.timeout);
	}

	/**
	 * Go back to the current slide
	 */
	private gotoCurrent():void {
		this.effect.gotoSlide(this.slidesWrapper, this.slides, this.currentSlide, this.currentSlide, this.options.get('duration'));
	}

	/**
	 * Whether or not we are at the last slide
	 */
	public atLastSlide():boolean {
		return (this.currentSlide >= this.slides.length - 1);
	}

	/**
	 * Whether ot not we are at the first slide
	 */
	public atFirstSlide():boolean {
		return (this.currentSlide === 0);
	}

	/**
	 * Slide to the previous slide
	 * If the effect can not cycle, then go to the current slide.
	 */
	public prev():void {
		var _prevSlide:number = this.currentSlide;

		var duration = this.options.get('duration');
		duration = (duration - duration * Math.abs(this.fraction));
		this.fraction = 0;

		if (!(!this.effect.getCanCycle() && this.atFirstSlide())) {
			this.currentSlide = this.atFirstSlide() ? this.slides.length - 1 : this.currentSlide - 1;
		}

		this.effect.gotoSlide(this.slidesWrapper, this.slides, _prevSlide, this.currentSlide, duration);
		this.trigger('slide');
		this.trigger('prev');
	}

	/**
	 * Slide to the next slide.
	 * If the effect can not cycle, then go to the current slide.
	 */
	public next():void {
		var _prevSlide:number = this.currentSlide;

		var duration = this.options.get('duration');
		duration = (duration - duration * Math.abs(this.fraction));
		this.fraction = 0;

		if (!(!this.effect.getCanCycle() && this.atLastSlide())) {
			this.currentSlide = this.atLastSlide() ? 0 : this.currentSlide + 1;
		}

		this.effect.gotoSlide(this.slidesWrapper, this.slides, _prevSlide, this.currentSlide, duration);
		this.trigger('slide');
		this.trigger('next');
	}

	/**
	 * Slides a little bit to the next or previous slide
	 * @param fraction A number between -1 and +1. + is next, - is previous
	 */
	private fractionSlide(fraction:number):void {
		var nextSlide:number;

		//If we cant cycle, but need to

		if (((this.atLastSlide() && fraction > 0) || (this.atFirstSlide() && fraction < 0)) && !this.effect.getCanCycle()) {
			fraction /= 2;
			if (fraction > 0) {
				nextSlide = this.currentSlide + 1;
			} else {
				nextSlide = this.currentSlide - 1;
			}
		} else {
			if (fraction > 0) {
				nextSlide = (this.currentSlide + 1 > this.slides.length - 1) ? 0 : this.currentSlide + 1;
			} else {
				nextSlide = (this.currentSlide - 1 < 0) ? this.slides.length - 1 : this.currentSlide - 1;
			}
		}

		this.fraction = fraction;
		this.effect.fractionSlide(this.slidesWrapper, this.slides, this.currentSlide, nextSlide, fraction);
	}

	/**
	 * Gets the jquery representation of the current slide
	 * @returns {JQuery} JQuery representation of the current slide.
	 */
	public getCurrentSlide():JQuery {
		return this.slides.eq(this.currentSlide);
	}


}