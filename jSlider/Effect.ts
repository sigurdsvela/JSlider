module jSlider {
	export class Direction {
		public static NEXT:number = 1;
		public static PREV:number = -1;
		public static NONE:number = 0;
	}
	export class Effect {
		private initFunction:(slidesWrapper:JQuery, slides:JQuery, currentSlide:number) => void;
		private gotoFunction:(slidesWrapper:JQuery, slides:JQuery, currentSlide:number, nextSlide:number, direction:number, duration:number) => void;
		private fraction:(slidesWrapper:JQuery, slides:JQuery, currentSlide:number, nextSlide:number, fraction:number) => void;
		private canCycle:boolean;

		/**
		 * Create a new effect.
		 * Effects are built up of function that are ran
		 * on different types of switches
		 */
		constructor(effect : jSlider.IEffect) {
			this.initFunction = effect.init || function(){};
			this.gotoFunction = effect.goto;
			this.fraction = effect.fraction;
			this.canCycle = effect.canCycle();
		}

		public init(slidesWrapper:JQuery, slides:JQuery, currentSlide:number):void {
			this.initFunction(slidesWrapper, slides, currentSlide);
		}

		public gotoSlide(slidesWrapper:JQuery, slides:JQuery, currentSlide:number, nextSlide:number, direction:number, duration:number):void {
			this.gotoFunction(slidesWrapper, slides, currentSlide, nextSlide, direction, duration);
		}

		public fractionSlide(slidesWrapper:JQuery, slides:JQuery, currentSlide:number, nextSlide:number, fraction:number):void {
			this.fraction(slidesWrapper, slides, currentSlide, nextSlide, fraction);
		}

		/**
		 * Whether or not this effect can cycle form the last to the first slide, or the first to the last slide.
		 * @returns {boolean}
		 */
		public getCanCycle():boolean {
			return this.canCycle;
		}


		/*
		 * Effects
		 * */
		public static SLIDE:Effect = new Effect({
			init : (slidesWrapper:JQuery, slides:JQuery, currentSlide:number):void => {
			},
			goto : (slidesWrapper:JQuery, slides:JQuery, currentSlide:number, nextSlide:number, direction:number, duration:number) : void => {
				slidesWrapper.animate({
					right: ((100) * nextSlide) + "%"
				}, duration);
			},
			fraction : (slidesWrapper:JQuery, slides:JQuery, currentSlide:number, nextSlide:number, fraction:number) : void => {
				fraction = Math.abs(fraction);
				slidesWrapper.css({
					right: ((((nextSlide - currentSlide) * fraction) + currentSlide) * 100) + "%"
				})
			},
			canCycle : () : boolean => {
				return false;
			}
		});

		public static REWIND_SLIDE:Effect = new Effect({
			init : (slidesWrapper:JQuery, slides:JQuery, currentSlide:number):void => {
			},
			goto : (slidesWrapper:JQuery, slides:JQuery, currentSlide:number, nextSlide:number, direction:number, duration:number) : void => {
				slidesWrapper.animate({
					right: ((100) * nextSlide) + "%"
				}, duration);
			},
			fraction : (slidesWrapper:JQuery, slides:JQuery, currentSlide:number, nextSlide:number, fraction:number) : void => {
				fraction = Math.abs(fraction);
				slidesWrapper.css({
					right: ((((nextSlide - currentSlide) * fraction) + currentSlide) * 100) + "%"
				})
			},
			canCycle : () : boolean => {
				return true;
			}
		});

		public static CAROUSEL:Effect = new Effect({
			init : (slidesWrapper:JQuery, slides:JQuery, currentSlide:number):void => {
				console.log(slides);
				slides.css({
					"position" : "absolute",
					"left" : "-100%"
				});
				slides.eq(currentSlide).css("left", "0%"); //Move current slide into place
			},
			goto : (slidesWrapper:JQuery, slides:JQuery, currentSlide:number, nextSlide:number, direction:number, duration:number) : void => {
				var $nextSlide = slides.eq(nextSlide);
				var $currentSlide = slides.eq(currentSlide);
				if (direction === -1) {
					//Going back
					$nextSlide.css({"left" : "-100%"});
					$currentSlide.animate({"left" : "100%"});
					$nextSlide.animate({"left" : "0%"});
				} else if (direction === 1) {
					//Going next
					$nextSlide.css({"left" : "100%"});
					$currentSlide.animate({"left" : "-100%"});
					$nextSlide.animate({"left" : "0%"});
				} else if (direction === 0) {
					this.init(slidesWrapper, slides, currentSlide);
				}
			},
			fraction : (slidesWrapper:JQuery, slides:JQuery, currentSlide:number, nextSlide:number, fraction:number) : void => {
				fraction = Math.abs(fraction);
				slidesWrapper.css({
					right: ((((nextSlide - currentSlide) * fraction) + currentSlide) * 100) + "%"
				})
			},
			canCycle : () : boolean => {
				return true;
			}
		});
		
		public static FADE:Effect = new Effect({
			init : (slidesWrapper:JQuery, slides:JQuery, currentSlide:number) : void => {
				slidesWrapper.css({
					"position": "relative"
				});
				slides.css({
					"position": "absolute",
					"top": 0,
					"bottom": 0,
					"right": 0,
					"left": 0
				});
				slides.css({opacity: 0});
				slides.eq(currentSlide).css({opacity: 1});
			},
	
			goto : (slidesWrapper:JQuery, slides:JQuery, currentSlide:number, nextSlide:number, direction:number, duration:number) : void => {
				slides.eq(currentSlide).animate({opacity: 0}, duration);
				slides.eq(nextSlide).animate({opacity: 1}, duration);
			},
			
			fraction : (slidesWrapper:JQuery, slides:JQuery, currentSlide:number, nextSlide:number, fraction:number) : void => {
				slides.eq(nextSlide).css({opacity: Math.abs(fraction)});
				slides.eq(currentSlide).css({opacity: 1 - Math.abs(fraction)});
			},
			canCycle : () : boolean => {
				return true;
			}
		});
	}
	
	export interface IEffect {
		
		/**
		 * A method that is ran when the document is ready, and this effect was chosen
		 * this is used to set up the slides as whished.
		 * */
		init(slidesWrapper:JQuery, slides:JQuery, currentSlide:number) : void;
		
		/**
		 * gotoFunction A function that is ran when going directly to a slide.
		 * The function receives three parameters
		 * @param slidesWrapper The wrapper around the slides
		 * @param slides All the slides
		 * @param currentSlide the current slide in the slides jquery object. slides.eq(currentSlide) will get the current slide
		 * @param nextSlide same as curretn slide, only, its the next slide.
		 * @param duration How long the animation should take
		 * */
		goto(slidesWrapper:JQuery, slides:JQuery, currentSlide:number, nextSlide:number, direction:number, duration:number) : void;
		
		/**
		 * fraction Gets ran when trying to slide between slides.
		 * @param slidesWrapper The wrapper around the slides
		 * @param slides All the slides
		 * @param currentSlide the current slide in the slides jquery object. slides.eq(currentSlide) will get the current slide
		 * @param nextSlide same as curretn slide, only, its the next slide.
		 * @param fraction How much slide
		 * */
 		fraction(slidesWrapper:JQuery, slides:JQuery, currentSlide:number, nextSlide:number, fraction:number) : void;
		
		/*
		 * canCycle Whether or not this effect is able to go form the last to the first, or if it
		 * does not.
		 * */
		canCycle() : boolean;
		
	}
}