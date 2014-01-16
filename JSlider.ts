/**
 * Created by sigurdbergsvela on 15.01.14.
 */
///<reference path="../defs/jquery.d.ts"/>
class JSlider {
	private _options = {
		
	};
	
	private sliderWrapper : HTMLDivElement;
	private slidesWrapper : HTMLUListElement;
	private slides : HTMLLIElement[];
	
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
		this._options = options['delay'] || 100;
		this.sliderWrapper = sliderWrapper;
		
	}
	
	public start() : void {
		
	}
	
	
}