/**
 * Created by sigurdbergsvela on 15.01.14.
 */
///<reference path="defs/jquery.d.ts"/>
class JSlider {
	private _options = {
		
	};
	
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
	constructor(sliderWrapper : HTMLDivElement, options : Object = {}) {
		this._options['delay'] = options['delay'] || 100;
		this.sliderWrapper = jQuery(sliderWrapper);
		this.slidesWrapper = this.sliderWrapper.children("ul");
		this.slides = this.slidesWrapper.children("li");
		
		this.currentSlide = 0;
	}
	
	public start() : void {
		
	}
	
	
}