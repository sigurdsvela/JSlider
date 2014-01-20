module jSlider {
	export class Effect {
		private goto : (slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, duration : number) => void;
		private fraction : (slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, fraction : number) => void;
		
		/**
		 * Create a new effect.
		 * Effects are built up of function that are ran
		 * on different types of switches 
		 * @param goto A function that is ran when going firectrly to a slide.
		 * The function resives three parameters
		 *    currentSlide : The slide we are going form
		 *    nextSlide : The slide we are going to
		 *    direction : The direction. -1 prev, +1 next.
		 * @param fraction Gets ran when trying to slide between slides.
		 *    currentSlide : The slide we are going form
		 *    nextSlide : The slide we are going to
		 *    fraction : A number between -1 and 1. How much should we slide.
		 */
		constructor(goto : (slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, duration : number) => void,
		            fraction : (slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, fraction : number) => void) {
			this.goto = goto;
			this.fraction = fraction;
		}
		
		public gotoSlide(slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, duration : number) : void {
			this.goto(slidesWrapper, slides, currentSlide, nextSlide, duration);
		}
		
		public fractionSlide(slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, fraction : number) : void {
			this.fraction(slidesWrapper, slides, currentSlide, nextSlide, fraction);
		}
		
		
		/*
		* Effects
		* */
		public static SLIDE : Effect = new Effect(
			function(slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, duration : number) {
				slidesWrapper.animate({
					right : ((100)*nextSlide)+"%"	
				}, duration);
			},
			function(slidesWrapper : JQuery, slides : JQuery, currentSlide : number, nextSlide : number, fraction : number) {
				
			}
		);
	}
}