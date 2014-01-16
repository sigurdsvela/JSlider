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
		this.sliderWrapper = jQuery(sliderWrapper);
		this.slidesWrapper = this.sliderWrapper.children("ul").eq(0);
		this.slides = this.slidesWrapper.children("li");
		
		this.currentSlide = 0;
		
		this.slides.css({
			"position" : "relative",
			"height" : "100%",
			"width" : "100%",
			"display" : "inline-block"
		});
		
		this.slidesWrapper.css({
			"position":"relative",
			"font-size": 0,
			"white-space":"nowrap"
		});
		
		this.slidesWrapper.css({
			"display" : "block"
		});
	}
	
	public start() : void {
		
	}
	
	/**
	 * Slide to the current slide.
	 */
	private slideToCurrent() : void {
		console.log("sliding to " + this.currentSlide);
		this.slidesWrapper.animate({
			"right" : (100 * this.currentSlide) + "%"
		}, this.options.get('delay'));
	}

	/**
	 * Slide to the previous slide
	 */
	public prev() : void {
		this.prevSlide();
		this.slideToCurrent();
	}

	/**
	 * Slide to the next slide
	 */
	public next() : void {
		this.prevSlide();
		this.slideToCurrent();
	}

	
	/**
	 * Returns the next slide and updates the currentSlide index.
	 * @return {JQuery} JQuery representation of the next slide.
	 */
	public nextSlide() : JQuery { //Get the next slide
		this.currentSlide = (this.currentSlide + 1 > this.slides.length) ? 0 : this.currentSlide + 1;
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