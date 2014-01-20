module jSlider {
	export class Effect {
		private initcb : (slidesWrapper : JQuery, slides : JQuery, currentSlide : number) => void;
		private goto : (slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, duration : number) => void;
		private fraction : (slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, fraction : number) => void;
		private canCycle : boolean;
		
		/**
		 * Create a new effect.
		 * Effects are built up of function that are ran
		 * on different types of switches
		 * @param init A method that is ran when the document is ready, and this effect was chosen
		 * this is used to set up the slides as whished.
		 * @param goto A function that is ran when going directly to a slide.
		 * The function receives three parameters
		 *    currentSlide : The slide we are going form
		 *    nextSlide : The slide we are going to
		 *    direction : The direction. -1 prev, +1 next.
		 * @param fraction Gets ran when trying to slide between slides.
		 *    currentSlide : The slide we are going form
		 *    nextSlide : The slide we are going to
		 *    fraction : A number between -1 and 1. How much should we slide.
		 * @param canCycle Whether or not this effect is able to go form the last to the first, or if it
		 *    does not.
		 */
		constructor(
					init : (slidesWrapper : JQuery, slides : JQuery, currentSlide : number) => void,
					goto : (slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, duration : number) => void,
					fraction : (slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, fraction : number) => void,
					canCycle:boolean=true) {
			this.initcb = init;
			this.goto = goto;
			this.fraction = fraction;
			this.canCycle = canCycle;
		}
		
		public init(slidesWrapper : JQuery, slides : JQuery, currentSlide : number) : void {
			this.initcb(slidesWrapper, slides, currentSlide);
		}
		
		public gotoSlide(slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, duration : number) : void {
			this.goto(slidesWrapper, slides, currentSlide, nextSlide, duration);
		}
		
		public fractionSlide(slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, fraction : number) : void {
			this.fraction(slidesWrapper, slides, currentSlide, nextSlide, fraction);
		}

		/**
		 * Whether or not this effect can cycle form the last to the first slide, or the first to the last slide.
		 * @returns {boolean}
		 */
		public getCanCycle() : boolean {
			return this.canCycle;
		}
		
		
		/*
		* Effects
		* */
		public static SLIDE : Effect = new Effect(
			function(slidesWrapper : JQuery, slides : JQuery, currentSlide : number) : void {
			},
			function(slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, duration : number) {
				slidesWrapper.animate({
					right : ((100)*nextSlide)+"%"	
				}, duration);
			},
			function(slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, fraction : number) {
				fraction = Math.abs(fraction);
				slidesWrapper.css({
					right : ((((nextSlide - currentSlide)*fraction)+currentSlide)*100)+"%"
				})
			},
			false
		);
		public static FADE : Effect = new Effect(
			function(slidesWrapper : JQuery, slides : JQuery, currentSlide : number) : void {
				slidesWrapper.css({
					"position":"relative"
				});
				slides.css({
					"position":"absolute",
					"top" : 0,
					"bottom" : 0,
					"right" : 0,
					"left" : 0
				});
				slides.css({opacity:0});
				slides.eq(currentSlide).css({opacity:1});
			},
			function(slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, duration : number) {
				slides.eq(currentSlide).animate({opacity:0});
				slides.eq(nextSlide).animate({opacity:1});
			},
			function(slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, fraction : number) {
				slides.eq(nextSlide).css({opacity:Math.abs(fraction)});
				slides.eq(currentSlide).css({opacity:1-Math.abs(fraction)});
			},
			true
		);
	}
}