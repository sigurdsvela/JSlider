JSlider
=======

<b>Download the lates version from releases to get started :)</b>
<b>Pull requests are very welcome</b>
<b>If you discover an issue, create one :)</b>

A slider library that allows for simple creation of slider, and endless customization.

To get started, go to "releases" and download the latest non-prerelease version, and include it.

### Usage

Usage is fairly simple. To create the most simple slider, you must have a div, with a UL in it,
which has LI elements in it. These LI elements are your slides.

```html
<div id="slider">
	<ul id="slides">
		<li class="slide">slide1</div>
		<li class="slide">slide2</div>
		<li class="slide">slide3</div>
	</ul>
</div>
```

The "class" and "id" attribtues are *not* required.

After you have those elements, you need to write some javascript. Go inside
a JavaScrpt file, or create a *script* tag and write.

```js
var slider = new JSlider("#your-slider-id"); //You can use any selector here
slider.start(); //This starts the automated slider
```

If you have done everything correctly you should be able to sit back and whatch them slides go.

You may also set some options for JSlider. This is done by passing an Object containing key=>value pairs to the JSlider constructor.

For example, to set how long the slider should stay at each slide, do:

```js
var slider = new JSlider("#your-slider-id", {
	"delay" : 5000 //Set the delay to 5000ms
}); //You can use any selector here
slider.start(); //This starts the automated slider
```

The code above will make JSlider wait for 5 seconds before it slides to the next slide.

###Options
Currently avaible options are:
<ul>
	<li><b>(number)delay</b> : (ms) Set how long JSlider should wait before it slide.</li>
	<li><b>(number)duration</b> : (ms) Sets the animation duration</li>
	<li>
		<b>button</b>
		<ul>
			<li><b>(jQuery|HTMLELement|selector)next</b> : Register a button to use as next button</li>
			<li><b>(jQuery|HTMLELement|selector)prev</b> : Register a button to use as prev button</li>
			<li><b>(jQuery|HTMLELement|selector)start</b> : Register a button to use as start button</li>
			<li><b>(jQuery|HTMLELement|selector)stop</b> : Register a button to use as stop button</li>
		</ul>
	</li>
	<li>
		<b>on</b>
		<ul>
			<li><b>((jQuery currentSlide) => any)slide</b> : Register an event that is triggered when the slider slides</li>
			<li><b>((jQuery currentSlide) => any)next</b> : Register an event that is triggered when the slider slides to the next slide</li>
			<li><b>((jQuery currentSlide) => any)pre</b> : Register an event that is triggered when the slider slides to the previous slide</li>
			<li><b>((jQuery currentSlide) => any)stop</b> : Register an event that is triggered when the slider slides is stoped</li>
			<li><b>((jQuery currentSlide) => any)start</b> : Register an event that is triggered when the slider slides is started</li>
		</ul>
	</li>
</ul>




###Functions
There is also some avaible function in the JSlider object.
<ul>
	<li><b>(void)start()</b> : Start the slider </li>
	<li><b>(void)stop()</b> : Stop the slider </li>
	<li><b>(void)next()</b> : Go to the next slide </li>
	<li><b>(void)prev()</b> : Go to the previous slide </li>
</ul>

